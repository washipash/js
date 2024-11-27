const API_URL = 'https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true';

async function fetchPlanetas() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener los datos de la API');
        const data = await response.json();
        Planeta(data.bodies);
    } catch (error) {
        console.error(error);
        document.getElementById('universo').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    }
}

function Planeta(planets) {
    const container = document.getElementById('universo');
    container.innerHTML = '';
    planets.forEach(planet => {
        
        const planetDiv = document.createElement('div');
        planetDiv.className = 'planeta';
        planetDiv.innerHTML = `
            <h2>${planet.englishName}</h2>
            <p><strong>Distancia al Sol:</strong> ${planet.semimajorAxis} km</p>
            <p><strong>Radio:</strong> ${planet.meanRadius} km</p>
            <p><strong>Tipo:</strong> ${planet.bodyType}</p>
        `;
        container.appendChild(planetDiv);
    });
}

fetchPlanetas();