const data = {
  "tasks": {
    "one": {
      "task": "Learning Javascript",
      "state": true,
      "end": "2020/10/21"
    },
    "two": {
      "task": "Reader Book Clean Code",
      "state": false,
      "end": "2023/12/31"
    },
    "three": {
      "task": "Running",
      "state": false,
      "end": "2023/06/25"
    },
    "four": {
      "task": "Pass the Evaluation",
      "state": false,
      "end": "2023/11/09"
    },
    "five": {
      "task": "Go to Karaoke",
      "state": true,
      "end": "2022/08/25"
    },
    "six": {
      "task": "Finish watching the serie",
      "state": false,
      "end": "2023/12/31"
    },
    "seven": {
      "task": "Controll Weight",
      "state": false,
      "end": "2020/11/22"
    }
  }
}

const numbers = { 8: "eight", 9: "nine", 10: "ten", 11: "eleven", 12: "twelve", 13: "thirteen", 14: "fourteen", 15: "fiveteen", 16: "sixteen", 17: "seventeen", 18: "eighteen", 19: "nineteen", 20: "twenty" }
var state = "0"
function actualizar() {
  
  const filas = document.getElementById('cuerpoTabla');

  const tareaIdsOrdenadas = Object.keys(data.tasks).sort((a, b) => {
    const fechaA = new Date(data.tasks[a].end)
    const fechaB = new Date(data.tasks[b].end)
    return fechaA - fechaB;
  });

  const filtro = tareaIdsOrdenadas.filter((a)=>{
    switch (state) {
      case "1":
        return data.tasks[a].state === true 
        break;
      case "2":
        return data.tasks[a].state === false && validarFecha(cambiarFormatoFecha(data.tasks[a].end, '-'))
        break;
        case "3":
      return data.tasks[a].state === true && !validarFecha(cambiarFormatoFecha(data.tasks[a].end, '-'))
        break;
      default:
        return tareaIdsOrdenadas
        break;
    }
  })

  filas.innerHTML = ''

  filtro.forEach(tareaId => {

    const tarea = data.tasks[tareaId];
    const fechaFin = new Date(tarea.end);
    const realizada = tarea.state;

    const fila = document.createElement('tr');
    let aux = `<td>${tarea.task}</td>
                      <td>${realizada ? '<span style="color: green;">Realizada</span>' : 'Pendiente'}</td>
                      <td>${tarea.end}</td>`
    if (validarFecha(cambiarFormatoFecha(fechaFin, '-'))) {
      aux += `<td><span style="color: black;">NO</span></td>
                      <td><button class="btn btn-primary" onclick="cambiarEstado('${tareaId}')">Cambiar</button></td>`;
    } else {
      aux += `<td><span style="color: red;">SI</span></td>
                        <td><button class="btn btn-primary" onclick="cambiarEstado('${tareaId}')" disabled >Cambiar</button></td>`;
    }
    fila.innerHTML = aux
    filas.appendChild(fila)
  })
  console.log(data);
}


actualizar()


const cambiarEstado = function (tareaId) {
  const tarea = data.tasks[tareaId];
  tarea.state = !tarea.state
  actualizar()
}


const agregar = () => {

  const tarea = document.getElementById('tarea').value
  const estado = document.getElementById('estado').value
  const fecha = document.getElementById('fecha').value
  console.log(validarFecha(fecha));
  if (tarea != "") {
    if (validarFecha(fecha)) {

      if (Object.keys(data.tasks).length < 20) {
        const nuevoId = numbers[Object.keys(data.tasks).length + 1]

      const nuevaTarea = {
        task: tarea,
        state: estado == 0 ? false : true,
        end: cambiarFormatoFecha(fecha, '/')
      }

      data.tasks[nuevoId] = nuevaTarea
      console.log(data.tasks);
      actualizar()
      alert("Taera Agregada Correctamente")
      } else {
        alert('Se llego al limite de tareas')
      }

    } else {
      alert('No se puede ingrear una fecha inferior a la actual')
    }
  } else {
    alert('Se debe llenar todos los campos ')
  }

}


function cambiarFormatoFecha(fechaOriginal, separador) {
  const fechaObj = new Date(fechaOriginal)
  const nuevoAnio = fechaObj.getFullYear()
  const nuevoMes = String(fechaObj.getMonth() + 1).padStart(2, '0')
  const nuevoDia = String(fechaObj.getDate()).padStart(2, '0')
  const fechaFormateada = `${nuevoAnio}${separador}${nuevoMes}${separador}${nuevoDia}`

  return fechaFormateada;

}


function validarFecha(fechaIngresada) {
  const fechaActual = new Date()
  const partesFecha = fechaIngresada.split('-')
  const fechaIngresadaObj = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2])

  fechaActual.setHours(0, 0, 0, 0)
  fechaIngresadaObj.setHours(0, 0, 0, 0)

  return fechaIngresadaObj >= fechaActual
}


const filtrar = () => {
  state = document.getElementById('filtro').value
  actualizar()

}
