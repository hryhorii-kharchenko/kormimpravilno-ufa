import React, { Component } from 'react';
import { graphql, navigate } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ContentWrapper from '../components/ContentWrapper';
import SectionHeading from '../components/SectionHeading';
import FirstOrderSection from '../components/FirstOrderSection';
import SecondOrderSection from '../components/SecondOrderSection';
import CartList from '../components/CartList';
import Button from '../components/Button';

import './order.module.css';

class OrderPage extends Component {
  constructor(props) {
    super(props);

    let formData = {};
    if (typeof window !== 'undefined') {
      formData = JSON.parse(window.localStorage.getItem('orderFormData')) || {};
    }

    this.state = {
      isFirstSectionActive: true,
      fullName: {
        value: formData.fullName || '',
        isError: false,
        errorMsg: '',
      },
      phone: { value: formData.phone || '', isError: false, errorMsg: '' },
      email: { value: formData.email || '', isError: false, errorMsg: '' },
      isSubscribeActive: { value: true, isError: false, errorMsg: '' },
      delivery: { value: 'first', isError: false, errorMsg: '' },
      city: { value: formData.city || '', isError: false, errorMsg: '' },
      address: { value: formData.address || '', isError: false, errorMsg: '' },
      // postIndex: {
      //   value: formData.postIndex || '',
      //   isError: false,
      //   errorMsg: '',
      // },
      // timeOfDelivery: '',
      promo: { value: '', isError: false, errorMsg: '' },
      promoObj: {},
      comment: { value: '', isError: false, errorMsg: '' },
    };

    this.activateFirstSectionHandler = this.activateFirstSectionHandler.bind(
      this
    );
    this.activateSecondSectionHandler = this.activateSecondSectionHandler.bind(
      this
    );
    this.fullNameChangeHandler = this.fullNameChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.isSubscribeActiveChangeHandler = this.isSubscribeActiveChangeHandler.bind(
      this
    );
    this.deliveryChangeHandler = this.deliveryChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.addressChangeHandler = this.addressChangeHandler.bind(this);
    // this.postIndexChangeHandler = this.postIndexChangeHandler.bind(this);
    this.promoChangeHandler = this.promoChangeHandler.bind(this);
    this.promoObjClickHandler = this.promoObjClickHandler.bind(this);
    this.commentChangeHandler = this.commentChangeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const { closeCart } = this.props;
    closeCart();
  }

  submitForm(e) {
    e.preventDefault();
    const { cart, catalog, data } = this.props;
    const {
      first,
      second,
      third,
    } = data.wpgraphql.orderPage.order_page.deliveryWays;

    this.validatePage();

    setTimeout(() => {
      const {
        fullName,
        phone,
        email,
        city,
        address,
        delivery,
        promo,
        promoObj,
        // postIndex
      } = this.state;

      if (
        !(
          (
            fullName.isError ||
            phone.isError ||
            email.isError ||
            city.isError ||
            address.isError
          )
          // || postIndex.isError
        )
      ) {
        const firstForm = document.getElementById('first-form');
        const secondForm = document.getElementById('second-form');
        // const promoForm = document.getElementById('promo-form');
        const commentForm = document.getElementById('comment-form');

        const firstFormData = new FormData(firstForm);
        const secondFormData = new FormData(secondForm);
        // const promoFormData = new FormData(promoForm);
        const commentFormData = commentForm ? new FormData(commentForm) : null;

        const prodList = Object.entries(cart).map(([key, value]) => [
          catalog.find(elem => elem.id === key).price,
          value,
        ]);
        const totalPrice = prodList.reduce(
          (prev, [price, quantity]) =>
            prev + parseInt(price.slice(1), 10) * quantity,
          0
        );

        Array.from(secondFormData).forEach(([name, value]) => {
          firstFormData.set(name, value);
        });
        // Array.from(promoFormData).forEach(([name, value]) => {
        //   firstFormData.set(name, value);
        // });

        if (commentFormData) {
          Array.from(commentFormData).forEach(([name, value]) => {
            firstFormData.set(name, value);
          });
        }

        const lineItems = Object.entries(cart).map(([key, value]) => {
          return {
            product_id: catalog.find(prod => prod.id === key).productId,
            quantity: value,
          };
        });

        // let isFreeShipping = false;
        let freeShippingId = -1;
        if (
          promoObj.enable_free_shipping &&
          promoObj.hasOwnProperty('free_shipping_id')
        ) {
          if (promoObj.free_shipping_id > 0 && promoObj.free_shipping_id < 4) {
            // isFreeShipping = true;
            freeShippingId = Number(promoObj.free_shipping_id);
          }
        }

        if (delivery.value === 'first') {
          if (freeShippingId === 1 && first.freeDeliveryProductId) {
            lineItems.push({
              product_id: Number(first.freeDeliveryProductId),
              quantity: 1,
            });
          } else if (
            first.minimalFreeDeliverySum &&
            first.freeDeliveryProductId
          ) {
            if (totalPrice < first.minimalFreeDeliverySum) {
              lineItems.push({
                product_id: Number(first.paidDeliveryProductId),
                quantity: 1,
              });
            } else {
              lineItems.push({
                product_id: Number(first.freeDeliveryProductId),
                quantity: 1,
              });
            }
          } else {
            lineItems.push({
              product_id: Number(first.paidDeliveryProductId),
              quantity: 1,
            });
          }
        }

        if (delivery.value === 'second') {
          if (freeShippingId === 2 && second.freeDeliveryProductId) {
            lineItems.push({
              product_id: Number(second.freeDeliveryProductId),
              quantity: 1,
            });
          } else if (
            second.minimalFreeDeliverySum &&
            second.freeDeliveryProductId
          ) {
            if (totalPrice < second.minimalFreeDeliverySum) {
              lineItems.push({
                product_id: Number(second.paidDeliveryProductId),
                quantity: 1,
              });
            } else {
              lineItems.push({
                product_id: Number(second.freeDeliveryProductId),
                quantity: 1,
              });
            }
          } else {
            lineItems.push({
              product_id: Number(second.paidDeliveryProductId),
              quantity: 1,
            });
          }
        }

        if (delivery.value === 'third' && third.paidDeliveryProductId) {
          if (freeShippingId === 3 && third.freeDeliveryProductId) {
            lineItems.push({
              product_id: Number(third.freeDeliveryProductId),
              quantity: 1,
            });
          } else if (
            third.minimalFreeDeliverySum &&
            third.freeDeliveryProductId
          ) {
            if (totalPrice < third.minimalFreeDeliverySum) {
              lineItems.push({
                product_id: Number(third.paidDeliveryProductId),
                quantity: 1,
              });
            } else {
              lineItems.push({
                product_id: Number(third.freeDeliveryProductId),
                quantity: 1,
              });
            }
          } else {
            lineItems.push({
              product_id: Number(third.paidDeliveryProductId),
              quantity: 1,
            });
          }
        }

        firstFormData.set('line_items', JSON.stringify(lineItems));

        const object = {};
        firstFormData.forEach((value, key) => {
          object[key] = value;
        });
        object.promo = promoObj.hasOwnProperty('code')
          ? promoObj.code
          : promo.value;
        const json = JSON.stringify(object);

        window.localStorage.setItem(
          'orderFormData',
          JSON.stringify({
            fullName: fullName.value,
            phone: phone.value,
            email: email.value,
            city: city.value,
            address: address.value,
            // postIndex: postIndex.value,
          })
        );

        fetch(
          // 'https://ufa.wpkormimpravilno.ru/wp-json/kormimpravilno/v1/order',
          'https://ufa.wpkormimpravilno.ru/wp-json/kormimpravilno/v1/order-tinkoff',
          {
            method: 'POST',
            body: json,
          }
        )
          .then(response => {
            if (response.ok) return response.text();
            alert(
              'Ошибка соединения с сервером. Пожалуйста, попробуйте ещё раз.'
            );
            return null;
          })
          .then(url => {
            if (/http/.test(url)) {
              // window.sessionStorage.clear('cart');
              const href = url
                .substring(1, url.length - 1)
                .replace('new\\', 'new')
                .replace('ru\\', 'ru');
              window.location.href = href;
            } else {
              alert(
                'Ошибка получения ссылки на оплату. Пожалуйста, попробуйте ещё раз.'
              );
            }
          })
          .catch(error => console.error(error));
      }
    }, 200);
  }

  activateFirstSectionHandler() {
    this.validateSecondForm();

    this.setState(() => ({ isFirstSectionActive: true }));
  }

  activateSecondSectionHandler() {
    this.validateFirstForm();

    setTimeout(() => {
      const { fullName, phone, email } = this.state;
      if (!(fullName.isError || phone.isError || email.isError)) {
        this.setState(() => ({
          isFirstSectionActive: false,
        }));
      }
    }, 200);
  }

  validatePage() {
    this.validateFirstForm();
    this.validateSecondForm();
  }

  validateFirstForm() {
    const { fullName, phone, email } = this.state;
    this.validateFullName(fullName.value);
    this.validatePhone(phone.value);
    this.validateEmail(email.value);
  }

  validateSecondForm() {
    const {
      city,
      address,
      // postIndex
    } = this.state;
    this.validateCity(city.value);
    this.validateAddress(address.value);
    // this.validatePostIndex(postIndex.value);
  }

  validateFullName(value) {
    const regExp = /^([А-яA-z]+\s*){2}/;
    let isError = false;
    const regExpRequired = /^.+/;
    let errorMsg = '';

    if (!regExp.test(value)) {
      isError = true;
      errorMsg = 'Введите имя и фамилию';
    }

    if (!regExpRequired.test(value)) {
      isError = true;
      errorMsg = 'Заполните поле';
    }

    this.setState(() => ({
      fullName: {
        value,
        isError,
        errorMsg,
      },
    }));
  }

  validatePhone(value) {
    const regExp = /[_]/;
    let isError = false;
    const regExpRequired = /^.+/;
    let errorMsg = '';

    if (regExp.test(value)) {
      isError = true;
      errorMsg = 'Введите правильный телефон';
    }

    if (!regExpRequired.test(value)) {
      isError = true;
      errorMsg = 'Заполните поле';
    }

    this.setState(() => ({
      phone: { value, isError, errorMsg },
    }));
  }

  validateEmail(value) {
    const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let isError = false;
    const regExpRequired = /^.+/;
    let errorMsg = '';

    if (!regExp.test(value)) {
      isError = true;
      errorMsg = 'Введите правильный email';
    }

    if (!regExpRequired.test(value)) {
      isError = true;
      errorMsg = 'Заполните поле';
    }

    this.setState(() => ({
      email: {
        value,
        isError,
        errorMsg,
      },
    }));
  }

  validateCity(value) {
    const regExp = /^([А-Я][а-я]+\s*)/;
    let isError = false;
    const regExpRequired = /^.+/;
    let errorMsg = '';

    if (!regExp.test(value)) {
      isError = true;
      errorMsg = 'Введите свой город';
    }

    if (!regExpRequired.test(value)) {
      isError = true;
      errorMsg = 'Заполните поле';
    }

    this.setState(() => ({
      city: {
        value,
        isError,
        errorMsg,
      },
    }));
  }

  validateAddress(value) {
    const regExp = /([А-Я]*[а-я]+[\s.,]*)(\d+)/;
    let isError = false;
    const regExpRequired = /^.+/;
    let errorMsg = '';

    if (!regExp.test(value)) {
      isError = true;
      errorMsg = 'Введите полный адрес';
    }

    if (!regExpRequired.test(value)) {
      isError = true;
      errorMsg = 'Заполните поле';
    }

    this.setState(() => ({
      address: {
        value,
        isError,
        errorMsg,
      },
    }));
  }

  // validatePostIndex(value) {
  //   const regExp = /^(\d{6})$/;
  //   let isError = false;
  //   const regExpRequired = /^.+/;
  //   let errorMsg = '';

  //   if (!regExp.test(value)) {
  //     isError = true;
  //     errorMsg = 'Введите правильный индекс';
  //   }

  //   if (!regExpRequired.test(value)) {
  //     isError = true;
  //     errorMsg = 'Заполните поле';
  //   }

  //   this.setState(() => ({
  //     postIndex: {
  //       value,
  //       isError,
  //       errorMsg,
  //     },
  //   }));
  // }

  fullNameChangeHandler(event) {
    const { value } = event.target;
    this.validateFullName(value);
  }

  phoneChangeHandler(event) {
    const { value } = event.target;
    this.validatePhone(value);
  }

  emailChangeHandler(event) {
    const { value } = event.target;
    this.validateEmail(value);
  }

  isSubscribeActiveChangeHandler(event) {
    const { checked } = event.target;

    this.setState(() => ({
      isSubscribeActive: { value: checked },
    }));
  }

  deliveryChangeHandler(event) {
    const { value } = event.target;
    const isError = false;
    const errorMsg = '';

    this.setState(() => ({
      delivery: {
        value,
        isError,
        errorMsg,
      },
    }));
  }

  cityChangeHandler(event) {
    const { value } = event.target;
    this.validateCity(value);
  }

  addressChangeHandler(event) {
    const { value } = event.target;
    this.validateAddress(value);
  }

  // postIndexChangeHandler(event) {
  //   const { value } = event.target;
  //   this.validatePostIndex(value);
  // }

  promoChangeHandler(event) {
    const { value } = event.target;
    // const regExp = /^(\d{6})/;
    const isError = false;

    // if (!regExp.test(value)) {
    //   isError = true;
    // }

    this.setState(() => ({
      promo: {
        value,
        isError,
      },
    }));
  }

  promoObjClickHandler() {
    const { promo } = this.state;

    fetch(
      `https://ufa.wpkormimpravilno.ru/wp-json/kormimpravilno/v1/check_promo?promo=${promo.value}`,
      {
        method: 'GET',
      }
    )
      .then(response => {
        if (response.ok) return response.json();
        alert('Ошибка соединения с сервером. Пожалуйста, повторите запрос.');
        return null;
      })
      .then(json => {
        if (!json) {
          this.setState(() => ({
            promo: { value: 'Промокод не существует', isError: false },
          }));
          return;
        }
        const newPromoObj = { ...JSON.parse(json) };
        if (newPromoObj) {
          this.setState(() => ({
            promoObj: newPromoObj,
            promo: { value: 'Промокод применен', isError: false },
          }));
        }
      })
      .catch(error => console.error(error));
  }

  commentChangeHandler(event) {
    const { value } = event.target;
    const isError = false;

    this.setState(() => ({
      comment: {
        value,
        isError,
      },
    }));
  }

  render() {
    const {
      data,
      catalog,
      catalogFull,
      cart,
      addToCartBtnHandler,
      cartRemoveOneStackHandler,
      cartRemoveWholeItemHandler,
      openCart,
    } = this.props;
    const {
      isFirstSectionActive,
      fullName,
      phone,
      email,
      isSubscribeActive,
      delivery,
      city,
      address,
      // postIndex,
      promo,
      promoObj,
      comment,
    } = this.state;

    if (typeof window !== 'undefined') {
      if (Object.keys(cart).length === 0) {
        navigate('/shop');
        return null;
      }
    }

    const universal = data.wpgraphql.universalPage.universal_page;
    const order = data.wpgraphql.orderPage.order_page;
    const { first, second, third } = order.deliveryWays;

    let prodList = [];
    if (promoObj.hasOwnProperty('type')) {
      const promoType = promoObj.type;
      const productIds = promoObj.product_ids;
      const excludeProductIds = promoObj.exclude_product_ids;
      const { amount } = promoObj;
      prodList = Object.entries(cart).map(([key, value]) => {
        const product = catalog.find(elem => elem.id === key);
        let isPromoApplied = false;
        let promoPrice = parseInt(product.price.slice(1), 10);
        if (!excludeProductIds.includes(product.productId)) {
          if (promoType === 'fixed_product') {
            if (productIds.includes(product.productId)) {
              isPromoApplied = true;
              promoPrice -= amount;
            }
          }

          if (promoType === 'percent') {
            if (productIds.length > 0) {
              if (productIds.includes(product.productId)) {
                isPromoApplied = true;
                promoPrice -= (promoPrice * amount) / 100;
              }
            }
          }
        }
        if (isPromoApplied) {
          return [promoPrice, value];
        }
        return [parseInt(product.price.slice(1), 10), value];
      });
    } else {
      prodList = Object.entries(cart).map(([key, value]) => [
        parseInt(catalog.find(elem => elem.id === key).price.slice(1), 10),
        value,
      ]);
    }

    let totalPrice = prodList.reduce(
      (prev, [price, quantity]) => prev + price * quantity,
      0
    );

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

    let deliveryPrice;
    if (delivery.value === 'first' && firstPaidDeliveryProductPrice) {
      if (
        (freeShippingId === 1 || first.minimalFreeDeliverySum) &&
        first.freeDeliveryProductId
      ) {
        if (freeShippingId === 1) {
          deliveryPrice = 0;
        } else if (totalPrice < first.minimalFreeDeliverySum) {
          deliveryPrice = firstPaidDeliveryProductPrice;
        } else {
          deliveryPrice = 0;
        }
      } else {
        deliveryPrice = firstPaidDeliveryProductPrice;
      }
    }
    if (delivery.value === 'second' && secondPaidDeliveryProductPrice) {
      if (
        (freeShippingId === 2 || second.minimalFreeDeliverySum) &&
        second.freeDeliveryProductId
      ) {
        if (freeShippingId === 2) {
          deliveryPrice = 0;
        } else if (totalPrice < second.minimalFreeDeliverySum) {
          deliveryPrice = secondPaidDeliveryProductPrice;
        } else {
          deliveryPrice = 0;
        }
      } else {
        deliveryPrice = secondPaidDeliveryProductPrice;
      }
    }
    if (delivery.value === 'third' && thirdPaidDeliveryProductPrice) {
      if (
        (freeShippingId === 3 || third.minimalFreeDeliverySum) &&
        third.freeDeliveryProductId
      ) {
        if (freeShippingId === 3) {
          deliveryPrice = 0;
        } else if (totalPrice < third.minimalFreeDeliverySum) {
          deliveryPrice = thirdPaidDeliveryProductPrice;
        } else {
          deliveryPrice = 0;
        }
      } else {
        deliveryPrice = thirdPaidDeliveryProductPrice;
      }
    }

    const totalPriceWithoutDeliveryAndPromo = totalPrice;
    const totalPriceWithoutPromo = totalPrice + deliveryPrice;

    let isPromoApplied = false;
    if (
      promoObj.hasOwnProperty('maximum_amount') &&
      promoObj.hasOwnProperty('minimum_amount')
    ) {
      if (
        (totalPrice + deliveryPrice < promoObj.maximum_amount ||
          promoObj.maximum_amount < 1) &&
        totalPrice + deliveryPrice >= promoObj.minimum_amount
      ) {
        if (promoObj.hasOwnProperty('type')) {
          const promoType = promoObj.type;
          const productIds = promoObj.product_ids;
          // const excludeProductIds = promoObj.exclude_product_ids;
          const { amount } = promoObj;

          if (promoType === 'fixed_cart') {
            isPromoApplied = true;
            totalPrice -= amount;
          }

          if (promoType === 'percent') {
            if (productIds.length <= 0) {
              isPromoApplied = true;
              totalPrice -= (totalPrice * amount) / 100;
            }
          }
        }
      }
    }

    totalPrice += deliveryPrice;

    const deliveryPriceStr = `${deliveryPrice} руб`;
    const totalPriceStr = `${totalPrice} руб`;
    const totalPriceWithoutDeliveryAndPromoStr = `${totalPriceWithoutDeliveryAndPromo} руб`;

    return (
      <Layout
        data={universal}
        cart={cart}
        // catalog={catalog}
        // addToCartBtnHandler={addToCartBtnHandler}
        // cartRemoveOneStackHandler={cartRemoveOneStackHandler}
        // cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
        openCart={openCart}
      >
        <SEO title="Оформление заказа" />

        <ContentWrapper>
          <SectionHeading text="Оформление заказа" isAlignedLeft isBig />
          <div styleName="content-wrapper">
            <main styleName="main">
              <FirstOrderSection
                isActive={isFirstSectionActive}
                fullName={fullName}
                fullNameOnChange={this.fullNameChangeHandler}
                phone={phone}
                phoneOnChange={this.phoneChangeHandler}
                email={email}
                emailOnChange={this.emailChangeHandler}
                isSubscribeActive={isSubscribeActive}
                isSubscribeActiveOnChange={this.isSubscribeActiveChangeHandler}
                nextOnClick={this.activateSecondSectionHandler}
                redactOnClick={this.activateFirstSectionHandler}
                submitForm={this.submitForm}
              />
              <SecondOrderSection
                isActive={!isFirstSectionActive}
                data={order}
                delivery={delivery}
                deliveryOnChange={this.deliveryChangeHandler}
                city={city}
                cityOnChange={this.cityChangeHandler}
                address={address}
                addressOnChange={this.addressChangeHandler}
                // postIndex={postIndex}
                // postIndexOnChange={this.postIndexChangeHandler}
                promo={promo}
                promoOnChange={this.promoChangeHandler}
                comment={comment}
                commentOnChange={this.commentChangeHandler}
                submitForm={this.submitForm}
                totalPriceWithoutDelivery={totalPriceWithoutDeliveryAndPromo}
                catalogFull={catalogFull}
                promoObj={promoObj}
                promoObjOnClick={this.promoObjClickHandler}
              />
            </main>
            <aside styleName="aside">
              <div styleName="aside-inner-wrapper">
                <div styleName="cart-list-wrapper">
                  <CartList
                    cart={cart}
                    catalog={catalog}
                    addToCartBtnHandler={addToCartBtnHandler}
                    cartRemoveOneStackHandler={cartRemoveOneStackHandler}
                    cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
                    isOrder
                    promoObj={promoObj}
                    totalPrice={totalPriceWithoutPromo}
                  />
                </div>
                <div
                  styleName={`delivery-price-wrapper ${
                    !isFirstSectionActive ? ' active' : ''
                  }`}
                >
                  <p styleName="delivery">
                    Доставка:
                    <span styleName="delivery-price">{deliveryPriceStr}</span>
                  </p>

                  <div styleName="delivery-price-line" />
                </div>
                <p styleName="total">
                  Итого:
                  <span
                    styleName={`total-price${
                      isPromoApplied ? ' total-price-promo' : ''
                    }`}
                  >
                    {isFirstSectionActive
                      ? totalPriceWithoutDeliveryAndPromoStr
                      : totalPriceStr}
                  </span>
                </p>

                <Button
                  isAction
                  isTextBlack
                  onClick={this.submitForm}
                  styleName={`submit-btn ${
                    isFirstSectionActive ? 'submit-btn-inactive' : ''
                  }`}
                >
                  Подтвердить заказ
                </Button>
              </div>
            </aside>
          </div>
        </ContentWrapper>
      </Layout>
    );
  }
}

OrderPage.propTypes = {
  data: PropTypes.shape().isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  catalogFull: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  closeCart: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default OrderPage;

export const query = graphql`
  query orderQuery {
    wpgraphql {
      universalPage: page(id: "cGFnZToyMDg=") {
        universal_page {
          copyright
          inn
          instaLink
          orgn
          ooo
          phone
          city
        }
      }
      orderPage: page(id: "cGFnZTo0NjI=") {
        order_page {
          deliveryWays {
            first {
              heading
              description
              price
              paidDeliveryProductId
              freeDeliveryProductId
              minimalFreeDeliverySum
            }
            second {
              heading
              description
              price
              paidDeliveryProductId
              freeDeliveryProductId
              minimalFreeDeliverySum
            }
            third {
              heading
              description
              price
              paidDeliveryProductId
              freeDeliveryProductId
              minimalFreeDeliverySum
            }
          }
          paymentInstruction
        }
      }
    }
  }
`;
