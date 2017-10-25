import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import style from './input.scss';

const Input = ({ input: { value, onChange }, meta: { touched, error }, placeholder,
  setRef, cssInput, cssTypeGroup, cssWidth, defaultValue, readOnly, onBlur, onFocus,
  onChange: onChangeHandler,
}) => (
  <div
    className={style.wrapInput}
    style={cssWidth ? { width: cssWidth, marginLeft: '-2px' } : {}}
  >
    <input
      className={cx(style.input, style[cssTypeGroup], touched && error ? style.inputError : '')}
      onBlur={e => (onChange && onChange(e.target.value)) || (onBlur && onBlur(e))}
      onFocus={e => onFocus && onFocus(e)}
      onChange={e => onChangeHandler && onChangeHandler(e)}
      type="text"
      defaultValue={value || defaultValue}
      placeholder={placeholder}
      ref={setRef}
      style={cssInput}
      readOnly={readOnly}
    />
    {touched && error ?
      <div className={style.errorMsg}>
        {error}
      </div> : ''}
  </div>
);

Input.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  meta: PropTypes.objectOf(PropTypes.any),
  placeholder: PropTypes.string,
  cssTypeGroup: PropTypes.oneOf(['left', 'right', 'both', 'none']),
  cssWidth: PropTypes.string,
  defaultValue: PropTypes.string,
  setRef: PropTypes.func,
  cssInput: PropTypes.objectOf(PropTypes.any),
  readOnly: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  input: {},
  meta: {},
  placeholder: '',
  cssTypeGroup: 'none',
  cssWidth: '',
  defaultValue: '',
  setRef: null,
  cssInput: {},
  readOnly: false,
  onBlur: null,
  onFocus: null,
  onChange: null,
};

export default Input;
