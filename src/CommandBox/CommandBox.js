import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

// components:
import Dice from '../Dice';

// styles:
import MyStyles from './commandBox.module.css';
import AppStyles from '../App.module.css';

// utils:
import { gameStatuses } from '../utils/helpers';

export default function CommandBox({
  curRound,
  isAttacking,
  curGameStatus,
  enterNewGameMode,
  attack,
}) {
  // all useStates:
  const [isDisabled, setIsDisabled] = useState(
    isAttacking || curGameStatus !== gameStatuses.ongoing
  );

  // all useEffects:
  useEffect(() => {
    if (
      isDisabled !== (isAttacking || curGameStatus !== gameStatuses.ongoing)
    ) {
      setIsDisabled(!isDisabled);
    }
  }, [isAttacking, curGameStatus, isDisabled]);

  return (
    <div className={clsx(MyStyles.overview, AppStyles.flexColumnTopCenter)}>
      <div className={MyStyles.dicesWrapper}>
        <Dice value={curRound.dmgOfPlayer1} />
        <Dice value={curRound.dmgOfPlayer2} />
      </div>
      <div className={MyStyles.roundResults}>
        {!!curRound.dmgOfPlayer1 && (
          <div className={MyStyles.playerResults}>
            You hit for {curRound.dmgOfPlayer1}
          </div>
        )}
        {!!curRound.dmgOfPlayer2 && (
          <div className={MyStyles.playerResults}>
            Your opponent hit for {curRound.dmgOfPlayer2}
          </div>
        )}
      </div>
      <button
        className={clsx(
          MyStyles.btnAttackCommon,
          AppStyles.mgBot20,
          isDisabled ? MyStyles.btnAttackDisabled : MyStyles.btnAttackActive
        )}
        onClick={() => attack()}
        disabled={isDisabled}
      >
        Attack!
      </button>
      {curGameStatus !== gameStatuses.ongoing && (
        <>
          <button
            className={MyStyles.btnNewGame}
            onClick={() => {
              enterNewGameMode({ type: 'opponent' });
            }}
          >
            <div className={MyStyles.btnMainTxt}>New Game</div>
            <div className={MyStyles.btnSubTxt}>with same pokemon</div>
          </button>

          <button
            type='button'
            className={MyStyles.btnStartOver}
            onClick={() => {
              enterNewGameMode({ type: 'both' });
            }}
          >
            <div className={MyStyles.btnMainTxt}>Start Over</div>
            <div className={MyStyles.btnSubTxt}>with a new pokemon</div>
          </button>
        </>
      )}
    </div>
  );
}
