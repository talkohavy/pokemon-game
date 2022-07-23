import React, { useMemo } from 'react';
import MyStyles from './dice.module.css';

export default function Dice({ value = '?' }) {
  const renderDice = useMemo(
    () => (value) => {
      switch (value) {
        case 1:
          return (
            <>
              <div className={MyStyles.middleCenter}></div>
            </>
          );
        case 2:
          return (
            <>
              <div className={MyStyles.upperLeft}></div>
              <div className={MyStyles.lowerRight}></div>
            </>
          );
        case 3:
          return (
            <>
              <div className={MyStyles.upperLeft}></div>
              <div className={MyStyles.middleCenter}></div>
              <div className={MyStyles.lowerRight}></div>
            </>
          );
        case 4:
          return (
            <>
              <div className={MyStyles.upperLeft}></div>
              <div className={MyStyles.upperRight}></div>
              <div className={MyStyles.lowerLeft}></div>
              <div className={MyStyles.lowerRight}></div>
            </>
          );
        case 5:
          return (
            <>
              <div className={MyStyles.upperLeft}></div>
              <div className={MyStyles.upperRight}></div>
              <div className={MyStyles.middleCenter}></div>
              <div className={MyStyles.lowerLeft}></div>
              <div className={MyStyles.lowerRight}></div>
            </>
          );
        case 6:
          return (
            <>
              <div className={MyStyles.upperLeft}></div>
              <div className={MyStyles.upperRight}></div>
              <div className={MyStyles.middleLeft}></div>
              <div className={MyStyles.middleRight}></div>
              <div className={MyStyles.lowerLeft}></div>
              <div className={MyStyles.lowerRight}></div>
            </>
          );
        default:
          return null;
      }
    },
    [value]
  );

  return <div className={MyStyles.dice}>{renderDice(value)}</div>;
}
