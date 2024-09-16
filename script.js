const nomePkm = document.getElementById('nomePkm');
const imagemPkm = document.getElementById('imagemPkm');
const idPkm = document.getElementById('idPkm');
const tipoPkm = document.getElementById('tipoPkm');
const inputPkm = document.getElementById('inputPkm');
const botaoBusca = document.getElementById('botaoBusca');
const botaoVolta = document.getElementById('botaoVolta');
const botaoProx = document.getElementById('botaoProx');
const boxPkm = document.getElementById('boxPkm');
const detalhesExtras = document.getElementById('detalhesExtras');

let idAtual = 1;

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            updateUI(data);
            idAtual = data.id;
        })
        .catch(error => {
            console.log('Erro em mostrar o pokemon:', error);
            alert('Pokemon não encontrado!');
        });
}

function geracaoPkm(id) {
    if (id >= 1 && id <= 151) return 'Geração I';
    if (id >= 152 && id <= 251) return 'Geração II';
    if (id >= 252 && id <= 386) return 'Geração III';
    if (id >= 387 && id <= 493) return 'Geração IV';
    if (id >= 494 && id <= 649) return 'Geração V';
    if (id >= 650 && id <= 721) return 'Geração VI';
    if (id >= 722 && id <= 809) return 'Geração VII';
    if (id >= 810 && id <= 898) return 'Geração VIII';
    return 'Desconhecida';
}

function updateUI(pokemon) {
    nomePkm.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase();
    imagemPkm.src = pokemon.sprites.front_default;
    idPkm.textContent = pokemon.id;
    tipoPkm.textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');

    const primaryType = pokemon.types[0].type.name;
    boxPkm.setAttribute('data-type', primaryType);

    // Adiciona a geração do Pokémon na boxPkm
    boxPkm.innerHTML = `
        <p><strong>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase()}</strong></p>
        <img id="imagemPkm" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>ID:</strong> ${pokemon.id}</p>
        <p><strong>Tipo:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <p><strong>Geração:</strong> ${geracaoPkm(pokemon.id)}</p>`;

    // Animação de exibição de detalhes
    boxPkm.onclick = () => {
        if (detalhesExtras.style.display === 'block') {
            detalhesExtras.style.display = 'none';
        } else {
            detalhesExtras.style.display = 'block';
            detalhesExtras.setAttribute('data-type', primaryType);
            detalhesExtras.innerHTML = `
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Habilidades:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>`;
            boxPkm.style.transform = 'translateY(-10px)'; // Aplica o efeito hover permanentemente quando os detalhes são exibidos
        }
    };
}

document.addEventListener('click', (event) => {
    if (!boxPkm.contains(event.target) && !detalhesExtras.contains(event.target)) {
        detalhesExtras.style.display = 'none';
        boxPkm.style.transform = 'translateY(0)'; // Volta a posição original quando clica fora
    }
});

botaoProx.addEventListener('click', () => {
    idAtual++;
    fetchPokemon(idAtual);
});

botaoVolta.addEventListener('click', () => {
    if (idAtual > 1) {
        idAtual--;
        fetchPokemon(idAtual);
    }
});

inputPkm.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        botaoBusca.click();
    }
});

botaoBusca.addEventListener('click', () => {
    const input = inputPkm.value.trim().toLowerCase();
    if (input) {
        fetchPokemon(input);
    }
});

fetchPokemon(idAtual); // Busca o primeiro Pokémon ao carregar a página