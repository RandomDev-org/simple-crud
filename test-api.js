const http = require('http');

// Start the app
require('./src/index.js');

// Wait for server to start, then test
setTimeout(async () => {
    const tests = [
        { method: 'POST', path: '/profiles', body: { name: 'Alice' }, desc: 'POST /profiles' },
        { method: 'POST', path: '/places', body: { address: 'Calle 1', capacity: 100, owner: 1 }, desc: 'POST /places' },
        { method: 'PUT', path: '/places/1', body: { address: 'Calle Nueva' }, desc: 'PUT /places/1' },
        { method: 'PATCH', path: '/places/1/verify', body: { profileId: 1 }, desc: 'PATCH /places/1/verify' }
    ];

    for (const test of tests) {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: test.path,
            method: test.method,
            headers: { 'Content-Type': 'application/json' }
        };

        const response = await new Promise((resolve, reject) => {
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
            req.write(JSON.stringify(test.body));
            req.end();
        });

        console.log(`${test.desc}: ${response.status}`);
        console.log(`  Response: ${JSON.stringify(response.body)}`);
    }

    process.exit(0);
}, 1000);
