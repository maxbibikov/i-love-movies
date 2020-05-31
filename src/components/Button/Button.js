import React from 'react';
import Styles from './Button.module.scss';

export function Button({ styleType, children, ...restProps }) {
  let className = Styles.contained;

  if (styleType === 'outlined') {
    className = Styles.outlined;
  } else if (styleType === 'text') {
    className = '';
  } else if (styleType === 'icon') {
    className = Styles.icon;
  }

  return (
    <button {...restProps} className={className}>
      {children}
    </button>
  );
}
