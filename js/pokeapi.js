const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const baseUrl2 = `https://pokeapi.co/api/v2/pokemon-species/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const buttonHistory = document.getElementById('boton-cargar');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);
buttonPokemon.addEventListener('touchstart' , insertPokemon); //*For mobile devices

document.getElementById('pokemonName').addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("searchPokemon").click();
  }
});

buttonClear.addEventListener('click' , deletePokemons);
buttonClear.addEventListener('touchstart' , deletePokemons); //* For mobile devices

buttonHistory.addEventListener('click' , cargar);

async function insertPokemon() {
  try {
    const res = await fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`)
    const res2 = await fetch(`${baseUrl2}${pokemon.value.toLocaleLowerCase()}`)
    const pokemonDataJSON = await res.json()
    const pokemonDataJSON2 = await res2.json()

    const allItems = [];
    const result = []; //*Guardaremos la respuesta en el array

    for (let pokemonInfo in pokemonDataJSON) { //*Convertimos el objeto JSON a array
      result.push([pokemonInfo , pokemonDataJSON[pokemonInfo]]);
    }
    for (let pokemonInfo2 in pokemonDataJSON2) { //*Convertimos el objeto JSON a array
      result.push([pokemonInfo2 , pokemonDataJSON2[pokemonInfo2]]);
    }
    
    // console.table(result); //! Solo para mi

    //* Información de en frente

    //*Crear imagen
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default; //*Imagen del pokemon

    //*Nombre de pokemon e ID
    const pokemonName = document.createElement('h2');
    pokemonName.innerText = `Nombre: ${result[10][1]} - ID: ${result[6][1]}`; //* Nombre o ID

    //*Tipo de pokemon
    const pokemonType = document.createElement('h2');
    pokemonType.innerText = `Tipo: ${result[16][1][0].type.name}`; //*Tipo de pokemon

    //* Pokemon Altura
    const height = document.createElement('p');
    height.innerText = `Altura: ${result[4][1]}`; 
    height.classList.add('pokemonStats');

    //* Pokemon Peso
    const weight = document.createElement('p');
    weight.innerText = `Peso: ${result[17][1]}`; 
    weight.classList.add('pokemonStats');

    //* Pokemon Description
    const flavor_text = document.createElement('p');
    flavor_text.innerText = `Descripción: ${result[24][1][26].flavor_text}`;
    flavor_text.classList.add('pokemonStats');

    //* Categoria
    const genera = document.createElement('p');
    genera.innerText = `Categoria: ${result[28][1][5].genus}`;
    genera.classList.add('pokemonStats');

    //* Contenerdor de stats
    const stats = document.createElement('div');
    stats.append(flavor_text, genera, height, weight);
    stats.classList.add('pokemonStatsContainer');

    //*Crear contenedor
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonName ,pokemonType, stats);
    container.classList.add('container');

    let nom = document.getElementById("pokemonName").value; 
    localStorage.setItem('historyName', JSON.stringify(nom));
    let nombre = localStorage.getItem('historyName');
    console.log(nombre); //! Solo para mi

    allItems.push(container);

    appNode.append(...allItems);

  } catch (error) {
    alert("Este pokemon no existe. Intenta con otro!");
  }
}

function deletePokemons() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
  document.getElementById("pokemonName").value = "";
}

function cargar(){                        
      /*Obtener datos almacenados*/
      let nombre = localStorage.getItem('historyName');
      /*Mostrar datos almacenados*/      
      document.getElementById("nombre").innerText = nombre;
};   

let historyName = [1]; 

// localStorage.getItem() devuelve null si la clave no existe
let datos_existentes = localStorage.getItem('transito');
datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);

datos_existentes.push(datosDeCadaEquipoRecuperado);
// o
// datos_existentes.push({tiempo: new Date().getTime(), datos: datosDeCadaEquipoRecuperado});

localStorage.setItem('transito', JSON.stringify(datos_existentes));