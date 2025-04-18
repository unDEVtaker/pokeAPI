const listaPokemon = document.querySelector('#listaPokemon');
const botonesHeader = document.querySelectorAll('.btn-header');
let URL = "https://pokeapi.co/api/v2/pokemon/";
let todosLosPokemon = []; // Array para almacenar todos los Pokémon cargados
const cantidadPokemon = 151; // Define la cantidad de Pokémon a cargar

// Función para obtener los datos de un Pokémon por su ID
async function obtenerPokemon(id) {
    const response = await fetch(URL + id);
    const data = await response.json();
    return data;
}

// Función para cargar todos los Pokémon en orden y luego mostrarlos
async function cargarPokemonEnOrden() {
    for (let i = 1; i <= cantidadPokemon; i++) {
        const pokemonData = await obtenerPokemon(i);
        todosLosPokemon.push(pokemonData);
    }
    mostrarListaDePokemon(todosLosPokemon);
}

function mostrarListaDePokemon(lista) {
    listaPokemon.innerHTML = ""; // Limpia la lista antes de mostrar
    lista.forEach(pokemon => mostrarPokemon(pokemon));
}

function mostrarPokemon(data) {
    let tipos = data.types.map(type => `
        <p class="${type.type.name} tipo">${type.type.name}</p>
    `);
    tipo = tipos.join(``);

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${(data.id < 10 ? "0" + data.id : data.id)}</p>
        <div class="pokemon-imagen">
            <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${(data.id < 10 ? "0" + data.id : data.id)}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipo}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${data.height / 10}m</p>
                <p class="stat">${data.weight / 10}kg</p>
            </div>
        </div>
    `;
    listaPokemon.appendChild(div);
}

// Carga los Pokémon en orden al cargar la página
cargarPokemonEnOrden();

botonesHeader.forEach((boton) => {
    boton.addEventListener("click", (event) => {
        const botonId = event.currentTarget.id;
        listaPokemon.innerHTML = "";

        if (botonId === "ver-todos") {
            mostrarListaDePokemon(todosLosPokemon);
        } else {
            const pokemonFiltrados = todosLosPokemon.filter(pokemon =>
                pokemon.types.some(tipo => tipo.type.name === botonId)
            );
            mostrarListaDePokemon(pokemonFiltrados);
        }
    });
});