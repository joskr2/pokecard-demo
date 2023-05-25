console.log( "Prueba!!" );



console.log( variable );



{

  let variable2 = "Hola mundo 2";
  var variable = "Hola mundo";
}

console.log( variable );

{
  const NOMBRE = "Jhon Doe"
}

//console.log(NOMBRE)

{
  function MiFuncion() {
    console.log( "Hola mundo" );
  }
}


MiFuncion();

let expresion = function () {
  console.log( "Hola mundo2" );
}


let expresion2 = () => {
  console.log( "Hola mundo3" );
}


let expresion4 = ( valor ) => {
  console.log( valor );
}

expresion4( "Hola mundo4" );


let arrayDeNumeros = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

let arrayDeNumeros2 = arrayDeNumeros.map( function ( valor ) {
  return valor * 2;
} )


let objeto = {
  nombre: "Jhon Doe",
  edad: 30,
  saludar: function () {
    console.log( "Hola mundo" );
  }
}


console.log( objeto.nombre );

class Persona {
  constructor( nombre, edad ) {
    this.nombre = nombre;
    this.edad = edad;
  }

  despedirse() {
    console.log( "Adios mundo" );
  }
  saludo() {
    console.log( "Hola soy la clase persona" );
  }
}


let johnDoe = new Persona( "Jhon Doe", 30 );



class Estudiante extends Persona {
  constructor( nombre, edad, curso ) {
    super( nombre, edad );
    this.curso = curso;
  }

  saludo() {
    console.log( "Soy un estudiante" );
  }

}


class EstudianteUniversitario extends Estudiante {
  constructor( nombre, edad, curso, carrera ) {
    super( nombre, edad, curso );
    this.carrera = carrera;
  }

  saludo( bool = false ) {
    if ( bool ) {
      console.log( "saludo booleano -> si" );
    } else {
      console.log( "saludo booleano -> no" );
    }
  }
}

class EstudianteInstituto extends Estudiante {
  constructor( nombre, edad, curso, especialidad ) {
    super( nombre, edad, curso );
    this.especialidad = especialidad;
  }

  saludo( veces ) {
    for ( let i = 0; i < veces; i++ ) {
      console.log( "saludo n veces" );
    }
  }
}

class EstudianteBachillerato extends Estudiante {
  constructor( nombre, edad, curso, especialidad ) {
    super( nombre, edad, curso );
    this.especialidad = especialidad;
  }

  saludo( frase ) {
    console.log( "saludo parametro frase" );
    console.log( frase );
  }

}


let estudiante = new Estudiante( "Jhon Doe", 30, "Javascript" );
let estudianteUniversitario = new EstudianteUniversitario( "Jhon Doe", 30, "Javascript", "Ingenieria" );
let estudianteInstituto = new EstudianteInstituto( "Jhon Doe", 30, "Javascript", "Programacion" );
let estudianteBachillerato = new EstudianteBachillerato( "Jhon Doe", 30, "Javascript", "Programacion" );

estudiante.saludo();
estudianteUniversitario.saludo( true );
estudianteInstituto.saludo( 5 );
estudianteBachillerato.saludo( "Hola mundo" );



let str = "Hola mundo";

// promesas

let promesa = new Promise( ( resolve, reject ) => {

  setTimeout( () => {

    if ( str === "Hola mundo" ) {
      resolve( "Hola mundo desde la promesa" );
    }
    else {
      reject( "Error en la promesa" )
    }

  }, 2000 );

} );


promesa.then( ( valor ) => {
  console.log( valor );
} ).catch( ( error ) => {
  console.log( error );
} )


let myData = null

fetch( 'https://jsonplaceholder.typicode.com/todos/1' )
  .then( response => console.log( response ) )
  .then( json => myData = json )
  .catch( error => console.log( error ) )


let button = document.querySelector( 'button' );
let parrafo = document.querySelector( 'p' );


button.addEventListener( 'click', () => {
  console.log( "click, en el boton!!!" );
  parrafo.innerHTML = `myData: ${myData.title}`;
} );