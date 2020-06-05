import React from 'react';
import Styles from './VideoModal.module.scss';
import { ReactComponent as CloseIcon } from '../../assets/close-black-48dp.svg';
import { Button } from '../../components/Button/Button';

export function VideoModal({ videoKey, title, onCloseClick }) {
  return (
    <section className={Styles.container} onClick={onCloseClick}>
      <Button type="button" styleType="icon" onClick={onCloseClick}>
        <CloseIcon />
      </Button>
      <h1>{title} Trailer</h1>
      <div className={Styles.iframeContainer}>
        <div className={Styles.responsiveIframe}>
          <iframe
            key={videoKey}
            title={title}
            src={`https://www.youtube.com/embed/${videoKey}`}
            allow="fullscreen"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
