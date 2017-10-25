import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import style from './button.scss';

const Button = ({ children, type, onClick, className, disabled }) => (
  <button
    className={cx(className, disabled ? style.buttonDisable : style.button)}
    type={!disabled ? type : 'button'}
    onClick={(e) => { !disabled && onClick && onClick(e); }} // eslint-disable-line
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.any, // eslint-disable-line
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: null,
  type: '',
  className: '',
  disabled: false,
  onClick: null,
};

export default Button;
