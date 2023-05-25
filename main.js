let Card = ( { nombre, imagen, descripcion } ) => {
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

const URL_ALL_POKEMONS = 'https://pokeapi.co/api/v2/pokemon?limit=10';

async function getPokemonData() {
  try {
    const response = await fetch(URL_ALL_POKEMONS);

    if (response.status !== 200) {
      throw new Error('Error al obtener los datos');
    }

    const data = await response.json();
    for (const pokemon of data.results) {
      const pokemonResponse = await fetch(pokemon.url);

      if (pokemonResponse.status !== 200) {
        throw new Error('Error al obtener los datos del pokémon');
      }

      const pokemonData = await pokemonResponse.json();
      let cardData = {
        nombre: pokemonData.name,
        imagen: pokemonData.sprites.front_default,
        descripcion: pokemonData.types.map(typeInfo => typeInfo.type.name).join(", ")
      };

      document.getElementById('cards').innerHTML += Card(cardData);
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}

getPokemonData();

function showModal(name, image, description) {
  document.getElementById('modal-image').src = image; // Agregar imagen al modal
  document.getElementById('modal-title').textContent = name;
  document.getElementById('modal-description').textContent = description;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('close').addEventListener('click', function() {
    document.getElementById('modal').classList.add('hidden');
  });
}
