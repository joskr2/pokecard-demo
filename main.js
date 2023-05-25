
let Card = ( { nombre, imagen, descripcion } ) => {
  return `
  <a href="#" class="group block m-auto mt-3 bg-neutral-200 rounded-md m-2">
  <img src=${imagen} alt="" class="h-[250px] object-cover sm:h-[300px]" />

  <div class="mt-3 flex justify-between text-sm">
    <div>
      <h3 class="text-gray-900 group-hover:underline group-hover:underline-offset-4" id="nombre">
       ${nombre}
      </h3>
      <p id="descripcion" class="mt-1.5 max-w-[45ch] text-xs text-gray-500">
        ${descripcion}
      </p>
    </div>    
  </div>
</a>
    `;
}


const URL_ALL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon?limit=1500&offset=200';


fetch( URL_ALL_POKEMONS ).then( ( response, reject ) => {
  if ( response.status == 200 ) {
    console.log(response, "1")
    return response.json();
  } else {
    reject( 'Error al obtener los datos' );
  }
} ).then( ( data ) => {

  console.log(data, "2")
  data.results.map( pokemon => {
    fetch( pokemon.url ).then( ( response, reject ) => {
      console.log(response, "3")
      if ( response.status == 200 ) {
        return response.json();
      } else {
        reject( 'Error al obtener los datos' );
      }
    } ).then( ( data ) => {
      console.log(data, "4")
      let card = Card( {
        nombre: data.name,
        imagen: data.sprites.front_default,
        descripcion: data.abilities[ 0 ].ability.name
      } );
      document.querySelector( '#cards' ).innerHTML += card;
    } )
  } );
} )