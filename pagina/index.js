// Crear usuario administrador
const adminUser = {
    nombre: "osmel",
    correo: "admin@correo.com", // Correo del administrador
    contrasena: "admin",
    role: "admin", // Rol de administrador
};

// Guardar el usuario en localStorage si no existe
if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify(adminUser));
    console.log("Usuario administrador creado:", adminUser);
}

// Función para guardar cookies con una expiración de 2 horas
function setCookie(name, value) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000); // 2 horas
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

// Función para obtener cookies
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Función para eliminar cookies
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

// Función de validación del login
function validar() {
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("mail").value.trim();
    const contrasena = document.getElementById("contraseña").value;
    const rcontrasena = document.getElementById("rpass").value.trim();

    // Obtener usuario administrador del localStorage
    const adminData = JSON.parse(localStorage.getItem("admin"));

    // Verificar si las credenciales coinciden
    if (nombre === adminData.nombre && correo === adminData.correo && contrasena === adminData.contrasena) {
        if (contrasena !== rcontrasena) {
            alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
        } else {
            // Guardar sesión y setear cookie con el rol de admin
            localStorage.setItem("usuario", JSON.stringify(adminData));
            setCookie('usuario', JSON.stringify(adminData));  // Guardar en cookie
            alert("Login exitoso. Bienvenido, Administrador.");
            window.location.href = "home.html"; // Redirigir al home
        }
    } else {
        // Si no es el administrador, verifique si es un usuario válido
        const usuario = {
            nombre: nombre,
            role: "usuario", // Rol de usuario común
        };

        // Guardar el usuario normal en localStorage y cookie
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setCookie('usuario', JSON.stringify(usuario));  // Guardar en cookie
        
        // Mostrar mensaje personalizado si es un usuario no administrador
        alert(`Bienvenido, ${nombre}`);
        window.location.href = "home.html"; // Redirigir al home
    }

    // Eliminar la cookie después de 2 horas
    setTimeout(() => {
        deleteCookie('usuario');
    }, 7200000); // 2 horas (7200000 milisegundos)
}

// Función de logout
function logout() {
    localStorage.removeItem("usuario"); // Eliminar del localStorage
    deleteCookie("usuario"); // Eliminar la cookie
    window.location.href = "login.html"; // Redirigir al login
}

// Asociar el botón de logout al evento
const logoutButton = document.getElementById('salir');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}

const championsContainer = document.getElementById("champions");
let currentPage = 0;

// Función para obtener campeones
async function fetchChampions(page = 0) {
    const response = await fetch("https://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json");
    const data = await response.json();
    const champions = Object.values(data.data);
    const perPage = 8; // Campeones por página

    championsContainer.innerHTML = "";
    const start = page * perPage;
    const end = start + perPage;

    champions.slice(start, end).forEach((champ) => {
        const champCard = `
            <div class="bg-white p-4 rounded-lg shadow-lg text-center">
                <img src="https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${champ.image.full}" alt="${champ.name}" class="w-16 h-16 mx-auto">
                <p class="mt-2 font-bold">${champ.name}</p>
            </div>`;
        championsContainer.innerHTML += champCard;
    });
}

// Navegación de páginas
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        fetchChampions(currentPage);
    }
});
document.getElementById("nextPage").addEventListener("click", () => {
    currentPage++;
    fetchChampions(currentPage);
});

// Cargar campeones al inicio
fetchChampions();


// Modo Oscuro
const modoBtn = document.getElementById("modo");
const body = document.body;

modoBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    
});

document.getElementById('menu').addEventListener('click', function() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('hidden'); // Muestra u oculta el nav en pantallas pequeñas
});

const universo = document.getElementById('universo');

function createStar(x, y) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Obtener el rectángulo de la sección para obtener sus límites
    const rect = universo.getBoundingClientRect();
    
    // Ajustamos las coordenadas para que las estrellas estén dentro de los límites de la sección
    const relativeX = x - rect.left;  // Coordenada X relativa a la sección
    const relativeY = y - rect.top;   // Coordenada Y relativa a la sección

    // Asegúrate de que las estrellas no salgan de los límites de la sección
    if (relativeX >= 0 && relativeX <= rect.width && relativeY >= 0 && relativeY <= rect.height) {
        star.style.top = `${relativeY}px`;
        star.style.left = `${relativeX}px`;
        universo.appendChild(star);

        // Eliminar la estrella después de 8 segundos
        setTimeout(() => {
            star.remove();
        }, 8000);
    }
}

// Crear una estrella cuando se hace clic dentro de la sección
universo.addEventListener('click', (e) => {
    createStar(e.clientX, e.clientY);
});

// Generar estrellas aleatorias dentro de los límites de la sección cada 500 ms
setInterval(() => {
    const rect = universo.getBoundingClientRect();
    const x = Math.random() * rect.width + rect.left;  // Coordenada X dentro de la sección
    const y = Math.random() * rect.height + rect.top; // Coordenada Y dentro de la sección
    createStar(x, y);
}, 500);
