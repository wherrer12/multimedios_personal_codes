import Curso from "../Models/Curso.js";

const URLAPI = "https://paginas-web-cr.com/Api/apis/";

const insertar = "InsertarCursos.php";
const modificar = "ActualizarCursos.php";
const eliminar = "BorrarCursos.php";
const consultar = "ListaCurso.php";

document.addEventListener("DOMContentLoaded", () => {
    consultarDatos();

document.getElementById("formularioCrear").addEventListener(
    'submit', (evento) => {
        evento.preventDefault();
        insertarCurso();
    });
});

function consultarDatos() {
    const urlConsultar = URLAPI + consultar;

    //alert(urlConsultar);

    fetch(urlConsultar, 
        {
            method: "POST"
        })
    .then(response => response.json())
    .then(data => mapeandoTabla(data.data))
    .catch(error => console.error(error));

}

function mapeandoTabla(datos) {
    const tablaDatos = document.getElementById("tablaDatos");
    tablaDatos.innerHTML = "";
    console.log(datos);
    datos.forEach(element => {
        console.log(element.id)
        tablaDatos.innerHTML += `<tr class = ""> 
            <td scope="row">${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.usuario}</td>
            <td>
                <a 
                    name=""
                    id=""
                    class="btn btn-success"
                    onclick="cargarEditar(${element.id})"
                    role="button"
                    >Editar</a
                >
                <a 
                    name=""
                    id=""
                    class="btn btn-danger"
                    onclick="eliminarCurso(${element.id})"
                    role="button"
                    >Eliminar</a
                >
            </td>
        </tr>`;
    });
    
}

function insertarCurso() {

    const urlInsertar = URLAPI + insertar;

    //Capturar los datos del formulario
    const id = 0;
    const nombre = document.getElementById("nombre").value; 
    const descripcion = document.getElementById("descripcion").value;
    const tiempo = document.getElementById("tiempo").value;
    const usuario = "Prof. Mario";
  
    // crear un objeto para pasarlo
    let objetoCurso = new Curso(id, nombre, descripcion, tiempo, usuario);

    console.log(objetoCurso);

    const curso = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        tiempo: tiempo,
        usuario: usuario
    };

    alert("Creando curso");

    fetch(urlInsertar, 
        {
            method: "POST",
            /*headers: {
                "Content-Type": "application/json"
            },*/
            body: JSON.stringify(curso)
        })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Curso creado con éxito");
        consultarDatos();
        //document.getElementById("formularioCrear").reset();

//.then(data => consultarDatos());

    })
    .catch(error => console.error(error));
   
}

function eliminarCurso(id) {
    alert("Eliminando curso");

    const urlEliminar = URLAPI + eliminar;
    const datos = {id: id};

    fetch(urlEliminar,
        {
            method: "POST",
            body: JSON.stringify(datos)
        })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Curso eliminado con éxito");
        consultarDatos();
    })
    .catch(error => console.error(error));

    /*let datos = {
        "nombre": "Curso de JavaScript",
        "descripcion": "Aprende JavaScript desde cero",
        "tiempo": "4 semanas",
        "usuario": "Prof. Mario"
    };

    fetch(urlConsultar,{
        method: "POST",
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert("Curso eliminado con éxito");
        consultarDatos();
    })
    .catch(error => console.error(error)); */
}

window.eliminarCurso = eliminarCurso;

function editarCurso() {
    alert("Editando curso");
}