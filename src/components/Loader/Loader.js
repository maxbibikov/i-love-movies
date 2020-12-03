import React from 'react';
import Styles from './Loader.module.scss';

export function Loader() {
  return (
    <div data-testid="loader" className={Styles.container}>
      <div className={Styles.spinner}>
        <div className={Styles.bounce1}></div>
        <div className={Styles.bounce2}></div>
        <div className={Styles.bounce3}></div>
      </div>
    </div>
  );
}
