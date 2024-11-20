<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda Online</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* Estilos personalizados */
        header {
            background-color: #f8f9fa;
            padding: 50px 0;
        }
        header h1 {
            font-size: 2.5rem;
        }
        footer {
            background-color: #343a40;
            color: white;
            padding: 20px 0;
            text-align: center;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Tienda Online</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#productos">Productos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#api">API</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Header Section -->
    <header class="text-center">
        <div class="container">
            <h1>Bienvenido a Nuestra Tienda Online</h1>
            <p>Encuentra los mejores productos al mejor precio</p>
        </div>
    </header>

    <!-- Productos Section -->
    <section id="productos" class="container my-5">
        <h2 class="text-center mb-4">Nuestros Productos</h2>
        <div class="row">
            <!-- Producto 1 -->
            <div class="col-md-4">
                <div class="card">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="Producto 1">
                    <div class="card-body">
                        <h5 class="card-title">Producto 1</h5>
                        <p class="card-text">Descripción breve del producto 1.</p>
                        <button class="btn btn-primary">Comprar</button>
                    </div>
                </div>
            </div>
            <!-- Producto 2 -->
            <div class="col-md-4">
                <div class="card">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="Producto 2">
                    <div class="card-body">
                        <h5 class="card-title">Producto 2</h5>
                        <p class="card-text">Descripción breve del producto 2.</p>
                        <button class="btn btn-primary">Comprar</button>
                    </div>
                </div>
            </div>
            <!-- Producto 3 -->
            <div class="col-md-4">
                <div class="card">
                    <img src="https://via.placeholder.com/150" class="card-img-top" alt="Producto 3">
                    <div class="card-body">
                        <h5 class="card-title">Producto 3</h5>
                        <p class="card-text">Descripción breve del producto 3.</p>
                        <button class="btn btn-primary">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- API Section -->
    <section id="api" class="container my-5">
        <h2 class="text-center mb-4">Integración con API</h2>
        <p class="text-center">Aquí puedes integrar contenido dinámico usando JavaScript y APIs externas.</p>
        <div id="api-content" class="text-center">
            <button class="btn btn-secondary" onclick="cargarDatos()">Cargar Datos de API</button>
            <div id="datos" class="mt-3"></div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <p>&copy; 2024 Tienda Online. Todos los derechos reservados.</p>
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
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
    </script>
</body>
</html>
