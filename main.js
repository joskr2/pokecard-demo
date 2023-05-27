// Define la función Card para crear el HTML de una tarjeta de Pokémon
let Card = ( { nombre, imagen, descripcion } ) => {
  // Devuelve una cadena de texto que representa un bloque de HTML con la información del Pokémon
  return `
  <div class="group m-1 cursor-pointer transform transition duration-500 ease-in-out hover:scale-105" onclick="showModal('${nombre}', '${imagen}', '${descripcion}')">
    <div class="w-64 h-64 bg-white rounded-lg shadow-md m-auto">
      <img src=${imagen} alt="" class="w-full h-2/3 rounded-t-lg" />
      <div class="p-4">
        <h3 class="text-gray-900 group-hover:underline group-hover:underline-offset-4 text-center">
         ${nombre}
        </h3>
        <p class="mt-2 text-xs text-gray-500 text-center">
          ${descripcion}
        </p>
      </div>
    </div>
  </div>
    `;
}

// URL de la API de Pokémon que queremos utilizar
const URL_ALL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon?limit=10';

// Función asíncrona para obtener los datos de los Pokémon de la API
const getPokemonData = async () => {
  try {
    // Haz una solicitud a la API
    const response = await fetch( URL_ALL_POKEMONS );
    console.log( response , "primera respuesta , cuando consultamos el API , para todos los pokemones, esto de tipo RESPONSE");
    /*fetch(URL_ALL_POKEMONS).then(response => {
      console.log(response);
    })*/

    // Verifica si el estado de la respuesta es 200 (lo que indica éxito), si no, lanza un error
    if ( response.status !== 200 ) {
      //console.info("error en la consulta");
      throw new Error( 'Error al obtener los datos' );
    }

    // Convierte la respuesta a formato JSON
    const data = await response.json();

    console.log(data,"esta la respuesta convertida a json , es un array de objetos , cuyo contenido es un nombre y una url por cada elemento")
    // Itera sobre la lista de resultados de la respuesta

    // este es un for-of , que nos sirve para recorrer objetos
    
    console.log(data.results, "esta es todo el array de objetos , que contiene nombres y urls(para hacer una consulta al API , individual de cada pokemon)")
    for ( const pokemon of data.results ) {
      // recorrere data.results , data es un objeto , y este objeto tiene una propiedad llamda results 
      // Haz una nueva solicitud para cada Pokémon individual para obtener más detalles

      // si queremos saber la data de aca pokemon , tenemos que volver a hacer la consulta , con la url de cada elemento(pokemon)
      const pokemonResponse = await fetch( pokemon.url );

      // Verifica si el estado de la respuesta es 200 (lo que indica éxito), si no, lanza un error
      if ( pokemonResponse.status !== 200 ) {
        throw new Error( 'Error al obtener los datos del pokémon' );
      }

      // Convierte la respuesta a formato JSON
      const pokemonData = await pokemonResponse.json();
      // convierto mi resultado a json para trabajarlo , previamente es de tipo Respuesta
      // Crea los datos de la tarjeta para el Pokémon
      let cardData = {
        nombre: pokemonData.name,
        imagen: pokemonData.sprites.front_default,
        descripcion: pokemonData.types.map( typeInfo => typeInfo.type.name ).join( ", " )
      };
      // aca estoy construyendo un objeto con la informacion que obtuve de consutar cada url para cada pokemon (estoy dentro de un for-of)

      // Añade la tarjeta de Pokémon al elemento HTML con el id 'cards'
      document.getElementById( 'cards' ).innerHTML += Card( cardData );
      // al final solo encadeno , toda la cadena de texto de la tarjeta de los pokemons
    }
  } catch ( error ) {
    // Si hay un error, escríbelo en la consola
    console.info( "error en la consulta, en el catch" );
    console.error( 'Error: ', error );
  }
}

// Llama a la función getPokemonData para ejecutarla
getPokemonData();

// Define la función showModal para mostrar un modal con detalles de un Pokémon

const showModal = ( name, image, description ) => {
  // Actualiza el contenido del modal con la imagen, el nombre y la descripción del Pokémon
  document.getElementById( 'modal-image' ).src = image;
  document.getElementById( 'modal-title' ).textContent = name;
  document.getElementById( 'modal-description' ).textContent = description;
  // Elimina la clase 'hidden' del modal para mostrarlo
  document.getElementById( 'modal' ).classList.remove( 'hidden' );

  // Añade un controlador de eventos al botón de cierre del modal
  document.getElementById( 'close' ).addEventListener( 'click', function () {
    // Añade la clase 'hidden' al modal cuando se hace clic en el botón, ocultando el modal
    document.getElementById( 'modal' ).classList.add( 'hidden' );
  } );
}
