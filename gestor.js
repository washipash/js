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