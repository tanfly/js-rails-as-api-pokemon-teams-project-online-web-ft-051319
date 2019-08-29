const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")
const error = document.getElementById("modal")
error.style.visibility = "hidden"



fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(json => createCard(json))

    


function createCard(json) {
    Object.keys(json).forEach(function(key) {
        const trainerObjs = json[key];
        trainerObjs.forEach(trainer =>{
            let div = document.createElement("div")
            div.innerHTML+=`
            <div class="card" data-id="${trainer.id}">
            <p>
            ${trainer.attributes.name}
            </p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>
            </ul>
            </div>`
            let addButton = div.querySelector("button")
            addButton.addEventListener("click", addPokemon)
            main.appendChild(div)

            const trainerPokemon = trainer.attributes.pokemons
            trainerPokemon.forEach(renderPokemon)

        function renderPokemon(trainerPokemon){
            
            let releaseButton = document.createElement("button")
                releaseButton.classList.add("release")
                releaseButton.dataset.pokemonId = `${trainerPokemon.id}`
                releaseButton.innerText = `Release ${trainerPokemon.nickname}`
                releaseButton.addEventListener("click", releasePokemon)

            let li = document.createElement("li")
                li.innerText = `${trainerPokemon.nickname} (${trainerPokemon.species})`
                li.appendChild(releaseButton)

            let pokeList = div.querySelector("ul")
                pokeList.appendChild(li)

        }

        function addPokemon(e){
            let data = {
                 trainer_id: e.target.dataset.trainerId
                }

            fetch (POKEMONS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(newPokemonObj => {
                if (newPokemonObj["message"]){
                    error.style.visibility = "visible";
                    error.innerText += `
                        ${newPokemonObj["message"]}
                        `
                        ;
                        setTimeout(function(){
                          error.style.visibility = "hidden"}, 4000);                
                }
                else
                {
                    let newPokemon = {
                        id: `${(newPokemonObj["data"]).id}`,
                        nickname: `${(newPokemonObj["data"]["attributes"]).nickname}`,
                        species: `${(newPokemonObj["data"]["attributes"]).species}`,
                    }
                    renderPokemon(newPokemon)
                }
            })
        }

        function releasePokemon(e){
          if (e.target.dataset.pokemonId !== undefined){
              e.target.parentElement.remove()
              fetch(POKEMONS_URL + '/' + e.target.dataset.pokemonId, {method: 'DELETE'})
          }
        }
        
    })
        
    })

}
