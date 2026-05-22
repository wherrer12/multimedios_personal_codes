class JugadorDAO {

    constructor () {
        this.arregloDatos = [];
    }

    insertar (params) {
         this.arregloDatos.push(params);
    }

    actualizar (id, params) {
        let objetoJugador = this.consultarId(id);

        if(objetoJugador){
            objetoJugador.nombre = params.nombre;
            objetoJugador.edad = params.edad;
            objetoJugador.nacionalidad = params.nacionalidad;
        }
    }

    eliminar (id) {
         let objetoJugador = consultarId(id);

        if(objetoJugador){
            
             this.arregloDatos = this.arregloDatos.filter(p => p.id !== id); //Sin un elemenento
        }
    }

    consultar (params) {
        return this.arregloDatos;
    }

    consultarId (id) {
       return this.arregloDatos.find(p => p.id === id);
    }

}

export default JugadorDAO;