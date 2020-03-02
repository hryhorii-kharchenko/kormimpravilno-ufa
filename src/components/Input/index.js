import React from 'react';
import PropTypes from 'prop-types';

import InputMask from 'react-input-mask';

import './Input.module.css';
import tickIcon from '../../images/icons/tick.svg';

function Input({
  text,
  name,
  data,
  onChange,
  isRequired,
  isCheckbox,
  isPhone,
  isAlwaysChecked,
}) {
  const { value, isError, errorMsg } = data;
  const errorHtml = isError ? <p styleName="error">{errorMsg}</p> : null;

  if (isCheckbox) {
    if (isAlwaysChecked) {
      return (
        <article styleName="Input Input-checkbox">
          <label htmlFor={name} styleName="checkbox-label">
            <input
              type="checkbox"
              id={name}
              name={name}
              checked={value}
              styleName="checkbox-input"
              className="checkbox"
              onChange={onChange}
            />
            <div styleName="real-checkbox">
              <img src={tickIcon} alt="&#10003" styleName="real-checkbox-img" />
            </div>
            {text}
          </label>
        </article>
      );
    }
    return (
      <article styleName="Input Input-checkbox">
        <label
          htmlFor={name}
          onClick={() => {
            document.getElementById(name).checked = !document.getElementById(
              name
            ).checked;
          }}
          styleName="checkbox-label"
        >
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={value}
            styleName="checkbox-input"
            className="checkbox"
            onChange={onChange}
          />
          <div styleName="real-checkbox">
            <img src={tickIcon} alt="&#10003" styleName="real-checkbox-img" />
          </div>
          {text}
        </label>
      </article>
    );
  }

  if (isPhone) {
    return (
      <article styleName={`Input ${isError ? ' error' : ''}`}>
        <div styleName="input-wrapper">
          <InputMask
            mask="+7 (\999) 999-99-99"
            type="text"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            styleName={`text-input ${isError ? ' error' : ''}`}
            required={isRequired}
          />
          <label htmlFor={name} styleName={`label ${isError ? ' error' : ''}`}>
            {text}
          </label>
        </div>
        {errorHtml}
      </article>
    );
  }

  return (
    <article styleName={`Input ${isError ? ' error' : ''}`}>
      <div styleName="input-wrapper">
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          styleName={`text-input ${isError ? ' error' : ''}`}
          required={isRequired}
        />
        <label htmlFor={name} styleName={`label ${isError ? ' error' : ''}`}>
          {text}
        </label>
      </div>
      {errorHtml}
    </article>
  );
}

Input.defaultProps = {
  isRequired: false,
  isCheckbox: false,
  isPhone: false,
  isAlwaysChecked: false,
};

Input.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    isError: PropTypes.bool,
    errorMsg: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  isCheckbox: PropTypes.bool,
  isPhone: PropTypes.bool,
  isAlwaysChecked: PropTypes.bool,
};

export default Input;
