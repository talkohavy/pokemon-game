import React from 'react';

import MyStyles from './player.module.css';
import HealthBar from '../HealthBar';

export default function Player({
  who = 'opponent',
  pokemonName = 'pikachu',
  pokemon = {},
  curHealth = 100,
  maxHealth = 100,
}) {
  return (
    <div
      className={MyStyles.playerZone}
      style={{ direction: who === 'opponent' ? 'rtl' : 'ltr' }}
    >
      <div className={MyStyles.playerName}>
        {who === 'you' ? 'You - ' : 'Opponent - '}
        {pokemon?.species?.name}
      </div>
      <HealthBar completed={Math.max(0, (curHealth / maxHealth) * 100)} />
      <div className={MyStyles.underHealthBar}>
        <img
          src={pokemon?.sprites?.back_default}
          alt={`player ${who}`}
          className={MyStyles.pokemonImage}
        />
        <span className={MyStyles.healthPoints}>
          {Math.max(0, curHealth)}/{maxHealth}
        </span>
      </div>
    </div>
  );
}
