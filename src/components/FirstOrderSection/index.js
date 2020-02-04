import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Button from '../Button';

import './FirstOrderSection.module.css';

function FirstOrderSection({
  isActive,
  fullName,
  fullNameOnChange,
  phone,
  phoneOnChange,
  email,
  emailOnChange,
  isSubscribeActive,
  isSubscribeActiveOnChange,
  nextOnClick,
  redactOnClick,
  submitForm,
}) {
  return (
    <section
      id="first"
      styleName={`FirstOrderSection ${isActive ? ' active' : ''}`}
    >
      <div styleName="heading-wrapper">
        <div styleName="heading-text-wrapper">
          <div styleName="number-wrapper">
            <p styleName="number">1</p>
          </div>
          <h2 styleName="heading">Контактные данные</h2>
        </div>
        <button type="button" onClick={redactOnClick} styleName="redact">
          Редактировать
        </button>
      </div>

      <div styleName="line-heading" />

      <div styleName="content-wrapper">
        <form id="first-form" onSubmit={submitForm} styleName="form first-form">
          <Input
            text="Имя и фамилия"
            name="fullName"
            data={fullName}
            onChange={fullNameOnChange}
            isRequired
          />
          <Input
            text="Телефон"
            name="phone"
            data={phone}
            onChange={phoneOnChange}
            isRequired
            isPhone
          />
          <Input
            text="Email"
            name="email"
            data={email}
            onChange={emailOnChange}
            isRequired
          />
          <Input
            text="Подписаться на новости и эксклюзивные предложения"
            name="subscribe"
            data={isSubscribeActive}
            onChange={isSubscribeActiveOnChange}
            isCheckbox
          />
        </form>

        <Button
          isAction
          isTextBlack
          onClick={nextOnClick}
          styleName="continue-btn"
        >
          Далее
        </Button>
      </div>
    </section>
  );
}

FirstOrderSection.defaultProps = {
  isActive: false,
};

FirstOrderSection.propTypes = {
  isActive: PropTypes.bool,
  fullName: PropTypes.shape().isRequired,
  fullNameOnChange: PropTypes.func.isRequired,
  phone: PropTypes.shape().isRequired,
  phoneOnChange: PropTypes.func.isRequired,
  email: PropTypes.shape().isRequired,
  emailOnChange: PropTypes.func.isRequired,
  isSubscribeActive: PropTypes.shape().isRequired,
  isSubscribeActiveOnChange: PropTypes.func.isRequired,
  nextOnClick: PropTypes.func.isRequired,
  redactOnClick: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default FirstOrderSection;
