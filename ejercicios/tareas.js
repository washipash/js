let tareas = [];

    function agregarTarea() {
      const nombre = document.getElementById("nombre").value.trim();
      if (!nombre) {
        alert("El nombre de la tarea no puede estar vacío.");
        return;
      }

      const nuevaTarea = {
        id: Date.now(),
        nombre: nombre,
        completada: false
      };

      tareas.push(nuevaTarea);
      document.getElementById("nombre").value = "";
      actualizarLista();
    }

    function eliminarTarea(id) {
      tareas = tareas.filter(tarea => tarea.id !== id);
      actualizarLista();
    }

    function editarTarea(id) {
      const nuevaTarea = prompt("Edita el nombre de la tarea:");
      if (nuevaTarea) {
        const tarea = tareas.find(t => t.id === id);
        if (tarea) {
          tarea.nombre = nuevaTarea.trim();
          actualizarLista();
        }
      }
    }

    function completarTarea(id) {
      const tarea = tareas.find(t => t.id === id);
      if (tarea) {
        tarea.completada = !tarea.completada;
        actualizarLista();
      }
    }
//
    function actualizarLista() {
      const container = document.getElementById("tareasContainer");
      container.innerHTML = "";
// mostrar tareas
      tareas.forEach(tarea => {
        const fila = document.createElement("div");
        fila.className = `grid grid-cols-4 gap-4 items-center p-2 rounded-md border ${tarea.completada ? "bg-green-100" : "bg-white"}`; //marcar en verde las tareas completadas
        fila.innerHTML = `
          <div>${tarea.nombre}</div> 
          <div>
            <button onclick="eliminarTarea(${tarea.id})" class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Eliminar</button>
          </div>
          <div>
            <button onclick="editarTarea(${tarea.id})" class="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">Editar</button>
          </div>
          <div>
            <button onclick="completarTarea(${tarea.id})" class="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600">${tarea.completada ? "Desmarcar" : "Completar"}</button>
          </div>
        `;
        container.appendChild(fila);
      });
    }