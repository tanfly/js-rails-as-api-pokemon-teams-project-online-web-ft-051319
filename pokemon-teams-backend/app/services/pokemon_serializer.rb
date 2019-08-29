class PokemonSerializer

    include FastJsonapi::ObjectSerializer
    attributes :species, :nickname, :trainer
    belongs_to :trainer
    
end