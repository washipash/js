
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
  */

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

  // Actualizar resultados en pantalla
  function actualizarResultados(mensaje, usuario, computadora) {
      document.getElementById("jugador").textContent = `Usuario: ${opciones[usuario]}`;
      document.getElementById("maquina").textContent = `Computadora: ${opciones[computadora]}`;
      document.getElementById("mensaje").textContent = mensaje;
      document.getElementById("partidas").textContent = `Partidas jugadas: ${partidasJugadas}`;
      document.getElementById("victoriasUsuario").textContent = `Victorias del usuario: ${victoriasUsuario}`;
      document.getElementById("victoriasComputadora").textContent = `Victorias de la computadora: ${victoriasComputadora}`;
  }

  // Manejador de clic
  function jugar(opcionUsuario) {
      const opcionComputadora = retador();
      const resultado = determinarGanador(opcionUsuario, opcionComputadora);

      let mensaje = "";
      if (resultado === "Usuario") {
          mensaje = "¡Ganaste esta ronda!";
          victoriasUsuario++;
      } else if (resultado === "Computadora") {
          mensaje = "La computadora gana esta ronda.";
          victoriasComputadora++;
      } else {
          mensaje = "Es un empate.";
      }

      partidasJugadas++;
      actualizarResultados(mensaje, opcionUsuario, opcionComputadora);
  }

  // Agregar eventos a los botones
  document.getElementById("piedra").addEventListener("click", () => jugar(0));
  document.getElementById("papel").addEventListener("click", () => jugar(1));
  document.getElementById("tijeras").addEventListener("click", () => jugar(2));