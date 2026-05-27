class Jugador{

    constructor(nombre, edad, nacionalidad){
        this._nombre = nombre;
        this._edad = edad;
        this._nacionalidad = nacionalidad;
    }

    get nombre(){
        return this._nombre;
    }

    get edad(){
        return this._edad;
    }

    get nacionalidad(){
        return this._nacionalidad;
    }

    set nombre(nombre){
        this._nombre = nombre;
    }

    set edad(edad){
        this._edad = edad;
    }

    set nacionalidad(nacionalidad){
        this._nacionalidad = nacionalidad;
    }

}

export default Jugador;
