import React from 'react';

// styles:
import AppStyles from '../../App.module.css';
import MyStyles from './endGame.module.css';
import { imgRedCircle } from '../../paths/images';

export default function EndGame({
  curGameStatus,
  gameStats,
  setIsEndGameModalOpen,
}) {
  //------------------- Render GUI ----------------------
  return (
    <div className={AppStyles.modalBg}>
      <div className={MyStyles.modalEndGameWrapper}>
        <img
          className={AppStyles.closeModal}
          src={imgRedCircle}
          alt='close login modal'
          onClick={() => setIsEndGameModalOpen(false)}
        />
        <div className={MyStyles.endGameTitle}>You Win!</div>
        <div className={MyStyles.endGameMsg}>
          Congratulations! You have defeated your opponent. What would you like
          to do next?
        </div>

        <div className={MyStyles.twoButtonsRow}>
          <button className={MyStyles.btnNewGame}>New Game</button>
          <div className={AppStyles.spacer}></div>

          <button
            type='button'
            className={MyStyles.btnCancel}
            onClick={() => setIsEndGameModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}