import React, { Component } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

class ShopProvider extends Component {
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

    return (
      <StaticQuery
        query={graphql`
          query CatalogQuery {
            wpgraphql {
              products {
                nodes {
                  product_post {
                    productName
                    composition
                    weight
                    cooking
                    nutrition
                    similar {
                      first
                      second
                      third
                    }
                  }
                  ... on WPGraphQL_SimpleProduct {
                    price
                    productId
                    id
                    image {
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
                  }
                }
              }
            }
          }
        `}
        render={data => {
          return React.cloneElement(children, {
            cart: structuredCart,
            catalog: data.wpgraphql.products.nodes,
            addToCartBtnHandler,
            cartRemoveOneItemHandler,
            cartRemoveAllItemsHandler,
          });
        }}
      />
    );
  }
}

ShopProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ShopProvider;
