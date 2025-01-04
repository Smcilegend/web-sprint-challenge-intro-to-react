import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";

const App = () => {
  const [characterList, setCharacterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peopleResponse, planetsResponse] = await Promise.all([
          fetch('http://localhost:9009/api/people').then((res) => {
            if (!res.ok) throw new Error('Failed to fetch characters.');
            return res.json();
          }),
          fetch('http://localhost:9009/api/planets').then((res) => {
            if (!res.ok) throw new Error('Failed to fetch planets.');
            return res.json();
          }),
        ]);


        const planetDataMap = planetsResponse.reduce((acc, planet) => {
          acc[planet.id] = planet.name;
          return acc;
        }, {});

        const charactersWithPlanets = peopleResponse.map((character) => ({
          ...character,
          homeworld: {
            id: character.homeworld,
            name: planetDataMap[character.homeworld]
          }
        }));

        setCharacterList(charactersWithPlanets);
        setIsLoading(false);
      } catch (err) {
        setFetchError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <h1>Loading Characters...</h1>;
  }

  if (fetchError) {
    return <h1>{fetchError}</h1>;
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <div className="character-list">
        {characterList.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
};

if (typeof module !== 'undefined' && module.exports) module.exports = App
