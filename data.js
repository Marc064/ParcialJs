const data = {
  "tasks":{
    "one":{
      "task":"Learning Javascript",
      "state":true,
      "end":"2020/10/21"
    },
    "two":{
      "task":"Reader Book Clean Code",
      "state":false,
      "end":"2023/12/31"
    },
    "three":{
      "task":"Running",
      "state":false,
      "end":"2023/06/25"
    },
    "four":{
      "task":"Pass the Evaluation",
      "state":false,
      "end":"2023/11/09"
    },
    "five":{
      "task":"Go to Karaoke",
      "state":true,
      "end":"2022/08/25"
    },
    "six":{
      "task":"Finish watching the serie",
      "state":false,
      "end":"2023/12/31"
    },
    "seven":{
      "task":"Controll Weight",
      "state":false,
      "end":"2020/11/22"
    }
  }
}


function actualizar() {
  const filas = document.getElementById('cuerpoTabla');
  
  const tareaIdsOrdenadas = Object.keys(data.tasks).sort((a, b) => {
    const fechaA = new Date(data.tasks[a].end)
    const fechaB = new Date(data.tasks[b].end)
    return fechaA - fechaB;
  });

  filas.innerHTML = ''

  tareaIdsOrdenadas.forEach(tareaId => {

    const tarea = data.tasks[tareaId];
    const fechaFin = new Date(tarea.end);
    const realizada = tarea.state;

    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${tarea.task}</td>
                      <td>${realizada ? '<span style="color: green;">Realizada</span>' : 'Pendiente'}</td>
                      <td>${tarea.end}</td>
                      <td>${validarFecha(fechaFormatoOriginal(fechaFin)) ? '<span style="color: black;">NO</span>' : '<span style="color: red;">SI</span>'}</td>
                      <td><button onclick="cambiarEstado('${tareaId}')">Cambiar</button></td>`;

    filas.appendChild(fila)
  })
}


actualizar()


const cambiarEstado = function(tareaId) {
  const tarea = data.tasks[tareaId];
  tarea.state = !tarea.state
  actualizar()
}


const agregar= ()=>{

  const tarea = document.getElementById('tarea').value
  const estado = document.getElementById('estado').value
  const fecha = document.getElementById('fecha').value
console.log(validarFecha(fecha));
  if (tarea != "") {
    if (validarFecha(fecha)) {
      const nuevoId = 'task' + (Object.keys(data.tasks).length + 1)
  
      const nuevaTarea = {
        task: tarea,
        state: estado == 0 ? false:true,
        end: cambiarFormatoFecha(fecha)
      }
  
      data.tasks[nuevoId] = nuevaTarea
  
      actualizar()
  
    } else {
      alert('No se puede ingrear una fecha inferior a la actual')
    }
  } else {
    alert('Se debe llenar todos los campos')
  }

}


function cambiarFormatoFecha(fechaOriginal) {
  const fechaObj = new Date(fechaOriginal)
  const nuevoAnio = fechaObj.getFullYear()
  const nuevoMes = String(fechaObj.getMonth() + 1).padStart(2, '0')
  const nuevoDia = String(fechaObj.getDate()).padStart(2, '0')
  const fechaFormateada = `${nuevoAnio}/${nuevoMes}/${nuevoDia}`

  return fechaFormateada;

}

function fechaFormatoOriginal(fechaOriginal) {
  const fechaObj = new Date(fechaOriginal)
  const nuevoAnio = fechaObj.getFullYear()
  const nuevoMes = String(fechaObj.getMonth() + 1).padStart(2, '0')
  const nuevoDia = String(fechaObj.getDate()).padStart(2, '0')
  const fechaFormateada = `${nuevoAnio}-${nuevoMes}-${nuevoDia}`

  return fechaFormateada;
}

function validarFecha(fechaIngresada) {
  const fechaActual = new Date()
  const partesFecha = fechaIngresada.split('-')
  const fechaIngresadaObj = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2])
  
  fechaActual.setHours(0, 0, 0, 0)
  fechaIngresadaObj.setHours(0, 0, 0, 0)

  return fechaIngresadaObj >= fechaActual ? true:false
}


const filtrar = ()=>{
  const filtro = document.getElementById('filtro').value
  console.log(filtro);
  
}
