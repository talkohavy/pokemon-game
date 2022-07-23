import React from 'react';
import MyStyles from './spinner.module.css';

export default function Spinner({ size = 350 }) {
  return (
    <svg
      fill='currentColor'
      viewBox='0 0 100 100'
      className={MyStyles.spin}
      style={{ width: size, height: size }}
    >
      <circle
        stroke='black'
        strokeWidth='3'
        fill='#ed1c24'
        cx='50'
        cy='50'
        r='30'
      />
      <path
        stroke='black'
        strokeWidth='3'
        fill='white'
        d='M20 50 A1 1, 0, 0 0, 80 50'
      />
      <path stroke='black' strokeWidth='4' fill='white' d='M20 50 L80 50' />
      <circle
        stroke='black'
        strokeWidth='3'
        fill='white'
        cx='50'
        cy='50'
        r='8'
      />
    </svg>
  );
}
