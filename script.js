// Cambiar esta URL por la URL de tu microservicio en producción
const apiUrl = 'http://localhost:8080/api/panes'; // Cambiar al dominio de tu microservicio

// Función para cargar productos desde la API del microservicio
async function cargarProductos() {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = '<p class="text-center">Cargando productos...</p>';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Error al cargar los productos');
        }
        const productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        contenedor.innerHTML = `<p class="text-center text-danger">Error al cargar los productos: ${error.message}</p>`;
        console.error(error);
    }
}

// Mostrar los productos en la página
function mostrarProductos(productos) {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = ''; // Limpiar contenido previo

    productos.forEach(producto => {
        const col = document.createElement('div');
        col.classList.add('col-md-4');
        col.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio.toFixed(2)}</p>
                    <button class="btn btn-primary">Comprar</button>
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

// Función para la sección de API (puedes reutilizarla para mostrar otros datos si es necesario)
async function cargarDatos() {
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

// Llamada para cargar los productos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarProductos);
