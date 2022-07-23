import React from 'react';
import clsx from 'clsx';

import MyStyles from './loadingFailed.module.css';
import AppStyles from '../App.module.css';
import { imgLoadingFailed } from '../paths/images';

export default function LoadingFailed() {
  return (
    <div
      className={clsx(
        MyStyles.loadingFailedContent,
        AppStyles.flexColumnCenter
      )}
    >
      <img
        src={imgLoadingFailed}
        alt='loading failed'
        className={clsx(MyStyles.imgLoadingFailed, AppStyles.mgBot20)}
      />
      <div className={MyStyles.loadingFailedMsg}>Loading failed...</div>
    </div>
  );
}
