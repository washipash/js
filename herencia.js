const readline = require("readline");

// Crear una interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = velocidad;
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre}, ¡prepárate para la batalla!`);
  }

  atacar(objetivo) {
    const ataqueRealizado = Math.floor(Math.random() * this.ataque);
    const defensaObjetivo = Math.floor(Math.random() * objetivo.defensa);
    const daño = Math.max(0, ataqueRealizado - defensaObjetivo);

    if (Math.random() < 0.2) {
      this.mensajeFallo(objetivo);
    } else {
      objetivo.vida -= daño;
      console.log(`${this.nombre} ataca a ${objetivo.nombre} y causa ${daño} de daño. Vida restante de ${objetivo.nombre}: ${objetivo.vida}`);
    }

    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha muerto.`);
    }
  }

  mensajeFallo(objetivo) {
    console.log(`${this.nombre} intentó atacar a ${objetivo.nombre}, pero falló.`);
  }
}

class Mago extends Personaje {
  constructor(nombre) {
    super(nombre, 50, 35, 10, Math.floor(Math.random() * 10) + 1);
    this.hechizos = [{ nombre: "Fuego", daño: 50 }, { nombre: "Hielo", daño: 30 }];
  }

  lanzarHechizo(objetivo) {
    const hechizo = this.hechizos[Math.floor(Math.random() * this.hechizos.length)];
    const defensaObjetivo = Math.floor(Math.random() * objetivo.defensa);
    const daño = Math.max(0, hechizo.daño - defensaObjetivo);

    if (Math.random() < 0.2) {
      console.log(`${this.nombre} intentó lanzar ${hechizo.nombre} a ${objetivo.nombre}, pero se quemó las manos y se hizo ${daño / 2} de daño.`);
      this.vida -= daño / 2;
    } else {
      objetivo.vida -= daño;
      console.log(`${this.nombre} lanza el hechizo '${hechizo.nombre}' a ${objetivo.nombre} y causa ${daño} de daño. Vida restante de ${objetivo.nombre}: ${objetivo.vida}`);
    }

    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha muerto.`);
    }
  }

  explotarAlMorir() {
    if (Math.random() < 0.1) {
      console.log(`${this.nombre} se volvió loco y voló en mil pedazos llevándose a todos con él.`);
      personajes.forEach(p => p.vida = 0);
    }
  }
}

class Guerrero extends Personaje {
  constructor(nombre) {
    super(nombre, 70, 15, 20, Math.floor(Math.random() * 10) + 1);
    this.armas = [{ nombre: "Espada", daño: 30 }, { nombre: "Hacha", daño: 25 }];
  }

  atacarConArma(objetivo) {
    const arma = this.armas[Math.floor(Math.random() * this.armas.length)];
    const defensaObjetivo = Math.floor(Math.random() * objetivo.defensa);
    const daño = Math.max(0, arma.daño - defensaObjetivo);

    if (Math.random() < 0.2) {
      console.log(`${this.nombre} intentó golpear a ${objetivo.nombre}, pero se dio en la nariz con su propio escudo.`);
    } else {
      objetivo.vida -= daño;
      console.log(`${this.nombre} ataca con '${arma.nombre}' a ${objetivo.nombre} y causa ${daño} de daño. Vida restante de ${objetivo.nombre}: ${objetivo.vida}`);
    }

    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha muerto.`);
    }
  }
}

class Arquero extends Personaje {
  constructor(nombre) {
    super(nombre, 50, 40, 10, Math.floor(Math.random() * 10) + 1);
    this.flechas = [{ nombre: "Flecha normal", daño: 15 }, { nombre: "Flecha venenosa", daño: 20 }];
  }

  dispararFlecha(objetivo) {
    const flecha = this.flechas[Math.floor(Math.random() * this.flechas.length)];
    const defensaObjetivo = Math.floor(Math.random() * objetivo.defensa);
    const daño = Math.max(0, flecha.daño - defensaObjetivo);

    if (Math.random() < 0.2) {
      console.log(`${this.nombre} intentó lanzar una flecha a ${objetivo.nombre}, pero resbaló y se le cayó todo al piso.`);
    } else {
      objetivo.vida -= daño;
      console.log(`${this.nombre} dispara '${flecha.nombre}' a ${objetivo.nombre} y causa ${daño} de daño. Vida restante de ${objetivo.nombre}: ${objetivo.vida}`);
    }

    if (objetivo.vida <= 0) {
      console.log(`${objetivo.nombre} ha muerto.`);
    }
  }
}

// Crear personajes con nombres personalizados
const personajes = [
  new Mago("Gandalf"),
  new Mago("Malzahar"),
  new Guerrero("Alpharius"),
  new Arquero("twitch"),
  new Arquero("Legolas")
];

// Mostrar la pantalla de presentación
function pantallaPresentacion(callback) {
  console.log("¡Bienvenidos al combate!");
  personajes.forEach(personaje => personaje.saludar());

  console.log("\nElige tu personaje:");
  personajes.forEach((personaje, index) => {
    console.log(`${index + 1}. ${personaje.nombre} - Clase: ${personaje.constructor.name}`);
  });

  rl.question("Ingresa el número de tu elección: ", (input) => {
    const eleccion = parseInt(input) - 1;
    if (eleccion >= 0 && eleccion < personajes.length) {
      console.log(`\n¡Has elegido a ${personajes[eleccion].nombre}!`);
      callback(personajes[eleccion]);
    } else {
      console.log("Elección no válida. Se seleccionará un personaje al azar.");
      callback(personajes[Math.floor(Math.random() * personajes.length)]);
    }
  });
}

// Función para obtener un personaje aleatorio que esté vivo
function obtenerObjetivoAleatorio(excepto) {
  let objetivo;
  do {
    objetivo = personajes[Math.floor(Math.random() * personajes.length)];
  } while (objetivo === excepto || objetivo.vida <= 0);
  return objetivo;
}

// Ciclo de combate
function iniciarCombate() {
  while (personajes.filter(p => p.vida > 0).length > 1) {
    personajes.forEach(personaje => {
      if (personaje.vida > 0) {
        const objetivo = obtenerObjetivoAleatorio(personaje);
        const accion = Math.floor(Math.random() * 2);
        switch (personaje.constructor.name) {
          case "Mago":
            if (accion === 0) personaje.atacar(objetivo);
            else personaje.lanzarHechizo(objetivo);
            if (personaje.vida <= 0) personaje.explotarAlMorir();
            break;
          case "Guerrero":
            if (accion === 0) personaje.atacar(objetivo);
            else personaje.atacarConArma(objetivo);
            break;
          case "Arquero":
            personaje.dispararFlecha(objetivo);
            break;
        }
      }
    });
  }

  const ganador = personajes.find(p => p.vida > 0);
  if (ganador) {
    console.log(`El ganador es ${ganador.nombre} con ${ganador.vida} HP restantes.`);
  } else {
    console.log("No quedó nadie en pie, todos han muerto.");
  }
  rl.close(); // Cerrar la interfaz de readline al terminar
}

// Pantalla inicial
pantallaPresentacion(() => iniciarCombate());
