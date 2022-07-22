import React from 'react';
import clsx from 'clsx';
// styles:
import MyStyles from './healthBar.module.css';
import AppStyles from '../App.module.css';

export default function HealthBar({ width = '100%', completed = 50 }) {
  //------------------- Render GUI ----------------------
  return (
    <div
      className={clsx(AppStyles.flexColumnTopCenter, AppStyles.mgBot10)}
      style={{ width }}
    >
      <div className={clsx(MyStyles.uploadingBar, AppStyles.flexCenterLeft)}>
        <div
          className={clsx(MyStyles.uploadingFillerFull, AppStyles.flexCenter)}
        >
          <div
            className={MyStyles.uploadingFiller}
            style={{ width: `${Math.floor(completed)}%` }}
          ></div>
          <span className={MyStyles.howMuchCompleted}>{`${Math.floor(
            completed
          )}%`}</span>
        </div>
      </div>
    </div>
  );
}
