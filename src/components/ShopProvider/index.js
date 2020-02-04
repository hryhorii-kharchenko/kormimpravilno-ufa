import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import AriaModal from 'react-aria-modal';

import Cart from '../Cart';

import './ShopProvider.module.css';

class ShopProvider extends Component {
  constructor(props) {
    super(props);

    let cart = [];
    if (typeof window !== 'undefined') {
      cart = JSON.parse(window.localStorage.getItem('cart')) || [];
    }

    this.state = {
      cart,
      isCartActive: false,
    };

    this.openCart = this.openCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
    this.addToCartBtnHandler = this.addToCartBtnHandler.bind(this);
    this.cartRemoveOneStackHandler = this.cartRemoveOneStackHandler.bind(this);
    this.cartRemoveWholeItemHandler = this.cartRemoveWholeItemHandler.bind(
      this
    );
  }

  // componentDidMount() {
  //   this.state = { cart: window.localStorage.getItem('cart') || [] };
  // }

  openCart() {
    this.setState({ isCartActive: true });
  }

  closeCart() {
    this.setState({ isCartActive: false });
  }

  addToCartBtnHandler(id, amount) {
    this.addItemToCart(id, amount);
  }

  cartRemoveOneStackHandler(id) {
    this.removeOneStackOfItemFromCart(id);
  }

  cartRemoveWholeItemHandler(id) {
    this.removeAllStacksOfItemFromCart(id);
  }

  addItemToCart(id, amount) {
    this.setState(
      state => ({
        cart: [...state.cart, ...Array(amount).fill(id)],
      }),
      () => {
        const { cart } = this.state;
        window.localStorage.setItem('cart', JSON.stringify(cart));
      }
    );
  }

  removeOneStackOfItemFromCart(id) {
    this.setState(
      ({ cart }) => {
        const removeElement = cart.indexOf(id);
        const newCart = [
          ...cart.slice(0, removeElement),
          ...cart.slice(removeElement + 1),
        ];

        return { cart: newCart };
      },
      () => {
        const { cart } = this.state;
        window.localStorage.setItem('cart', JSON.stringify(cart));
      }
    );
  }

  removeAllStacksOfItemFromCart(id) {
    this.setState(
      state => ({
        cart: state.cart.filter(productId => productId !== id),
      }),
      () => {
        const { cart } = this.state;
        window.localStorage.setItem('cart', JSON.stringify(cart));
      }
    );
  }

  clearCart() {
    this.setState({ cart: [] });
    window.localStorage.clear();
  }

  render() {
    const { children } = this.props;
    const { cart, isCartActive } = this.state;
    const {
      openCart,
      closeCart,
      addToCartBtnHandler,
      cartRemoveOneStackHandler,
      cartRemoveWholeItemHandler,
    } = this;
    const structuredCart = {};

    cart.forEach(x => {
      structuredCart[x] = (structuredCart[x] || 0) + 1;
    });

    return (
      <StaticQuery
        query={graphql`
          query CatalogQuery {
            wpgraphql {
              products(first: 100) {
                nodes {
                  product_post {
                    productName
                    composition
                    weight
                    cooking
                    nutrition
                    info
                    similar {
                      first
                      second
                      third
                    }
                  }
                  categories {
                    nodes {
                      slug
                    }
                  }
                  ... on WPGraphQL_SimpleProduct {
                    price
                    productId
                    id
                    slug
                    modified
                    imageSmall: image {
                      sourceUrl
                      mediaItemId
                      modified
                      imageFile {
                        childImageSharp {
                          fluid(maxWidth: 385, maxHeight: 350) {
                            base64
                            aspectRatio
                            src
                            srcSet
                            sizes
                          }
                        }
                      }
                    }
                    imageFull: image {
                      sourceUrl
                      mediaItemId
                      modified
                      imageFile {
                        childImageSharp {
                          fluid(maxWidth: 556, maxHeight: 504) {
                            base64
                            aspectRatio
                            src
                            srcSet
                            sizes
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            defaultImageSmall: file(relativePath: { eq: "placeholder.png" }) {
              childImageSharp {
                fluid(maxWidth: 385, maxHeight: 350) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
            defaultImageFull: file(relativePath: { eq: "placeholder.png" }) {
              childImageSharp {
                fluid(maxWidth: 556, maxHeight: 504) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        `}
        render={dataParam => {
          const data = dataParam;
          const products = data.wpgraphql.products.nodes;

          for (let i = 0; i < products.length; i += 1) {
            if (!products[i].imageSmall) {
              products[i].imageSmall = {};
              products[i].imageFull = {};
              products[i].imageSmall.imageFile = data.defaultImageSmall;
              products[i].imageFull.imageFile = data.defaultImageFull;
            }
            if (products[i].slug[0] !== '/') {
              products[i].slug = `/${products[i].slug}`;
            }
            products[i].price = products[i].price.replace(/\./g, '');
          }

          const catalog = products.sort(
            // (a, b) => new Date(b.modified) - new Date(a.modified)
            (a, b) => b.productId - a.productId
          );

          const cartModal = isCartActive ? (
            <AriaModal
              titleText="Корзина"
              onExit={closeCart}
              getApplicationNode={() => {
                return document.getElementById('___gatsby');
              }}
              underlayStyle={{ background: 'rgba(0, 0, 0, 0.63)' }}
              verticallyCenter
              dialogStyle={{
                maxWidth: '857px',
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <div id="cart-modal" styleName="cart-modal">
                <Cart
                  closeCart={closeCart}
                  cart={structuredCart}
                  catalog={catalog}
                  addToCartBtnHandler={addToCartBtnHandler}
                  cartRemoveOneStackHandler={cartRemoveOneStackHandler}
                  cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
                />
              </div>
            </AriaModal>
          ) : null;

          function idToProductId(id) {
            const product = products.reduce(prod => prod.id === id);
            return product.productId;
          }

          return (
            <>
              {React.cloneElement(children, {
                cart: structuredCart,
                catalog,
                openCart,
                closeCart,
                addToCartBtnHandler,
                cartRemoveOneStackHandler,
                cartRemoveWholeItemHandler,
                idToProductId,
              })}
              {cartModal}
            </>
          );
        }}
      />
    );
  }
}

ShopProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ShopProvider;
