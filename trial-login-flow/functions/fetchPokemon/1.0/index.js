const fetchPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = response.json();

  return {
    result: `${data.count}`,
  };
};

export default fetchPokemon;
