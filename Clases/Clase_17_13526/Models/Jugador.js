class Jugador{

    constructor(nombre, edad, nacionalidad){
        this.nombre = nombre;
        this.edad = edad;
        this.nacionalidad = nacionalidad;
    }

    get nombre(){
        return this.nombre;
    }

    get edad(){
        return this.edad;
    }

    get nacionalidad(){
        return this.nacionalidad;
    }

    set nombre(nombre){
        this.nombre = nombre;
    }

    set edad(edad){
        this.edad = edad;
    }

    set nacionalidad(nacionalidad){
        this.nacionalidad = nacionalidad;
    }

}

export default Jugador;
