import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

import AriaModal from 'react-aria-modal';

import CatalogProvider from '../CatalogProvider';
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
      shopId: 1,
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
        window.sessionStorage.setItem('cart', JSON.stringify(cart));
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
        window.sessionStorage.setItem('cart', JSON.stringify(cart));
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
        window.sessionStorage.setItem('cart', JSON.stringify(cart));
      }
    );
  }

  clearCart() {
    this.setState({ cart: [] });
    window.sessionStorage.clear('cart');
  }

  render() {
    const { children } = this.props;
    const { cart, shopId, isCartActive } = this.state;
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
                    posterId
                    composition
                    weight
                    cooking
                    nutrition
                    info
                    similar {
                      first
                      second
                      third
                      fourth
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
            } else if (!products[i].imageSmall.imageFile) {
              products[i].imageSmall.imageFile = data.defaultImageSmall;
              products[i].imageFull.imageFile = data.defaultImageFull;
            }
            if (products[i].slug[0] !== '/') {
              products[i].slug = `/${products[i].slug}`;
            }
            if (products[i].price) {
              products[i].price = products[i].price.replace(/\./g, '');
            } else {
              products[i].price = '₽0,00';
            }
          }

          const catalogFull = products.sort(
            // (a, b) => new Date(b.modified) - new Date(a.modified)
            (a, b) => a.productId - b.productId
          );
          // let catalog = catalogFull;

          // fetch(
          //   'https://kormimpravilno.loc/wp-json/kormimpravilno/v1/available_products/1',
          //   {
          //     method: 'GET',
          //   }
          // )
          //   .then(response => {
          //     if (response.ok) return response.json();
          //     alert('error response not ok');
          //     return null;
          //   })
          //   .then(json => {
          //     const obj = JSON.parse(json);
          //     catalog = Object.values(obj).map(({ ingredient_id }) =>
          //       catalogFull.find(
          //         elem => elem.product_post.posterId === ingredient_id
          //       )
          //     );
          //   })
          //   .catch(error => console.error(error));

          // const obj = JSON.parse(
          //   '{"0":{"ingredient_id":"71","storage_ingredient_left":"10.0000000"},"1":{"ingredient_id":"72","storage_ingredient_left":"10.0000000"},"2":{"ingredient_id":"1","storage_ingredient_left":"1.0000000"},"3":{"ingredient_id":"2","storage_ingredient_left":"7.0000000"},"4":{"ingredient_id":"69","storage_ingredient_left":"7.0000000"},"5":{"ingredient_id":"73","storage_ingredient_left":"-6.0000000"},"6":{"ingredient_id":"4","storage_ingredient_left":"22.0000000"},"7":{"ingredient_id":"5","storage_ingredient_left":"4.0000000"},"8":{"ingredient_id":"7","storage_ingredient_left":"18.0000000"},"9":{"ingredient_id":"56","storage_ingredient_left":"4.0000000"},"10":{"ingredient_id":"15","storage_ingredient_left":"6.0000000"},"11":{"ingredient_id":"65","storage_ingredient_left":"-13.0000000"},"12":{"ingredient_id":"8","storage_ingredient_left":"-17.0000000"},"13":{"ingredient_id":"9","storage_ingredient_left":"-14.0000000"},"14":{"ingredient_id":"10","storage_ingredient_left":"14.0000000"},"16":{"ingredient_id":"55","storage_ingredient_left":"10.0000000"},"17":{"ingredient_id":"13","storage_ingredient_left":"10.0000000"},"18":{"ingredient_id":"75","storage_ingredient_left":"28.0000000"},"19":{"ingredient_id":"58","storage_ingredient_left":"-18.0000000"},"20":{"ingredient_id":"16","storage_ingredient_left":"4.0000000"},"21":{"ingredient_id":"17","storage_ingredient_left":"-1.0000000"},"22":{"ingredient_id":"19","storage_ingredient_left":"12.0000000"},"23":{"ingredient_id":"74","storage_ingredient_left":"5.0000000"},"24":{"ingredient_id":"18","storage_ingredient_left":"19.0000000"},"25":{"ingredient_id":"20","storage_ingredient_left":"-2.0000000"},"26":{"ingredient_id":"21","storage_ingredient_left":"-11.0000000"},"27":{"ingredient_id":"22","storage_ingredient_left":"2.0000000"},"28":{"ingredient_id":"23","storage_ingredient_left":"8.0000000"},"29":{"ingredient_id":"77","storage_ingredient_left":"8.0000000"},"30":{"ingredient_id":"78","storage_ingredient_left":"3.0000000"},"31":{"ingredient_id":"70","storage_ingredient_left":"1.0000000"},"32":{"ingredient_id":"24","storage_ingredient_left":"-1.0000000"},"34":{"ingredient_id":"26","storage_ingredient_left":"-7.0000000"},"36":{"ingredient_id":"28","storage_ingredient_left":"3.0000000"},"38":{"ingredient_id":"79","storage_ingredient_left":"-7.0000000"},"39":{"ingredient_id":"30","storage_ingredient_left":"-14.0000000"},"41":{"ingredient_id":"32","storage_ingredient_left":"4.0000000"},"42":{"ingredient_id":"33","storage_ingredient_left":"2.0000000"},"43":{"ingredient_id":"34","storage_ingredient_left":"-1.0000000"},"44":{"ingredient_id":"35","storage_ingredient_left":"6.0000000"},"45":{"ingredient_id":"12","storage_ingredient_left":"1.0000000"},"46":{"ingredient_id":"67","storage_ingredient_left":"-19.0000000"},"47":{"ingredient_id":"36","storage_ingredient_left":"-15.0000000"},"48":{"ingredient_id":"37","storage_ingredient_left":"-21.0000000"},"57":{"ingredient_id":"46","storage_ingredient_left":"1.0000000"},"58":{"ingredient_id":"47","storage_ingredient_left":"6.0000000"},"59":{"ingredient_id":"48","storage_ingredient_left":"4.0000000"},"61":{"ingredient_id":"49","storage_ingredient_left":"7.0000000"},"62":{"ingredient_id":"66","storage_ingredient_left":"-8.0000000"},"63":{"ingredient_id":"50","storage_ingredient_left":"-4.0000000"},"64":{"ingredient_id":"51","storage_ingredient_left":"7.0000000"},"65":{"ingredient_id":"52","storage_ingredient_left":"5.0000000"},"66":{"ingredient_id":"53","storage_ingredient_left":"2.0000000"},"67":{"ingredient_id":"54","storage_ingredient_left":"9.0000000"},"68":{"ingredient_id":"76","storage_ingredient_left":"-62.0000000"},"75":{"ingredient_id":"14","storage_ingredient_left":"-10.0000000"}}'
          // );
          // const catalog = Object.values(obj).map(({ ingredient_id }) =>
          //   catalogFull.find(
          //     elem => elem.product_post.posterId === ingredient_id
          //   )
          // );

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
                  catalog={catalogFull}
                  addToCartBtnHandler={addToCartBtnHandler}
                  cartRemoveOneStackHandler={cartRemoveOneStackHandler}
                  cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
                />
              </div>
            </AriaModal>
          ) : null;

          return (
            <>
              <CatalogProvider
                catalogFull={catalogFull}
                shopId={shopId}
                cart={structuredCart}
                openCart={openCart}
                closeCart={closeCart}
                addToCartBtnHandler={addToCartBtnHandler}
                cartRemoveOneStackHandler={cartRemoveOneStackHandler}
                cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
              >
                {/* {React.cloneElement(children, {
                cart: structuredCart,
                // catalog,
                catalogFull,
                openCart,
                closeCart,
                addToCartBtnHandler,
                cartRemoveOneStackHandler,
                cartRemoveWholeItemHandler,
                shopId,
              })} */}
                {children}
              </CatalogProvider>
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
