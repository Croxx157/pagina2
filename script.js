// Script para consumir datos de una API de ejemplo
function cargarDatos() {
    const apiContent = document.getElementById('datos');
    apiContent.innerHTML = '<p>Cargando datos...</p>';
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            apiContent.innerHTML = data.slice(0, 5).map(post => `
                <div class="card my-3">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => {
            apiContent.innerHTML = '<p>Error al cargar los datos.</p>';
            console.error(error);
        });
}
