
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
      alert("Felicidades adivinaste correctamente el numero");
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

