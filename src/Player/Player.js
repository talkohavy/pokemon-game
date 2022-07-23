import React from 'react';
import clsx from 'clsx';

import AppStyles from '../App.module.css';
import MyStyles from './player.module.css';
import HealthBar from '../HealthBar';

export default function Player({
  who = 'opponent',
  pokemon = {},
  curHealth = 100,
  maxHealth = 100,
  gotHit = false,
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
          src={
            who === 'opponent'
              ? pokemon?.sprites?.front_default
              : pokemon?.sprites?.back_default
          }
          alt={`player ${who}`}
          className={clsx(MyStyles.pokemonImage, gotHit && AppStyles.hitAnime)}
        />
        <span className={MyStyles.healthPoints}>
          {Math.max(0, curHealth)}/{maxHealth}
        </span>
      </div>
    </div>
  );
}
