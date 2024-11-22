/*
 * 1)
 * Proyectos para la sección 3
 * Crea un formulario de registro que pidan los siguientes datos:
 * - Nombre
 * - Apellido
 * - Correo electrónico
 * - Contraseña
 * - Confirmar contraseña
 * 
 * Validaciones:
 * - Nombre y apellido: Solo letras y espacios
 * - Correo electrónico: Debe tener un formato válido
 * - Contraseña: Mínimo una letra minúscula, una mayúscula, un número, un caracter especial (!$-_.,) y mínimo 8 caracteres
 * - Confirmar contraseña: Debe ser igual a la contraseña
 * 
 * Debes crear una interfaz gráfica para el formulario y mostrar mensajes de error en caso de que el
 * usuario ingrese datos incorrectos.
 * 
*/

document.getElementById('boton').addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente.

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const correo = document.getElementById('mail').value.trim();
    const contrasena = document.getElementById('pass').value;
    const rcontrasena = document.getElementById('rpass').value;

    // validación
    const nombreApellidoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$-_.,]).{8,}$/;

    // almacenar errores
    let errores = [];

    if (!nombreApellidoRegex.test(nombre)) {
        errores.push('El nombre solo puede contener letras y espacios.');
    }
    if (!nombreApellidoRegex.test(apellido)) {
        errores.push('El apellido solo puede contener letras y espacios.');
    }
    if (!correoRegex.test(correo)) {
        errores.push('El correo debe tener un formato válido (ejemplo@correo.com).');
    }
    if (!contrasenaRegex.test(contrasena)) {
        errores.push('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (!$-_.,).');
    }
    if (contrasena !== rcontrasena) {
        errores.push('Las contraseñas no coinciden.');
    }

    if (errores.length > 0) {
        alert('Errores encontrados:\n' + errores.join('\n'));
    } else {
        alert('Formulario enviado de manera exitosa.');
    }
});
