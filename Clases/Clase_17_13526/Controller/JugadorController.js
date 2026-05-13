import JugadorDAO from "../DAO/JugadorDAO.js";
//import Jugador from "../Models/Jugador.js";

 let dao = new JugadorDAO();

dao.insertar("Jugador 1", 20, "Costarricense");

console.log("OK");