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

// Crear usuario administrador
const adminUser = {
    nombre: "osmel",
    correo: "admin@correo.com", // Correo del administrador (uso futuro)
    contrasena: "admin",
    role: "admin", // Rol de administrador
};

// Guardar el usuario en localStorage si no existe
if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify(adminUser));
    console.log("Usuario administrador creado:", adminUser);
}

// Función de validación del login
function validar() {
    const nombre = document.getElementById("nombre").value.trim();
    const contrasena = document.getElementById("contraseña").value.trim();

    // Verificar si los campos están vacíos
    if (nombre === "" || contrasena === "") {
        alert("Por favor, complete ambos campos.");
        return; // Evita continuar si falta información
    }

    // Obtener usuario administrador del localStorage
    const adminData = JSON.parse(localStorage.getItem("admin"));

    // Verificar si las credenciales coinciden
    if (nombre === adminData.nombre && contrasena === adminData.contrasena) {
        // Guardar sesión y setear cookie con el rol de admin
        localStorage.setItem("usuario", JSON.stringify(adminData));
        setCookie('usuario', JSON.stringify(adminData));  // Guardar en cookie
        alert("Login exitoso. Bienvenido, Administrador.");
        window.location.href = "home.html"; // Redirigir al home
    } else {
        // Si no es el administrador, verificar si el nombre y la contraseña son correctos
        // Aquí puedes hacer una verificación si quieres permitir otros usuarios
        const usuario = {
            nombre: nombre,
            role: "usuario", // Rol de usuario común
        };

        // Verificar si las credenciales coinciden para un usuario normal
        if (contrasena === "usuario") { // Aquí puedes agregar la validación que consideres
            // Guardar el usuario normal en localStorage y cookie
            localStorage.setItem("usuario", JSON.stringify(usuario));
            setCookie('usuario', JSON.stringify(usuario));  // Guardar en cookie
            
            // Mostrar mensaje personalizado si es un usuario no administrador
            alert(`Bienvenido, ${nombre}`);
            window.location.href = "home.html"; // Redirigir al home
        } else {
            alert("Nombre o contraseña incorrectos. Por favor, inténtalo nuevamente.");
        }
    }

    // Eliminar la cookie después de 2 horas
    setTimeout(() => {
        deleteCookie('usuario');
    }, 7200000); // 2 horas (7200000 milisegundos)
}
