/* configuracion de la aplicacion */

export const urlBase = "https://paginas-web-cr.com"; // En lace base de la API REST

export const modulos = [ // Lista de modulos que aparecen en el menu.
  { 
    nombre: "Hoteles", //Hoteles
    endpoint: "/Api/hotelApi/hotel/hotel.php", // Endpoint para Hoteles
    columnas: ["id", "nombre", "descripcion", "telefono", "correo", "sitio_web", "usuario", "estado"], // Columnas tabla
    campos: [ // Campos del formulario
      { nombre: "nombre", texto: "Nombre", tipo: "text", ayuda: "Digite el nombre" }, // Campo nombre.
      { nombre: "descripcion", texto: "Descripcion", tipo: "text", ayuda: "Digite la descripcion" }, // Campo descripcion.
      { nombre: "telefono", texto: "Telefono", tipo: "text", ayuda: "Digite el telefono" }, // Campo telefono.
      { nombre: "correo", texto: "Correo", tipo: "email", ayuda: "Digite el correo" }, // Campo correo.
      { nombre: "sitio_web", texto: "Sitio web", tipo: "text", ayuda: "Digite el sitio web" }, // Campo sitio web.
      { nombre: "usuario", texto: "Usuario", tipo: "text", ayuda: "Digite el usuario" } // Campo usuario.
    ]
  },
  {
    nombre: "Sedes", //Sedes
    endpoint: "/Api/hotelApi/sede/sede.php", 
    columnas: [ 
      "id", 
      "id_hotel", 
      "nombre", 
      "pais", 
      "provincia", 
      "ciudad", 
      "direccion",
      "telefono", 
      "correo", 
      "cantidad_habitaciones", 
      "usuario", 
      "activo" 
    ],
    campos: [ // Campos form Sedes
      { nombre: "id_hotel", texto: "ID hotel", tipo: "number", ayuda: "Digite el ID del hotel" },
      { nombre: "nombre", texto: "Nombre", tipo: "text", ayuda: "Digite el nombre" }, 
      { nombre: "pais", texto: "Pais", tipo: "text", ayuda: "Digite el pais" },
      { nombre: "provincia", texto: "Provincia", tipo: "text", ayuda: "Digite la provincia" }, 
      { nombre: "ciudad", texto: "Ciudad", tipo: "text", ayuda: "Digite la ciudad" }, 
      { nombre: "direccion", texto: "Direccion", tipo: "text", ayuda: "Digite la direccion" }, 
      { nombre: "telefono", texto: "Telefono", tipo: "text", ayuda: "Digite el telefono" }, 
      { nombre: "correo", texto: "Correo", tipo: "email", ayuda: "Digite el correo" }, 
      { nombre: "cantidad_habitaciones", texto: "Cantidad habitaciones", tipo: "number", ayuda: "Digite la cantidad de habitaciones" }, 
      { nombre: "usuario", texto: "Usuario", tipo: "text", ayuda: "Digite el usuario" } 
    ]
  },
  { // modulo Habitaciones
    nombre: "Habitaciones",
    endpoint: "/Api/hotelApi/habitacion/habitacion.php", 
    columnas: ["id", "id_sede", "numero", "tipo", "descripcion", "precio", "capacidad", "estado", "usuario", "activo"], 
    campos: [ 
      { nombre: "id_sede", texto: "ID sede", tipo: "number", ayuda: "Digite el ID de la sede" }, 
      { nombre: "numero", texto: "Numero", tipo: "text", ayuda: "Digite el numero" }, 
      { nombre: "tipo", texto: "Tipo", tipo: "text", ayuda: "Digite el tipo" }, 
      { nombre: "descripcion", texto: "Descripcion", tipo: "text", ayuda: "Digite la descripcion" }, 
      { nombre: "precio", texto: "Precio", tipo: "number", ayuda: "Digite el precio" }, 
      { nombre: "capacidad", texto: "Capacidad", tipo: "number", ayuda: "Digite la capacidad" }, 
      { nombre: "estado", texto: "Estado", tipo: "text", ayuda: "Digite el estado" }, 
      { nombre: "usuario", texto: "Usuario", tipo: "text", ayuda: "Digite el usuario" } 
    ]
  },
  { // Inicio del modulo Clientes
    nombre: "Clientes",
    endpoint: "/Api/hotelApi/cliente/cliente.php", 
    columnas: ["id", "identificacion", "nombre", "apellidos", "correo", "telefono", "estado"], 
    campos: [ 
      { nombre: "identificacion", texto: "Identificacion", tipo: "text", ayuda: "Digite la identificacion" }, 
      { nombre: "nombre", texto: "Nombre", tipo: "text", ayuda: "Digite el nombre" }, 
      { nombre: "apellidos", texto: "Apellidos", tipo: "text", ayuda: "Digite los apellidos" }, 
      { nombre: "correo", texto: "Correo", tipo: "email", ayuda: "Digite el correo" }, 
      { nombre: "telefono", texto: "Telefono", tipo: "text", ayuda: "Digite el telefono" } 
    ]
  },
  { // Inicio modulo Reservaciones
    nombre: "Reservaciones", 
    endpoint: "/Api/hotelApi/reservacion/reservacion.php", 
    columnas: ["id", "id_cliente", "id_habitacion", "fecha_entrada", "fecha_salida", "cantidad_personas", "estado", "total", "usuario", "activo"], // Columnas de la tabla.
    campos: [ 
      { nombre: "id_cliente", texto: "ID cliente", tipo: "number", ayuda: "Digite el ID del cliente" }, 
      { nombre: "id_habitacion", texto: "ID habitacion", tipo: "number", ayuda: "Digite el ID de la habitacion" }, 
      { nombre: "fecha_entrada", texto: "Fecha entrada", tipo: "date", ayuda: "Digite la fecha de entrada" }, 
      { nombre: "fecha_salida", texto: "Fecha salida", tipo: "date", ayuda: "Digite la fecha de salida" }, 
      { nombre: "cantidad_personas", texto: "Cantidad personas", tipo: "number", ayuda: "Digite la cantidad de personas" }, 
      { nombre: "estado", texto: "Estado", tipo: "text", ayuda: "Pendiente, Confirmada, Cancelada o Finalizada" }, 
      { nombre: "total", texto: "Total", tipo: "number", ayuda: "Digite el total" }, 
      { nombre: "usuario", texto: "Usuario", tipo: "text", ayuda: "Digite el usuario" } 
    ]
  },
  { // Inicio del modulo Pagos
    nombre: "Pagos", 
    endpoint: "/Api/hotelApi/pago/pago.php", 
    columnas: ["id", "id_reservacion", "monto", "metodo", "detalle", "estado", "fecha_pago", "usuario", "activo"], 
    campos: [ 
      { nombre: "id_reservacion", texto: "ID reservacion", tipo: "number", ayuda: "Digite el ID de la reservacion" }, 
      { nombre: "monto", texto: "Monto", tipo: "number", ayuda: "Digite el monto" },
      { nombre: "metodo", texto: "Metodo", tipo: "text", ayuda: "Efectivo, Tarjeta o Transferencia" }, 
      { nombre: "detalle", texto: "Detalle", tipo: "text", ayuda: "Digite el detalle del pago" }, 
      { nombre: "estado", texto: "Estado", tipo: "text", ayuda: "Pendiente, Pagado o Rechazado" },
      { nombre: "fecha_pago", texto: "Fecha de pago", tipo: "datetime-local", ayuda: "Digite la fecha de pago" },
      { nombre: "usuario", texto: "Usuario", tipo: "text", ayuda: "Digite el usuario" } 
    ]
  }
];
