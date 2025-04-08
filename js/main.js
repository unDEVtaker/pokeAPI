const listaPokemon = document.querySelector('#listaPokemon');
let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 151; i++){
    fetch(URL + i)

    .then((response) =>response.json())
    .
}
