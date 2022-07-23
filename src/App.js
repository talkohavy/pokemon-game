import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

// redux actions:
import { enterNewGameMode, attack } from './reduxxx/game/actions';

// components:
import Player from './Player';
import Dice from './Dice';
import EndGameModal from './modals/EndGame';

// utils:
import { gameStatuses } from './gameLogic';
import AppStyles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  // useSelector:
  const {
    player1,
    player2,
    curGame: { isAttacking, curRound, status: curGameStatus },
    isLoading,
    isEndGameModalOpen,
  } = useSelector((state) => {
    return {
      player1: state.game.player1,
      player2: state.game.player2,
      curGame: state.game.curGame,
      isLoading: state.game.isLoading,
      isEndGameModalOpen: state.modals.endgame,
    };
  });

  // all useStates:
  const [isDisabled, setIsDisabled] = useState(
    isAttacking || curGameStatus !== gameStatuses.ongoing
  );

  // all useEffects:
  useEffect(() => {
    const data = {
      p1: Math.floor(Math.random() * 150 + 1),
      p2: Math.floor(Math.random() * 150 + 1),
    };
    dispatch(enterNewGameMode(data));
  }, [dispatch]);

  useEffect(() => {
    if (
      isDisabled !== (isAttacking || curGameStatus !== gameStatuses.ongoing)
    ) {
      setIsDisabled((prevState) => !isDisabled);
    }
  }, [isAttacking, curGameStatus]);

  // --------------------- render GUI ---------------------------
  return (
    <div className={clsx(AppStyles.mainWindow, AppStyles.flexColumnTopCenter)}>
      {isEndGameModalOpen && <EndGameModal />}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={AppStyles.gameTitle}>Pokemon Battle Simulator</div>
          <div className={AppStyles.gameZone}>
            <Player
              who={'you'}
              curHealth={player1.health}
              pokemon={player1.pokemon}
              gotHit={isAttacking}
            />
            <div
              className={clsx(
                AppStyles.overview,
                AppStyles.flexColumnTopCenter
              )}
            >
              <div className={AppStyles.dicesWrapper}>
                <Dice value={curRound.dmgOfPlayer1} />
                <Dice value={curRound.dmgOfPlayer2} />
              </div>
              <div className={AppStyles.roundResults}>
                {!!curRound.dmgOfPlayer1 && (
                  <div className={AppStyles.playerResults}>
                    You hit for {curRound.dmgOfPlayer1}
                  </div>
                )}
                {!!curRound.dmgOfPlayer2 && (
                  <div className={AppStyles.playerResults}>
                    Your opponent hit for {curRound.dmgOfPlayer2}
                  </div>
                )}
              </div>
              <button
                className={clsx(
                  AppStyles.btnAttackCommon,
                  AppStyles.mgBot20,
                  isDisabled
                    ? AppStyles.btnAttackDisabled
                    : AppStyles.btnAttackActive
                )}
                onClick={() => dispatch(attack())}
                disabled={isDisabled}
              >
                Attack!
              </button>
            </div>
            <Player
              who={'opponent'}
              curHealth={player2.health}
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
