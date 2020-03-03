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
    this.commentChangeHandler = this.commentChangeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    const { closeCart } = this.props;
    closeCart();
  }

  submitForm(e) {
    e.preventDefault();
    const { cart, catalog } = this.props;

    this.validatePage();

    setTimeout(() => {
      const {
        fullName,
        phone,
        email,
        city,
        address,
        delivery,
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
        const promoForm = document.getElementById('promo-form');
        const commentForm = document.getElementById('comment-form');

        const firstFormData = new FormData(firstForm);
        const secondFormData = new FormData(secondForm);
        const promoFormData = new FormData(promoForm);
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
        Array.from(promoFormData).forEach(([name, value]) => {
          firstFormData.set(name, value);
        });

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

        if (delivery.value === 'first') {
          if (totalPrice < 5000) {
            lineItems.push({
              product_id: 1381,
              quantity: 1,
            });
          } else {
            lineItems.push({
              product_id: 1379,
              quantity: 1,
            });
          }
        }

        if (delivery.value === 'second')
          lineItems.push({
            product_id: 1383,
            quantity: 1,
          });

        firstFormData.set('line_items', JSON.stringify(lineItems));

        const object = {};
        firstFormData.forEach((value, key) => {
          object[key] = value;
        });
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
          'https://ufa.wpkormimpravilno.ru/wp-json/kormimpravilno/v1/order',
          {
            method: 'POST',
            body: json,
          }
        )
          .then(response => {
            if (response.ok) return response.text();
            alert('error response not ok');
            return null;
          })
          .then(url => {
            if (/http/.test(url)) {
              // window.sessionStorage.clear('cart');
              const href = url.substring(1, url.length - 1);
              window.location.href = href;
            } else {
              alert('error not url');
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
    const regExp = /^([А-ЯA-Z][а-яa-z]+\s*){2}/;
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

    const prodList = Object.entries(cart).map(([key, value]) => [
      catalog.find(elem => elem.id === key).price,
      value,
    ]);

    let totalPrice = prodList.reduce(
      (prev, [price, quantity]) =>
        prev + parseInt(price.slice(1), 10) * quantity,
      0
    );

    const totalPriceWithoutDelivery = totalPrice;

    let deliveryPrice;
    if (delivery.value === 'first') {
      if (totalPrice < 5000) {
        deliveryPrice = order.deliveryWays.first.price;
      } else {
        deliveryPrice = 0;
      }
    }
    if (delivery.value === 'second') {
      deliveryPrice = order.deliveryWays.second.price;
    }
    if (delivery.value === 'third') {
      deliveryPrice = order.deliveryWays.third.price;
    }

    totalPrice += deliveryPrice;

    const deliveryPriceStr = `${deliveryPrice} руб`;
    const totalPriceStr = `${totalPrice} руб`;
    const totalPriceWithoutDeliveryStr = `${totalPriceWithoutDelivery} руб`;

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
                totalPriceWithoutDelivery={totalPriceWithoutDelivery}
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
                  <span styleName="total-price">
                    {isFirstSectionActive
                      ? totalPriceWithoutDeliveryStr
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
              description
              heading
              price
            }
            second {
              description
              heading
              price
            }
            third {
              description
              heading
              price
            }
          }
          paymentInstruction
        }
      }
    }
  }
`;
