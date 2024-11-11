
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
                mensajeFinal += "¡El usuario es el ganador final! 🎉";
            } else if (victoriasComputadora > victoriasUsuario) {
                mensajeFinal += "La computadora es la ganadora final. 💻";
            } else {
                mensajeFinal += "Es un empate general. 🤝";
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


  //2 adivinar numero
  /*
  2. Crea un juego de adivinar un numero aleatorio
  entre 1 y 100.

  El juego debe de permitir al usuario ingresar un numero
  y la computadora debe de generar un numero aleatorio
  entre 1 y 100.

  El juego debe de imprimir si el numero ingresado por
  el usuario es mayor, menor o igual al numero generado
  por la computadora.

  El juego debe de terminar cuando el usuario adivine
  el numero.

  Ademas debes de tener un contador que se reste uno cada
  vez que el usuario ingrese un numero.

  El usuario debe de tener un maximo de 6 intentos para
  adivinar el numero.

  1.Generar un número aleatorio entre 1 y 100
  2.Pedir al usuario que ingrese un número
  3.comparar ambos numeros y si son iguales terminar el juego y gana el usuario
  4.mostrar una advertencia si el numero es diferente y decir si es mayor o menor que el numero de la computadora
  5.actualizar el numero de intentos y si llega a 0 y terminar el juego y ganala computadora
  */
function adivinar(){
  //1: Generar un número aleatorio entre 1 y 100
  const numeroComputadora = Math.floor(Math.random() * 100)+1;
  let intentos = 6;

  while (intentos > 0){
    //2: Pedir al usuario que ingrese un número
    const numeroUsuario = parseInt(prompt(`Adivina el número entre 1 y 100. Te quedan ${intentos} intentos:`), 10);
  
    if (isNaN(numeroUsuario)|| numeroUsuario < 1 || numeroUsuario > 100){
      alert("por favor ingrese un numero entero valido entre el 1 y el 100");
      continue;
    }
    //3: comparar ambos numeros y mostrar una advertencia si el numero es diferente
    if (numeroUsuario === numeroComputadora){
      alert("Felicidades adivinaste correctamente el numero y ganaste");
      return;
    } else if (numeroUsuario > numeroComputadora){
      alert("el numero ingresado es mayor al numero que pense");
    } else {
      alert("el numero ingresado es menor al numero que pense");
    }
    //4: actualizar el numero de intentos
    intentos--;
    if (intentos === 0){
      alert(`lo siento pero has perdido contra la maquina el numero era: ${numeroComputadora}`)
    }
  }

}

  //3 gestor de tareas
  /*
  
  3. Crea un programa orientado a objetos que sea un gestor
  de tareas.

  El programa debe de tener las siguientes clases:
  - Tarea
    - Propiedades: nombre, descripcion, fecha, completada

  - ListaTareas
    - Propiedades: tareas (array de tareas)
    - Metodos: Agregar tarea(tarea), Completar tarea(tarea), Eliminar tarea(tarea), 
    ver tareas()

  El programa debe de permitir al usuario agregar tareas,
  completar tareas y eliminar tareas. Ademas debe de permitir
  al usuario ver todas las tareas. 

  El programa debe de tener un menu que permita al usuario
  seleccionar una opcion.

  El programa debe de terminar cuando el usuario seleccione
  salir.

  debes usar alert() y prompt() para interactuar con el usuario.

  1. crear las clases con sus atributos
  2.crear las funciones de la lista
  3. hacer un ciclo para que se con opciones
*/
class Tarea {
  constructor(nombre, descripcion, fecha, completada = false) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.completada = completada; 
  }
}

class ListaTareas {
  constructor(tareas = []) {
    this.tareas = tareas;
  }

  agregarTarea(tarea) {
    this.tareas.push(tarea);
    alert(`Tarea "${tarea.nombre}" agregada.`);
  }

  completarTarea(nombre) {
    const tarea = this.tareas.find((t) => t.nombre === nombre);
    if (tarea) {
      tarea.completada = true;
      alert(`Tarea "${nombre}" marcada como completada.`);
    } else {
      alert("Tarea no encontrada.");
    }
  }

  eliminarTarea(nombre) {
    const index = this.tareas.findIndex((t) => t.nombre === nombre);
    if (index !== -1) {
      this.tareas.splice(index, 1);
      alert(`Tarea "${nombre}" eliminada.`);
    } else {
      alert("Tarea no encontrada.");
    }
  }

  verTareas() {
    if (this.tareas.length === 0) {
      alert("No hay tareas.");
    } else {
      let tareasTexto = "Lista de Tareas:\n";
      this.tareas.forEach((tarea, index) => {
        tareasTexto += `${index + 1}. ${tarea.nombre} - ${tarea.descripcion} - Fecha: ${tarea.fecha} - Completada: ${tarea.completada ? "Sí" : "No"}\n`;
      });
      alert(tareasTexto);
    }
  }
}

function mostrarMenu() {
  const listaTareas = new ListaTareas();
  let salir = false;

  while (!salir) {
    const opcion = prompt(
      "Gestor de Tareas\n\n" +
      "1. Agregar tarea\n" +
      "2. Completar tarea\n" +
      "3. Eliminar tarea\n" +
      "4. Ver todas las tareas\n" +
      "5. Salir\n\n" +
      "Seleccione una opción:"
    );

    switch (opcion) {
      case "1":
        const nombre = prompt("Ingrese el nombre de la tarea:");
        const descripcion = prompt("Ingrese la descripción de la tarea:");
        const fecha = prompt("Ingrese la fecha de la tarea (dd-mm-aaaa):");
        const tarea = new Tarea(nombre, descripcion, fecha);
        listaTareas.agregarTarea(tarea);
        break;
      case "2":
        const nombreCompletar = prompt("Ingrese el nombre de la tarea a completar:");
        listaTareas.completarTarea(nombreCompletar);
        break;
      case "3":
        const nombreEliminar = prompt("Ingrese el nombre de la tarea a eliminar:");
        listaTareas.eliminarTarea(nombreEliminar);
        break;
      case "4":
        listaTareas.verTareas();
        break;
      case "5":
        salir = true;
        alert("Saliendo del gestor de tareas.");
        break;
      default:
        alert("Opción no válida, intente de nuevo.");
        break;
    }
  }
}

mostrarMenu();