import React, { useState } from 'react';

const CharacterCard = ({ character }) => {
  const [isPlanetVisible, setPlanetVisible] = useState(false);

  const togglePlanetVisibility = () => {
    setPlanetVisible(!isPlanetVisible);
  };

  return (
    <div className="character-card" onClick={togglePlanetVisibility}>
      <h3 className="character-name">{character.name}</h3>
      {isPlanetVisible && (
        <p className="character-planet">
          <span style={{ color: 'gray' }}>Planet: </span>
          <span style={{ color: 'black' }}>{character.homeworld.name}</span>
        </p>
      )}
    </div>
  );
};

export default CharacterCard;
