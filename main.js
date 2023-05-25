

// const handleClick = () => {
//   console.log( 'click' );

// }


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

async function getPokemonData() {
  try {
    const response = await fetch(URL_ALL_POKEMONS);
    console.log(response, "1");

    if (response.status !== 200) {
      throw new Error('Error al obtener los datos');
    }

    const data = await response.json();
    console.log(data, "2");

    for (const pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);
      console.log(pokemonResponse, "3");

      if (pokemonResponse.status !== 200) {
        throw new Error('Error al obtener los datos');
      }

      const pokemonData = await pokemonResponse.json();
      console.log(pokemonData, "4");

      const card = Card({
        nombre: pokemonData.name,
        imagen: pokemonData.sprites.front_default,
        descripcion: pokemonData.abilities[0].ability.name
      });

      document.querySelector('#cards').innerHTML += card;
    }

  } catch (error) {
    console.error(error);
  }
}

getPokemonData();
