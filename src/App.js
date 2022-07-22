import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { enterNewGameMode } from './reduxxx/game/actions';
import clsx from 'clsx';

import AppStyles from './App.module.css';
import Player from './Player';
import axios from 'axios';
import Dice from './Dice';
import { attack, gameStatuses, changePokemon } from './gameLogic';
import EndGameModal from './modals/EndGame';

function App() {
  const dispatch = useDispatch();
  // useSelector:
  const { player1, player2, currentGame } = useSelector((state) => {
    return {
      player1: state.game.player1,
      player2: state.game.player2,
      currentGame: state.game.currentGame,
    };
  });

  // all useStates:
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [player1Health, setPlayer1Health] = useState(100);
  const [player2Health, setPlayer2Health] = useState(100);
  const [player1Damage, setPlayer1Damage] = useState('?');
  const [player2Damage, setPlayer2Damage] = useState('?');
  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(true);

  const [gameStatus, setGameStatus] = useState(gameStatuses.ongoing);

  // all useEffects:
  useEffect(() => {
    dispatch(enterNewGameMode({ for: 1, data: response.data }));
    for (let i = 0; i < 2; i++) {
      const id = Math.floor(Math.random() * 150 + 1);
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((response) => {
        if (i === 0) {
          dispatch(setPokemon({ for: 1, data: response.data }));
        } else {
          dispatch(setPokemon({ for: 2, data: response.data }));
        }
      });
    }
  }, []);

  console.log('player1 is:', player1);
  console.log('player2 is:', player2);
  if (!player1.pokemon || !player2.pokemon) return null;

  // all functions:
  const onAttack = (e) => {
    if (gameStatus === gameStatuses.ongoing) {
      const result = attack();
      const newHealth1 = player1Health - result.dmgPlayer2 * 4;
      const newHealth2 = player2Health - result.dmgPlayer1 * 4;
      setPlayer1Damage(result.dmgPlayer1);
      setPlayer2Damage(result.dmgPlayer2);
      setPlayer1Health(newHealth1);
      setPlayer2Health(newHealth2);
      console.log('result is:', result);
      if (newHealth1 <= 0 && newHealth2 <= 0) {
        setGameStatus(gameStatuses.tie);
        console.log(gameStatuses.tie);
      }
      if (newHealth1 <= 0) {
        setGameStatus(gameStatuses.youlose);
        console.log(gameStatuses.youlose);
      }
      if (newHealth2 <= 0) {
        setGameStatus(gameStatuses.youwin);
        console.log(gameStatuses.youwin);
      }
    }
  };

  return (
    <div className={clsx(AppStyles.mainWindow, AppStyles.flexColumnTopCenter)}>
      {isEndGameModalOpen && (
        <EndGameModal
          gameStats={null}
          setIsEndGameModalOpen={setIsEndGameModalOpen}
        />
      )}
      <div className={AppStyles.gameTitle}>Pokemon Battle Simulator</div>
      <div className={AppStyles.gameZone}>
        <Player who={'you'} curHealth={player1Health} pokemon={pokemon1} />
        <div
          className={clsx(AppStyles.overview, AppStyles.flexColumnTopCenter)}
        >
          <div className={AppStyles.dicesWrapper}>
            <Dice value={player1Damage} />
            <Dice value={player2Damage} />
          </div>
          <div className={AppStyles.roundResults}>
            {!!player1Damage && (
              <div className={AppStyles.playerResults}>
                You hit for {player1Damage}
              </div>
            )}
            {!!player2Damage && (
              <div className={AppStyles.playerResults}>
                Your opponent hit for {player2Damage}
              </div>
            )}
          </div>
          <button className={AppStyles.btnAttack} onClick={onAttack}>
            Attack!
          </button>
        </div>
        <Player who={'opponent'} curHealth={player2Health} pokemon={pokemon2} />
      </div>
    </div>
  );
}

export default App;
