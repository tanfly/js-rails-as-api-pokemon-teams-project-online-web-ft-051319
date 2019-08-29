class PokemonsController < ApplicationController

def index
    pokemons = Pokemon.all
    render json: PokemonSerializer.new(pokemons)
end

def show
    pokemon = Pokemon.find(params[:id])
    render json: PokemonSerializer.new(pokemon)
end

def create
    trainer = Trainer.find(params[:trainer_id])
    if trainer
        if (trainer.pokemons.count < 6)
            pokemon = trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id)
            render json: PokemonSerializer.new(pokemon)
        else 
            render json: {:message => "A trainer can have a maximum of six Pokemon at one time."}
        end
    else 
        render json: {:message => "Trainer not found"}
    end
end

def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.delete
end

    




end
