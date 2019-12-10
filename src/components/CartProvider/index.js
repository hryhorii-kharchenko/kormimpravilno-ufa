import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };

    this.addToCartBtnHandler = this.addToCartBtnHandler.bind(this);
    this.cartRemoveOneItemHandler = this.cartRemoveOneItemHandler.bind(this);
    this.cartRemoveAllItemsHandler = this.cartRemoveAllItemsHandler.bind(this);
  }

  addToCartBtnHandler(id, amount) {
    this.addItemToCart(id, amount);
  }

  cartRemoveOneItemHandler(id) {
    this.removeOneItemFromCart(id);
  }

  cartRemoveAllItemsHandler(id) {
    this.removeAllItemsFromCart(id);
  }

  addItemToCart(id, amount) {
    this.setState(state => ({
      cart: [...state.cart, ...Array(amount).fill(id)],
    }));
  }

  removeOneItemFromCart(id) {
    this.setState(({ cart }) => {
      const removeElement = cart.indexOf(id);
      const newCart = [
        ...cart.slice(0, removeElement),
        ...cart.slice(removeElement + 1),
      ];

      return { cart: newCart };
    });
  }

  removeAllItemsFromCart(id) {
    this.setState(state => ({
      cart: state.cart.filter(productId => productId !== id),
    }));
  }

  clearCart() {
    this.setState({ cart: [] });
  }

  render() {
    const { children } = this.props;
    const { cart } = this.state;
    const {
      addToCartBtnHandler,
      cartRemoveOneItemHandler,
      cartRemoveAllItemsHandler,
    } = this;
    const structuredCart = {};

    cart.forEach(x => {
      structuredCart[x] = (structuredCart[x] || 0) + 1;
    });

    return React.cloneElement(children, {
      cart: structuredCart,
      addToCartBtnHandler,
      cartRemoveOneItemHandler,
      cartRemoveAllItemsHandler,
    });
  }
}

CartProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CartProvider;
