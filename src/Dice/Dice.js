import React from 'react';
import MyStyles from './dice.module.css';

export default function Dice({ value = '?' }) {
  return <div className={MyStyles.dice}>{value}</div>;
}
