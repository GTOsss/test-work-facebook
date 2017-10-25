import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import './input-select.css';

const Select = ({ input: { onChange, value }, meta: { touched, error }, defaultValue, options,
  className, placeholder, isLoading, noResultsText, loadOptions, searchPromptText,
  loadingPlaceholder, cssTypeGroup, cssWidth, cssBorderNone,
}) => (
  <div
    className={`type-group-${cssTypeGroup} text border-none-${cssBorderNone}`}
    style={cssWidth ? { width: cssWidth, marginLeft: '-2px' } : {}}
  >
    { loadOptions
      ? <ReactSelect.Async
        className={className}
        searchPromptText={searchPromptText}
        loadingPlaceholder={loadingPlaceholder}
        value={value || defaultValue}
        loadOptions={loadOptions}
        noResultsText={noResultsText}
        onChange={e => onChange(e || null)}
        placeholder={<span>{placeholder}</span>}
        autoload={false}
      />
      : <ReactSelect
        className={className}
        autoLoad
        openOnFocus
        value={value || defaultValue}
        isLoading={isLoading}
        noResultsText={noResultsText}
        options={options}
        onChange={e => onChange(e && e.value ? e.value : null)}
        placeholder={<span>{placeholder}</span>}
        clearable={false}
      />
    }
    {touched && error ?
      <div className={'errorMsg'}>
        {error}
      </div> : ''}
  </div>
);

Select.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  options: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  noResultsText: PropTypes.string,
  loadOptions: PropTypes.func,
  searchPromptText: PropTypes.string,
  loadingPlaceholder: PropTypes.string,
  cssTypeGroup: PropTypes.oneOf(['left', 'right', 'both', 'none']),
  cssBorderNone: PropTypes.oneOf(['left', 'right', 'both', 'none']),
  cssWidth: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any),
};

Select.defaultProps = {
  input: {},
  value: null,
  defaultValue: '',
  options: [],
  className: '',
  placeholder: '',
  isLoading: false,
  noResultsText: '',
  loadOptions: null,
  searchPromptText: 'Введите...',
  loadingPlaceholder: 'Загрузка...',
  cssTypeGroup: 'none',
  cssBorderNone: 'none',
  cssWidth: '',
  meta: {},
};

export default Select;
