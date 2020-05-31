import React from 'react';
import { Button } from '../../components/Button/Button';
import PropTypes from 'prop-types';
import Styles from './Pagination.module.scss';

export function Pagination({
  totalPages,
  page,
  onNextBtnClick,
  onPreviousBtnClick,
}) {
  return (
    <section className={Styles.container}>
      <Button
        styleType="outlined"
        type="button"
        style={{ opacity: page === 1 && 0 }}
        onClick={onPreviousBtnClick}
      >
        {'Prev'}
      </Button>

      <div className={Styles.pageDisplay}>
        <h3>
          Page: {page} of {totalPages}
        </h3>
      </div>

      <Button
        styleType="outlined"
        style={{ opacity: page === totalPages && 0 }}
        type="button"
        onClick={onNextBtnClick}
      >
        {'Next'}
      </Button>
    </section>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onNextBtnClick: PropTypes.func.isRequired,
  onPreviousBtnClick: PropTypes.func.isRequired,
};
