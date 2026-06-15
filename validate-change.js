const http = require('http');
const fs = require('fs');
const path = require('path');

// Remove existing DB to start fresh for validation
const dbPath = path.join(__dirname, 'datos.db');
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
}

// Start the app
require('./src/index.js');

async function request(method, path, body) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: JSON.parse(data) });
                } catch {
                    resolve({ status: res.statusCode, body: data });
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

setTimeout(async () => {
    try {
        console.log('--- Starting Validation ---');

        // 1. Create Profile 1 (Alice)
        const resAlice = await request('POST', '/profiles', { name: 'Alice' });
        console.log('Create Alice:', resAlice.status);
        const aliceId = resAlice.body.id;

        // 2. Create Profile 2 (Bob)
        const resBob = await request('POST', '/profiles', { name: 'Bob' });
        console.log('Create Bob:', resBob.status);
        const bobId = resBob.body.id;

        // 3. Create Place 1 (Owned by Alice)
        const resPlace = await request('POST', '/places', { address: 'Alice Place', capacity: 50, owner: aliceId });
        console.log('Create Place (Alice):', resPlace.status);
        const placeId = resPlace.body.id;

        // 4. Task 5.1: Non-owner gets "rechazado"
        console.log('\nTask 5.1: Verify non-owner rejection');
        const resUpdateFail = await request('PUT', `/places/${placeId}`, { 
            profileId: bobId, 
            address: 'Hacked Place', 
            capacity: 999 
        });
        console.log('Update by Bob (Non-owner):', resUpdateFail.status, JSON.stringify(resUpdateFail.body));
        if (resUpdateFail.status === 403 && resUpdateFail.body.error === 'rechazado') {
            console.log('✓ SUCCESS: Non-owner received "rechazado"');
        } else {
            console.error('✗ FAILURE: Non-owner update did not return 403 "rechazado"');
            process.exit(1);
        }

        // 5. Task 5.2: Owner can edit successfully
        console.log('\nTask 5.2: Verify owner success');
        const resUpdateSuccess = await request('PUT', `/places/${placeId}`, { 
            profileId: aliceId, 
            address: 'Alice New Address', 
            capacity: 60 
        });
        console.log('Update by Alice (Owner):', resUpdateSuccess.status, JSON.stringify(resUpdateSuccess.body));
        if (resUpdateSuccess.status === 200 && resUpdateSuccess.body.address === 'Alice New Address') {
            console.log('✓ SUCCESS: Owner edited successfully');
        } else {
            console.error('✗ FAILURE: Owner update failed');
            process.exit(1);
        }

        console.log('\n--- Validation Complete ---');
        process.exit(0);
    } catch (error) {
        console.error('Test Error:', error);
        process.exit(1);
    }
}, 1000);
