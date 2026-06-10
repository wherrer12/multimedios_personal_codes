/* Archivo principal de la aplicacion. */

import { modulos } from "./config.js"; // Importa la lista de modulos del sistema
import { consultarRegistrosApi, enviarRegistroApi } from "./api.js"; // Importa las funciones de Fetch

let moduloActual = modulos[0]; // Guarda el modulo seleccionado; inicia con Hoteles
let registros = []; // Guarda los datos consultados desde la API
let idEditar = ""; // Guarda el ID del registro que se esta editando

const menu = document.getElementById("menu"); // Obtiene el contenedor del menu
const tarjeta = document.querySelector(".tarjeta"); // Obtiene la tarjeta principal
const tituloTarjeta = document.getElementById("tituloTarjeta"); 
const formulario = document.getElementById("formulario"); 
const mensaje = document.getElementById("mensaje"); 
const zonaConsulta = document.getElementById("zonaConsulta");
const accionesFormulario = document.getElementById("accionesFormulario"); 
const tablaEncabezado = document.getElementById("tablaEncabezado"); 
const tablaCuerpo = document.getElementById("tablaCuerpo");
const btnCrear = document.getElementById("btnCrear"); 
const btnActualizar = document.getElementById("btnActualizar"); 
const btnLimpiar = document.getElementById("btnLimpiar"); 
const btnConsultar = document.getElementById("btnConsultar"); 

document.addEventListener("DOMContentLoaded", iniciar); // Ejecuta iniciar cuando el HTML ya cargo

function iniciar() { // Funcion que inicia la aplicacion
  crearMenu(); // Crea el menu de navegacion
  seleccionarModulo(0, "crear"); // Muestra el formulario de Hoteles al iniciar

  btnCrear.addEventListener("click", guardarRegistro); // Conecta el boton Guardar
  btnActualizar.addEventListener("click", actualizarRegistro); // Conecta el boton Actualizar
  btnLimpiar.addEventListener("click", limpiarFormulario); // Conecta el boton Limpiar
  btnConsultar.addEventListener("click", consultarRegistros); // Conecta el boton Consultar
  tablaCuerpo.addEventListener("click", manejarClickTabla); // Conecta los botones de la tabla
}

function crearMenu() { // Crea el menu superior
  menu.innerHTML = ""; // Limpia el menu antes de mostrarlo

  modulos.forEach((modulo, posicion) => { // Recorre cada modulo configurado
    const item = document.createElement("li"); // Crea un elemento li para el menu
    item.className = "menu-item"; // Asigna la clase CSS del item
    item.innerHTML = ` 
      <a class="menu-boton" href="#">${modulo.nombre}</a>
      <div class="submenu">
        <button type="button" data-posicion="${posicion}" data-accion="crear">Crear</button>
        <button type="button" data-posicion="${posicion}" data-accion="consultar">Consultar</button>
      </div>
    `; // Agrega el boton del modulo y sus opciones
    menu.appendChild(item); // Inserta el item dentro del menu
  });

  menu.addEventListener("click", (evento) => { // Escucha clics dentro del menu
    const boton = evento.target.closest("button"); // Busca si el clic fue en un boton

    if (!boton) { // Si no fue un boton, no hace nada
      return; 
    }

    seleccionarModulo(boton.dataset.posicion, boton.dataset.accion); // Cambia de modulo y accion
  });
}

function seleccionarModulo(posicion, accion) { // Cambia la pantalla segun modulo y accion
  moduloActual = modulos[posicion]; // Guarda el modulo seleccionado
  limpiarMensaje(); 
  limpiarFormulario();

  if (accion === "consultar") { // Revisa si el usuario eligio consultar
    tarjeta.classList.add("modo-consulta"); // Agranda la tarjeta para tablas
    tituloTarjeta.textContent = "Consultar " + moduloActual.nombre.toLowerCase(); // Cambia el titulo
    formulario.classList.add("oculto"); // Oculta el formulario
    accionesFormulario.classList.add("oculto"); // Oculta los botones del formulario
    zonaConsulta.classList.remove("oculto"); // Muestra la zona de consulta
    pintarTabla([]); // Muestra una tabla vacia al inicio
    return; 
  }

  tarjeta.classList.remove("modo-consulta"); // Devuelve la tarjeta a tamano del form
  tituloTarjeta.textContent = "Crear " + moduloActual.nombre.toLowerCase(); // Cambia el titulo a crear
  formulario.classList.remove("oculto"); // Muestra el formulario
  accionesFormulario.classList.remove("oculto"); // Muestra los botones del formulario
  zonaConsulta.classList.add("oculto"); // Oculta la zona de consulta
  pintarFormulario(); // Muetra campos del form
}

function pintarFormulario() { // Muestra el formulario del modulo actual
  formulario.innerHTML = ""; 

  moduloActual.campos.forEach((campo) => { // Recorre los campos configurados
    const grupo = document.createElement("div"); // Crea el contenedor del campo
    grupo.className = "campo"; // Asigna la clase CSS del campo
    grupo.innerHTML = `
      <label for="${campo.nombre}">${campo.texto}</label>
      <input id="${campo.nombre}" name="${campo.nombre}" type="${campo.tipo}" step="any" placeholder="${campo.ayuda}">
      <div class="error">Por favor, ingrese un dato valido.</div>
    `; // Crea label, input y mensaje de error
    formulario.appendChild(grupo); // Inserta el campo dentro del formulario
  });
}

function obtenerDatosFormulario() { // Obtiene los valores escritos en el formulario
  const datos = {}; // Crea el objeto que se enviara como JSON

  moduloActual.campos.forEach((campo) => { // Recorre cada campo del modulo.
    const input = document.getElementById(campo.nombre); // Busca el input por su id
    const valor = input.value.trim(); 

    if (campo.tipo === "datetime-local") { // Revisa si es un campo de fecha y hora
      datos[campo.nombre] = valor.replace("T", " ") + ":00"; // Cambia formato HTML a formato de API.
      return; // Pasa al siguiente campo
    }

    datos[campo.nombre] = valor; // Guarda el valor normal en el objeto
  });

  return datos; 
}

function validarFormulario() { // Valida que los campos no esten vacios
  let formularioValido = true; // Variable que indica si todo esta correcto

  moduloActual.campos.forEach((campo) => { // Recorre cada campo del formulario
    const input = document.getElementById(campo.nombre); // Busca el input correspondiente
    input.classList.remove("invalido"); // Quita marca de error anterior

    if (input.value.trim() === "") { // Revisa si el campo esta vacio
      input.classList.add("invalido"); // Marca el campo como invalido
      formularioValido = false; 
    }
  });

  if (!formularioValido) { // Revisa si hay errores
    mostrarMensaje("Complete los campos marcados.", "aviso"); // Muestra mensaje de validacion
  }

  return formularioValido; 
}

function limpiarFormulario() { 
  idEditar = "";
  btnCrear.classList.remove("oculto"); // Muestra el boton Guardar
  btnActualizar.classList.add("oculto"); // Oculta el boton Actualizar
  formulario.reset();

  document.querySelectorAll(".invalido").forEach((input) => { // Busca campos marcados como invalidos
    input.classList.remove("invalido"); // Quita invalido
  });
}

async function guardarRegistro() { // Guarda un registro nuevo
  if (!validarFormulario()) { // Valida antes de enviar
    return; 
  }

  await enviarDatos("POST", obtenerDatosFormulario(), "Registro guardado correctamente."); // Envia datos con POST
}

async function actualizarRegistro() { // Actualiza un registro existente
  if (!idEditar) { // Revisa si hay un registro seleccionado
    mostrarMensaje("Seleccione un registro para actualizar.", "aviso"); // Muestra aviso si no hay seleccion
    return; // Sale de la funcion
  }

  if (!validarFormulario()) { // Valida el formulario antes de actualizar
    return; // Si no es valido, no continua
  }

  const datos = obtenerDatosFormulario(); // Obtiene los datos del formulario
  datos.id = idEditar; // Agrega el ID al JSON para que la API sepa cual actualizar

  const correcto = await enviarDatos("PUT", datos, "Registro actualizado correctamente."); // Envia datos con PUT

  if (correcto) { 
    tituloTarjeta.textContent = "Crear " + moduloActual.nombre.toLowerCase(); // Vuelve el titulo a Crear
  }
}

async function eliminarRegistro(id) { //  desactiva  registro
  const idRegistro = normalizarId(id); // Limpia  ID recibido desde la tabla

  if (idRegistro === "") { // Revisa si no se encontro ID
    mostrarMensaje("No se encontro el ID del registro para eliminar/desactivar.", "aviso"); 
    return; // Sale de la funcion
  }

  if (!confirm("Desea eliminar este registro? La API lo desactiva logicamente.")) { // Pide confirmacion
    return; // Si el usuario cancela, no continua
  }

  const correcto = await enviarDatos("DELETE", { id: idRegistro }, "Registro eliminado/desactivado correctamente."); 

  if (correcto) { // Revisa si la API respondio bien
    await consultarRegistros(); // Actualiza la tabla
  }
}

async function consultarRegistros() { // Consulta registros del modulo actual
  limpiarMensaje(); // Limpia mensajes anteriores

  try { 
    registros = await consultarRegistrosApi(moduloActual); // Guarda los datos recibidos
    pintarTabla(registros); // Muestra los datos en la tabla
    mostrarMensaje("Consulta realizada. Registros: " + registros.length, "exito"); 
  } catch (error) { // Entra si hay error en la consulta.
    mostrarMensaje(error.message, "error-mensaje"); 
  }
}

async function enviarDatos(metodo, datos, textoExito) { // Envia datos a la API
  limpiarMensaje(); 

  try { // Intenta enviar datos
    const resultado = await enviarRegistroApi(moduloActual, metodo, datos); // Llama a la funcion Fetch
    mostrarMensaje(resultado.message || textoExito, "exito"); // Muestra mensaje de exito
    limpiarFormulario(); // Limpia el formulario despues de guardar o actualizar
    return true; 
  } catch (error) { 
    mostrarMensaje(error.message, "error-mensaje"); // Muestra mensaje de error
    return false; // Indica que la accion fallo
  }
}

function pintarTabla(lista) { // Dibuja la tabla de consulta
  tablaEncabezado.innerHTML = ""; // Limpia encabezados anteriores
  tablaCuerpo.innerHTML = ""; // Limpia filas anteriores

  const filaEncabezado = document.createElement("tr"); 

  moduloActual.columnas.forEach((columna) => { // Recorre las columnas configuradas
    filaEncabezado.innerHTML += "<th>" + columna + "</th>"; 
  });

  filaEncabezado.innerHTML += "<th>Acciones</th>"; // Agrega columna para botones
  tablaEncabezado.appendChild(filaEncabezado); 

  if (lista.length === 0) { // Revisa si no hay registros
    tablaCuerpo.innerHTML = `
      <tr>
        <td colspan="${moduloActual.columnas.length + 1}" class="text-center">
          No hay datos para mostrar.
        </td>
      </tr>
    `; // Muestra una fila informativa
    return; // Sale de la funcion
  }

  lista.forEach((registro, posicion) => { // Recorre cada registro recibido
    const fila = document.createElement("tr"); // Crea una fila para el registro

    moduloActual.columnas.forEach((columna) => { // Recorre cada columna
      fila.innerHTML += "<td>" + escapar(obtenerValor(registro, columna)) + "</td>"; // Agrega una celda
    });

    fila.innerHTML += `
      <td>
        <div class="botones-tabla">
          <button class="btn btn-sm btn-warning" type="button" data-accion="editar" data-posicion="${posicion}">
            Editar
          </button>
          <button class="btn btn-sm btn-danger" type="button" data-accion="eliminar" data-id="${escapar(obtenerId(registro))}">
            Eliminar
          </button>
        </div>
      </td>
    `; // Agrega botones Editar y Eliminar

    tablaCuerpo.appendChild(fila); // Inserta la fila en el cuerpo de la tabla
  });
}

function manejarClickTabla(evento) { // Maneja clics dentro de la tabla
  const boton = evento.target.closest("button"); // Busca si el clic fue en un boton

  if (!boton) { // Si no fue un boton, no hace nada.
    return; // Sale de la funcion
  }

  if (boton.dataset.accion === "editar") { // Revisa si el boton es Editar
    editarRegistro(boton.dataset.posicion); // Carga el registro en el formulario
  }

  if (boton.dataset.accion === "eliminar") { // Revisa si el boton es Eliminar
    eliminarRegistro(boton.dataset.id); // Llama a eliminar/desactivar
  }
}

function editarRegistro(posicion) { // Carga un registro para actualizar
  const registro = registros[posicion]; // Obtiene el registro segun su posicion
  idEditar = obtenerId(registro); 

  tarjeta.classList.remove("modo-consulta"); // Devuelve la tarjeta a tamano de formulario
  tituloTarjeta.textContent = "Actualizar " + moduloActual.nombre.toLowerCase(); // Cambia el titulo
  zonaConsulta.classList.add("oculto"); // Oculta la tabla
  formulario.classList.remove("oculto"); // Muestra el formulario
  accionesFormulario.classList.remove("oculto"); // Muestra botones del formulario
  btnCrear.classList.add("oculto"); // Oculta Guardar
  btnActualizar.classList.remove("oculto"); // Muestra Actualizar
  pintarFormulario(); 

  moduloActual.campos.forEach((campo) => { // Recorre los campos del formulario
    const valor = obtenerValor(registro, campo.nombre); // Obtiene el valor del registro
    document.getElementById(campo.nombre).value = prepararValorParaInput(valor, campo.tipo); // Coloca valor en el input
  });
}

function prepararValorParaInput(valor, tipo) { // Prepara valores antes de ponerlos en inputs
  if (valor === null || valor === undefined) { // Revisa si no hay valor
    return ""; 
  }

  if (tipo === "datetime-local") { // Revisa si input necesita fecha y hora
    return String(valor).replace(" ", "T").slice(0, 16); // Convierte formato API a HTML
  }

  return valor; 
}

function obtenerId(registro) { // Obtiene el ID principal del registro
  return registro.id || ""; // La API usa el campo id
}

function obtenerValor(registro, campo) { // Obtiene un valor
  return registro[campo] || ""; // Devuelve el campo exacto definido en config.js
}

function normalizarId(id) { // Limpia el ID recibido desde la tabla
  if (id === undefined || id === null || id === "") { // Revisa si no hay ID
    return ""; 
  }

  return String(id).trim(); // Convierte el ID a texto y quita espacios
}

function mostrarMensaje(texto, tipo) { // Muestra mensajes en pantalla
  mensaje.textContent = texto; 
  mensaje.className = "mensaje " + tipo; // Asigna la clase visual del mensaje
}

function limpiarMensaje() { // Limpia el mensaje visible
  mensaje.textContent = ""; 
  mensaje.className = "mensaje oculto"; 
}

function escapar(valor) { // Escapa texto para evitar insertar HTML desde la API
  return String(valor ?? "") // Convierte el valor a texto
    .replaceAll("&", "&amp;") // signo &
    .replaceAll("<", "&lt;") // signo menor que
    .replaceAll(">", "&gt;") // signo mayor que
    .replaceAll('"', "&quot;") // comillas dobles
    .replaceAll("'", "&#039;"); // comillas simples
}
