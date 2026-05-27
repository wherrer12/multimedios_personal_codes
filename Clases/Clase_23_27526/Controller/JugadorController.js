import JugadorDAO from "../DAO/JugadorDAO.js";
import Jugador from "../Models/Jugador.js";

let dao = new JugadorDAO();

let player1 = new Jugador("Jugador 1", 25, "Costarricense");
let player2 = new Jugador("Jugador 2", 28, "Mexicana");

dao.insertar(player1);
dao.insertar(player2);

let players = dao.consultar();

players.forEach(player => {
    console.log("Nombre del jugador:", player.nombre);
    console.log("Edad del jugador:", player.edad);
    console.log("Nacionalidad del jugador:", player.nacionalidad);
});

//let player = new Jugador("Jugador 1", 25, "Costarricense");

//dao.insertar(player);

//let players = dao.consultar();

//console.log(players);

//console.log("Nombre del jugador:", player.nombre);
//console.log("Edad del jugador:", player.edad);
//console.log("Nacionalidad del jugador:", player.nacionalidad);

//console.log("Datos del jugador actualizado: ", player);

console.log("OK");