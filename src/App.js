import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

// redux actions:
import { enterNewGameMode } from './reduxxx/game/actions';

// components:
import Player from './Player';
import CommandBox from './CommandBox';
import EndGameModal from './modals/EndGame';
import Spinner from './Spinner';
import LoadingFailed from './LoadingFailed';

// utils:
import AppStyles from './App.module.css';
import gameConfig from './game.config';
const { healthOfPlayer1, healthOfPlayer2 } = gameConfig;

function App() {
  const dispatch = useDispatch();
  // useSelector:
  const {
    player1,
    player2,
    curGame: { isAttacking },
    isLoading,
    isLoadingFailed,
    isEndGameModalOpen,
  } = useSelector((state) => {
    return {
      player1: state.game.player1,
      player2: state.game.player2,
      curGame: state.game.curGame,
      isLoading: state.game.isLoading,
      isLoadingFailed: state.game.isLoadingFailed,
      isEndGameModalOpen: state.modals.endgame,
    };
  });

  // all useEffects:
  useEffect(() => {
    dispatch(enterNewGameMode());
  }, [dispatch]);

  // --------------------- render GUI ---------------------------
  return (
    <div className={clsx(AppStyles.mainWindow, AppStyles.flexColumnTopCenter)}>
      {isEndGameModalOpen && <EndGameModal />}
      {isLoading ? (
        <div className={clsx(AppStyles.spinnerWrapper, AppStyles.flexCenter)}>
          <Spinner />
        </div>
      ) : isLoadingFailed ? (
        <LoadingFailed />
      ) : (
        <>
          <div className={AppStyles.gameTitle}>Pokemon Battle Simulator</div>
          <div className={AppStyles.gameZone}>
            <Player
              who={'you'}
              curHealth={player1.health}
              maxHealth={healthOfPlayer1}
              pokemon={player1.pokemon}
              gotHit={isAttacking}
            />
            <CommandBox />
            <Player
              who={'opponent'}
              curHealth={player2.health}
              maxHealth={healthOfPlayer2}
              pokemon={player2.pokemon}
              gotHit={isAttacking}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
