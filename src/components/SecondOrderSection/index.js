import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import SanitizeHTML from '../SanitizeHTML';
import Button from '../Button';

import './SecondOrderSection.module.css';
import tickIcon from '../../images/icons/tick.svg';
import mcImg from '../../images/icons/logo-mastercard.svg';
import visaImg from '../../images/icons/logo-visa.svg';

function SecondOrderSection({
  isActive,
  data,
  delivery,
  deliveryOnChange,
  city,
  cityOnChange,
  address,
  addressOnChange,
  // postIndex,
  // postIndexOnChange,
  promo,
  promoOnChange,
  promoClear,
  comment,
  commentOnChange,
  submitForm,
  totalPriceWithoutDelivery,
  catalogFull,
  promoObj,
  promoObjOnClick,
  promoLabel,
}) {
  const isPromoApplied =
    !(Object.keys(promoObj).length === 0 &&
    promoObj.constructor === Object);
  const [commentIsActive, setCommentIsActive] = useState(false);

  const { first, second, third } = data.deliveryWays;
  const { paymentInstruction } = data;

  let firstPaidDeliveryProductPrice;
  let secondPaidDeliveryProductPrice;
  let thirdPaidDeliveryProductPrice;

  if (first.paidDeliveryProductId) {
    const product = catalogFull.find(
      ({ productId }) => productId === first.paidDeliveryProductId
    );
    if (product) {
      firstPaidDeliveryProductPrice = parseInt(product.price.slice(1), 10);
    }
  }

  if (second.paidDeliveryProductId) {
    const product = catalogFull.find(
      ({ productId }) => productId === second.paidDeliveryProductId
    );
    if (product) {
      secondPaidDeliveryProductPrice = parseInt(product.price.slice(1), 10);
    }
  }

  if (third.paidDeliveryProductId) {
    const product = catalogFull.find(
      ({ productId }) => productId === third.paidDeliveryProductId
    );
    if (product) {
      thirdPaidDeliveryProductPrice = parseInt(product.price.slice(1), 10);
    }
  }

  // let isFreeShipping = false;
  let freeShippingId = -1;
  if (promoObj.enable_free_shipping && promoObj.free_shipping_id) {
    if (promoObj.free_shipping_id > 0 && promoObj.free_shipping_id < 4) {
      // isFreeShipping = true;
      freeShippingId = Number(promoObj.free_shipping_id);
    }
  }

  let deliveryPriceFirst;
  let deliveryPriceSecond;
  let deliveryPriceThird;

  if (firstPaidDeliveryProductPrice) {
    if (freeShippingId === 1) {
      deliveryPriceFirst = `0р`;
    } else if (first.minimalFreeDeliverySum) {
      deliveryPriceFirst =
        totalPriceWithoutDelivery < first.minimalFreeDeliverySum
          ? `${firstPaidDeliveryProductPrice}р`
          : '0р';
    } else {
      deliveryPriceFirst = `${firstPaidDeliveryProductPrice}р`;
    }
  }

  if (secondPaidDeliveryProductPrice) {
    if (freeShippingId === 2) {
      deliveryPriceFirst = `0р`;
    } else if (second.minimalFreeDeliverySum) {
      deliveryPriceSecond =
        totalPriceWithoutDelivery < second.minimalFreeDeliverySum
          ? `${secondPaidDeliveryProductPrice}р`
          : '0р';
    } else {
      deliveryPriceSecond = `${secondPaidDeliveryProductPrice}р`;
    }
  }

  if (thirdPaidDeliveryProductPrice) {
    if (freeShippingId === 3) {
      deliveryPriceFirst = `0р`;
    } else if (third.minimalFreeDeliverySum) {
      deliveryPriceThird =
        totalPriceWithoutDelivery < third.minimalFreeDeliverySum
          ? `${thirdPaidDeliveryProductPrice}р`
          : '0р';
    } else {
      deliveryPriceThird = `${thirdPaidDeliveryProductPrice}р`;
    }
  }

  const firstDescription = first.description ? (
    <p styleName="description">
      <span styleName="gray">{first.description}</span>
    </p>
  ) : null;

  const secondDescription = second.description ? (
    <p styleName="description">
      <span styleName="gray">{second.description}</span>
    </p>
  ) : null;

  const thirdDescription = third.description ? (
    <p styleName="description">
      <span styleName="gray">{third.description}</span>
    </p>
  ) : null;

  const paymentInstructionHtml = paymentInstruction ? (
    <section styleName="payment-instruction">
      <SanitizeHTML html={paymentInstruction} />
    </section>
  ) : null;

  const commentBtnHtml = !commentIsActive ? (
    <button
      type="button"
      onClick={() => setCommentIsActive(true)}
      styleName="show-comment-btn"
    >
      Добавить комментарий к заказу
    </button>
  ) : null;
  const commentHtml = commentIsActive ? (
    <form onSubmit={submitForm} id="comment-form" styleName="form comment-form">
      <Input
        text="Комментарий к заказу"
        name="comment"
        data={comment}
        onChange={commentOnChange}
      />
    </form>
  ) : null;

  const radioHtml = [];

  radioHtml.push(
    <div styleName="radio-elem-wrapper" key="first">
      <label htmlFor="first-radio" styleName="radio-label">
        <div styleName="first-row">
          <input
            type="radio"
            id="first-radio"
            value="first"
            name="delivery-radio"
            checked={delivery.value === 'first'}
            onChange={deliveryOnChange}
            styleName="radio-btn"
            disabled={delivery.value === ''}
          />
          <div styleName="real-radio">
            <div styleName="real-radio-circle" />
          </div>
          {first.heading}
        </div>
        <div styleName="second-row">
          {firstDescription}
          <p styleName="price">
            <span styleName="gray">Стоимость:</span>
            {deliveryPriceFirst}
          </p>
        </div>
      </label>
    </div>
  );

  if (second.heading && deliveryPriceSecond) {
    radioHtml.push(
      <div styleName="radio-elem-wrapper" key="second">
        <label htmlFor="second-radio" styleName="radio-label">
          <div styleName="first-row">
            <input
              type="radio"
              id="second-radio"
              value="second"
              name="delivery-radio"
              checked={delivery.value === 'second'}
              onChange={deliveryOnChange}
              styleName="radio-btn"
              disabled={delivery.value === ''}
            />
            <div styleName="real-radio">
              <div styleName="real-radio-circle" />
            </div>
            {second.heading}
          </div>
          <div styleName="second-row">
            {secondDescription}
            <p styleName="price">
              <span styleName="gray">Стоимость:</span>
              {deliveryPriceSecond}
            </p>
          </div>
        </label>
      </div>
    );
  }

  if (third.heading && deliveryPriceThird) {
    radioHtml.push(
      <div styleName="radio-elem-wrapper" key="third">
        <label htmlFor="third-radio" styleName="radio-label">
          <div styleName="first-row">
            <input
              type="radio"
              id="third-radio"
              value="third"
              name="delivery-radio"
              checked={delivery.value === 'third'}
              onChange={deliveryOnChange}
              styleName="radio-btn"
              disabled={delivery.value === ''}
            />
            <div styleName="real-radio">
              <div styleName="real-radio-circle" />
            </div>
            {third.heading}
          </div>
          <div styleName="second-row">
            {thirdDescription}
            <p styleName="price">
              <span styleName="gray">Стоимость:</span>
              {deliveryPriceThird}
            </p>
          </div>
        </label>
      </div>
    );
  }

  return (
    <section
      id="second"
      styleName={`SecondOrderSection ${isActive ? ' active' : ''}`}
    >
      <div styleName="heading-wrapper">
        <div styleName="number-wrapper">
          <p styleName="number">2</p>
        </div>
        <h2 styleName="heading">Доставка и оплата</h2>
      </div>

      <div styleName="line-delivery" />

      <div styleName="content-wrapper">
        <h3 styleName="subheading-delivery">Способ доставки:</h3>
        <form id="second-form" onSubmit={submitForm} styleName="form">
          <fieldset styleName="radio-wrapper">{radioHtml}</fieldset>

          <Input
            text="Город"
            name="city"
            data={city}
            onChange={cityOnChange}
            isRequired
          />
          <Input
            text="Адрес"
            name="address"
            data={address}
            onChange={addressOnChange}
            isRequired
          />
          {/* <Input
            text="Почтовый индекс"
            name="postIndex"
            data={postIndex}
            onChange={postIndexOnChange}
            isRequired
          /> */}
        </form>

        <div styleName="line-payment" />

        <h3 styleName="subheading-payment">Способ оплаты:</h3>

        <section styleName="payment-ways">
          <article styleName="payment-way">
            <div styleName="payment-way-text-wrapper">
              <img src={tickIcon} alt="" styleName="payment-way-tick" />
              <p styleName="payment-way-name">Онлайн оплата картой</p>
            </div>
            <div styleName="payment-way-img-wrapper">
              <div styleName="payment-way-inner-img-wrapper">
                <img src={mcImg} alt="Виза" styleName="payment-way-img" />
              </div>
              <div styleName="payment-way-inner-img-wrapper">
                <img
                  src={visaImg}
                  alt="Мастеркард"
                  styleName="payment-way-img"
                />
              </div>
            </div>
          </article>
        </section>

        {paymentInstructionHtml}

        {/* <h3 styleName="subheading-promo">Есть промокод? Получите скидку</h3> */}
        <form id="promo-form" onSubmit={submitForm} styleName="form">
          <Input
            text={promoLabel}
            name="promo"
            data={promo}
            onChange={promoOnChange}
          />
          <Button
            onClick={isPromoApplied ? promoClear : promoObjOnClick}
            styleName="promo-btn"
            isAction
            isTextBlack
            isCancel={isPromoApplied}
          >
            {isPromoApplied ? 'Отменить' : 'Применить'}
          </Button>
        </form>

        <div styleName="line-promo" />

        {commentBtnHtml}
        {commentHtml}
      </div>
    </section>
  );
}

SecondOrderSection.defaultProps = {
  isActive: false,
};

SecondOrderSection.propTypes = {
  isActive: PropTypes.bool,
  data: PropTypes.shape({
    deliveryWays: PropTypes.shape({
      first: PropTypes.shape({
        description: PropTypes.string,
        heading: PropTypes.string,
        price: PropTypes.number,
        paidDeliveryProductId: PropTypes.number,
        freeDeliveryProductId: PropTypes.number,
        minimalFreeDeliverySum: PropTypes.number,
      }),
      second: PropTypes.shape({
        description: PropTypes.string,
        heading: PropTypes.string,
        price: PropTypes.number,
        paidDeliveryProductId: PropTypes.number,
        freeDeliveryProductId: PropTypes.number,
        minimalFreeDeliverySum: PropTypes.number,
      }),
      third: PropTypes.shape({
        description: PropTypes.string,
        heading: PropTypes.string,
        price: PropTypes.number,
        paidDeliveryProductId: PropTypes.number,
        freeDeliveryProductId: PropTypes.number,
        minimalFreeDeliverySum: PropTypes.number,
      }),
    }),
    paymentInstruction: PropTypes.string,
  }).isRequired,
  delivery: PropTypes.shape().isRequired,
  deliveryOnChange: PropTypes.func.isRequired,
  city: PropTypes.shape().isRequired,
  cityOnChange: PropTypes.func.isRequired,
  address: PropTypes.shape().isRequired,
  addressOnChange: PropTypes.func.isRequired,
  // postIndex: PropTypes.shape().isRequired,
  // postIndexOnChange: PropTypes.func.isRequired,
  promo: PropTypes.shape().isRequired,
  promoOnChange: PropTypes.func.isRequired,
  promoClear: PropTypes.func.isRequired,
  comment: PropTypes.shape().isRequired,
  commentOnChange: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  totalPriceWithoutDelivery: PropTypes.number.isRequired,
  catalogFull: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  promoObj: PropTypes.shape().isRequired,
  promoObjOnClick: PropTypes.func.isRequired,
  promoLabel: PropTypes.string.isRequired,
};

export default SecondOrderSection;
