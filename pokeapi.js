const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const baseUrl2 = `https://pokeapi.co/api/v2/pokemon-species/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);
buttonPokemon.addEventListener('touchstart' , insertPokemon); //*For mobile devices

buttonClear.addEventListener('click' , deletePokemons);
buttonClear.addEventListener('touchstart' , deletePokemons); //* For mobile devices

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
    
    console.table(result); //! only for development

    //* Información de en frente

    //*Crear imagen
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default; //*Image of pokemon

    //*Nombre de pokemon e ID
    const pokemonName = document.createElement('h2');
    pokemonName.innerText = `Name: ${result[10][1]} - ID: ${result[6][1]}`; //* Name of pokemon with ID

    //*Tipo de pokemon
    const pokemonType = document.createElement('h2');
    pokemonType.innerText = `Type: ${result[16][1][0].type.name}`; //*Type of pokemon

    //* Pokemon Altura
    const height = document.createElement('p');
    height.innerText = `Height: ${result[4][1]}`; 
    height.classList.add('pokemonStats');

    //* Pokemon Peso
    const weight = document.createElement('p');
    weight.innerText = `Weight: ${result[17][1]}`; 
    weight.classList.add('pokemonStats');

    //* Pokemon Description
    const flavor_text = document.createElement('p');
    flavor_text.innerText = `Description: ${result[24][1][26].flavor_text}`;
    flavor_text.classList.add('pokemonStats');

    //* Categoria
    const genera = document.createElement('p');
    genera.innerText = `Categoria: ${result[28][1][5].genus}`; //* Pokemon special attack
    genera.classList.add('pokemonStats');

    //* Contenerdor de stats
    const stats = document.createElement('div');
    stats.append(height, weight, flavor_text, genera);
    stats.classList.add('pokemonStatsContainer');

    //*Crear contenedor
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonName ,pokemonType, stats);
    container.classList.add('container');

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
}

  