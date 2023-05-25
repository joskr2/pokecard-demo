let imagen = document.querySelector('img');

let titulo = document.querySelector('#nombre');

let parrafo = document.querySelector('#descripcion');


const URL = 'https://pokeapi.co/api/v2/pokemon/1/';

fetch(URL).then((response,reject) => {
    if(response.status == 200){
        return response.json();
    }else{
        reject('Error al obtener los datos');
    }
}).then((data) => {
    imagen.src = data.sprites.front_default;
    titulo.innerHTML = data.name;
    parrafo.innerHTML = data.abilities[0].ability.name;
})