import React from 'react';
import clsx from 'clsx';

// styles:
import AppStyles from '../../App.module.css';
import MyStyles from './endGame.module.css';
import { imgRedCircle } from '../../paths/images';
// utils:
import { messages } from './constants';
import { gameStatuses } from '../../gameLogic';

export default function EndGame({ curGameStatus, overallStats, closeEndGame }) {
  // all functions:

  if (curGameStatus === gameStatuses.ongoing) return null;

  //------------------- Render GUI ----------------------
  return (
    <div className={AppStyles.modalBg}>
      <div className={MyStyles.modalEndGameWrapper}>
        <img
          className={AppStyles.closeModal}
          src={imgRedCircle}
          alt='close login modal'
          onClick={() => closeEndGame()}
        />
        <div className={MyStyles.endGameTitle}>
          {messages[curGameStatus].title}
        </div>
        <div className={MyStyles.endGameMsg}>
          {messages[curGameStatus].messages}
        </div>
        <table className={clsx(MyStyles.table, AppStyles.mgBot20)}>
          <thead className={MyStyles.thead}>
            <tr>
              <th className={MyStyles.th}>Won</th>
              <th className={MyStyles.th}>Lost</th>
              <th className={MyStyles.th}>Tie</th>
            </tr>
          </thead>
          <tbody className={MyStyles.tbody}>
            <tr className={MyStyles.tr}>
              <td className={MyStyles.td}>{overallStats.wins}</td>
              <td className={MyStyles.td}>{overallStats.loses}</td>
              <td className={MyStyles.td}>{overallStats.ties}</td>
            </tr>
          </tbody>
        </table>

        <div className={MyStyles.twoButtonsRow}>
          <button
            className={MyStyles.btnNewGame}
            onClick={() => closeEndGame()}
          >
            New Game
          </button>
          <div className={AppStyles.spacer}></div>

          <button
            type='button'
            className={MyStyles.btnCancel}
            onClick={() => closeEndGame()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
