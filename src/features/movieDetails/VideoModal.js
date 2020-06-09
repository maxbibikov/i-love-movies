import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { string, bool, func } from 'prop-types';
import Styles from './VideoModal.module.scss';
import { ReactComponent as CloseIcon } from '../../assets/close-black-48dp.svg';
import { Button } from '../../components/Button/Button';

export function VideoModal({ videoKey, title, onCloseClick, showVideoModal }) {
  const nodeRef = React.useRef(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={showVideoModal}
      timeout={100}
      unmountOnExit
      classNames={{
        enter: Styles['enter'],
        enterActive: Styles['enter-active'],
        exit: Styles['exit'],
        exitActive: Styles['exit-active'],
      }}
    >
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
    </CSSTransition>
  );
}

VideoModal.propTypes = {
  videoKey: string.isRequired,
  title: string.isRequired,
  onCloseClick: func.isRequired,
  showVideoModal: bool.isRequired,
};
