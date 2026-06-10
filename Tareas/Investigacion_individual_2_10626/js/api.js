/* funciones que se comunican con la API REST */

import { urlBase } from "./config.js"; // Importa la direccion de la API

export async function consultarRegistrosApi(modulo) { // Funcion consultar registros
  const respuesta = await fetch(urlBase + modulo.endpoint); // Envia solicitud GET al endpoint
  const datos = await leerJson(respuesta); // Convierte la respuesta del servidor a JSON

  if (!respuesta.ok || esErrorDeApi(datos)) { // Revisa si hubo error HTTP o error indicado por la API
    throw new Error(obtenerMensaje(datos, "No se pudo consultar la API")); // Envia el error al archivo principal
  }

  return convertirEnLista(datos); 
}

export async function enviarRegistroApi(modulo, metodo, datos) { // Funcion para POST, PUT y DELETE
  const respuesta = await fetch(urlBase + modulo.endpoint, {
    method: metodo, // Metodo HTTP recibido: POST, PUT o DELETE
    headers: { // Encabezados de la solicitud
      "Content-Type": "application/json", // Indica que se envia JSON
      Accept: "application/json" // Indica que se espera una respuesta JSON
    },
    body: JSON.stringify(datos) // Convierte el objeto JavaScript a texto JSON
  });

  const resultado = await leerJson(respuesta); 

  if (!respuesta.ok || esErrorDeApi(resultado)) { // Revisa si la API respondio con error
    throw new Error(obtenerMensaje(resultado, "No se pudo completar la accion"));
  }

  return resultado; 
}

async function leerJson(respuesta) { //Lectura JSON
  const texto = await respuesta.text(); 

  if (!texto) {
    return {}; // Devuelve un objeto vacio para evitar errores
  }

  try { 
    return JSON.parse(texto); 
  } catch { // Entra aqui si la respuesta no era JSON valido
    return { message: texto }; 
  }
}

function convertirEnLista(datos) { // Convierte la respuesta de esta API en una lista.
  if (datos && Array.isArray(datos.data)) { // La API devuelve los registros dentro de data.
    return datos.data; // Devuelve la lista de registros.
  }

  return []; // Si data no existe, devuelve una lista vacia
}

function obtenerMensaje(datos, mensajeDefecto) { 
  return datos.message || datos.mensaje || datos.error || mensajeDefecto; // Usa el primer mensaje disponible
}

function esErrorDeApi(datos) { // Detecta errores enviados dentro del JSON
  return datos && datos.code !== undefined && Number(datos.code) >= 400; //error
}
