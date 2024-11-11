
  // Fecha de entrega: 13/11/2024

  //1 piedra, papel o tijeras
  /*
  1. Crea un juego de piedra papel o tijera utilizando
  funciones y ciclos.

  El juego debe permitir al usuario seleccionar una opcion
  y la computadora seleccionara una opcion aleatoria.

  Las opciones son:
  - Piedra
  - Papel
  - Tijera

  Las reglas son:
  - La piedra aplasta la tijera
  - La tijera corta el papel
  - El papel envuelve la piedra

  El juego debe de imprimir quien gano y si el usuario
  desea seguir jugando.

  El juego debe de terminar cuando el usuario seleccione
  que no desea seguir jugando.

  Ademas debes de tener un contador que indique cuantas
  partidas se han jugado, cuantas ha ganado el usuario
  y cuantas la computadora.

  Puedes utilizar la funcion prompt() para obtener la
  seleccion del usuario.

  1.La computadora elije aleatoriamente una de las 3 opciones entre: piedra, papel o tiejras
  2.Recibir la opcion elejida por el usuario
  3.comparar las elecciones del usuario y la computadora
  4.verificar quien gano y actualizar el contador de partidas
  5.darle al usuario la opcion de terminar el juego y decidir el ganador en base a cuantas victorias acumulo ada bando
  */

// Variables de opciones y contadores de resultados
const opciones = ["Piedra", "Papel", "Tijeras"];
let partidasJugadas = 0;
let victoriasUsuario = 0;
let victoriasComputadora = 0;


function retador() {
    return Math.floor(Math.random() * 3); 
}


function determinarGanador(usuario, computadora) {
    if (usuario === computadora) {
        return "Empate";
    } else if (
        (usuario === 0 && computadora === 2) || // Piedra gana a Tijeras
        (usuario === 2 && computadora === 1) || // Tijeras gana a Papel
        (usuario === 1 && computadora === 0)    // Papel gana a Piedra
    ) {
        return "Usuario";
    } else {
        return "Computadora";
    }
}

// jugar
function jugar() {
    let continuar = true;

    while (continuar) {
        let eleccionUsuario = prompt(
            "Selecciona una opción:\n" +
            "0: Piedra\n" +
            "1: Papel\n" +
            "2: Tijeras\n" +
            "3: Terminar el juego"
        );

        if (eleccionUsuario === null || eleccionUsuario === "3") {
            continuar = false;
            let mensajeFinal = "El juego ha terminado.\n\n";

            if (victoriasUsuario > victoriasComputadora) {
                mensajeFinal += "¡El usuario es el ganador final!";
            } else if (victoriasComputadora > victoriasUsuario) {
                mensajeFinal += "La computadora es la ganadora final.";
            } else {
                mensajeFinal += "Es un empate general.";
            }

            mensajeFinal += `\n\nPartidas jugadas: ${partidasJugadas}\nVictorias del usuario: ${victoriasUsuario}\nVictorias de la computadora: ${victoriasComputadora}`;

            alert(mensajeFinal);

            // Reiniciar contadores 
            partidasJugadas = 0;
            victoriasUsuario = 0;
            victoriasComputadora = 0;
        } else {
            eleccionUsuario = parseInt(eleccionUsuario);

            if (![0, 1, 2].includes(eleccionUsuario)) {
                alert("Opción no válida. Intenta de nuevo.");
                continue;
            }

            // determinar el ganador de la ronda
            const eleccionComputadora = retador();
            const resultado = determinarGanador(eleccionUsuario, eleccionComputadora);

            let mensaje = `Usuario eligió: ${opciones[eleccionUsuario]}\n`;
            mensaje += `Computadora eligió: ${opciones[eleccionComputadora]}\n`;

            // Actualizar contador 
            if (resultado === "Usuario") {
                mensaje += "¡Ganaste esta ronda!";
                victoriasUsuario++;
            } else if (resultado === "Computadora") {
                mensaje += "La computadora gana esta ronda.";
                victoriasComputadora++;
            } else {
                mensaje += "Es un empate.";
            }

            partidasJugadas++;

            
            alert(`${mensaje}\n\nPartidas jugadas: ${partidasJugadas}\nVictorias del usuario: ${victoriasUsuario}\nVictorias de la computadora: ${victoriasComputadora}`);
        }
    }
}


jugar();

