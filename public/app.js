const responseDiv = document.getElementById('response');

function showResponse(data, isError = false) {
    responseDiv.textContent = JSON.stringify(data, null, 2);
    responseDiv.className = isError ? 'error' : 'success';
}

// Crear Perfil
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('profileName').value;
    try {
        const res = await fetch('/profiles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const data = await res.json();
        showResponse(data, !res.ok);
    } catch (err) {
        showResponse({ error: err.message }, true);
    }
});

// Crear Lugar
document.getElementById('placeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const address = document.getElementById('placeAddress').value;
    const capacity = parseInt(document.getElementById('placeCapacity').value);
    const owner = parseInt(document.getElementById('placeOwner').value);
    try {
        const res = await fetch('/places', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address, capacity, owner })
        });
        const data = await res.json();
        showResponse(data, !res.ok);
    } catch (err) {
        showResponse({ error: err.message }, true);
    }
});

// Actualizar Lugar
document.getElementById('updatePlaceForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updatePlaceId').value;
    const profileId = parseInt(document.getElementById('updatePlaceProfileId').value);
    const address = document.getElementById('updatePlaceAddress').value;
    const capacityInput = document.getElementById('updatePlaceCapacity').value;
    
    const body = { profileId };
    if (address) body.address = address;
    if (capacityInput) body.capacity = parseInt(capacityInput);

    try {
        const res = await fetch(`/places/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        showResponse(data, !res.ok);
    } catch (err) {
        showResponse({ error: err.message }, true);
    }
});
