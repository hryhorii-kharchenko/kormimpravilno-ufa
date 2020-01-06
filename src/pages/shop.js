import React, { Component } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TopShopSection from '../components/TopShopSection';
import MainShopSection from '../components/MainShopSection';

class ShopPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSort: 0,
      possibleSort: [
        { value: 0, label: 'По умолчанию' },
        { value: 1, label: 'По названию' },
        { value: 2, label: 'Последнее' },
        { value: 3, label: 'Низкие цены' },
        { value: 4, label: 'Высокие цены' },
        { value: 5, label: 'Низкий вес' },
        { value: 6, label: 'Высокий вес' },
      ],
      localCatalog: [...props.catalog].sort(
        (a, b) => b.productId - a.productId
      ),
    };

    this.sortChangeHandler = this.sortChangeHandler.bind(this);
  }

  sortChangeHandler(newSortId) {
    this.setState(state => {
      let sortFunc;

      switch (newSortId) {
        case 0:
          sortFunc = function(a, b) {
            return b.productId - a.productId;
          };
          break;
        case 1:
          sortFunc = function(a, b) {
            return a.product_post.productName.localeCompare(
              b.product_post.productName
            );
          };
          break;
        case 2:
          sortFunc = function(a, b) {
            return b.productId - a.productId;
          };
          break;
        case 3:
          sortFunc = function(a, b) {
            return (
              parseInt(a.price.slice(1).replace(/\./g, ''), 10) -
              parseInt(b.price.slice(1).replace(/\./g, ''), 10)
            );
          };
          break;
        case 4:
          sortFunc = function(a, b) {
            return (
              parseInt(b.price.slice(1).replace(/\./g, ''), 10) -
              parseInt(a.price.slice(1).replace(/\./g, ''), 10)
            );
          };
          break;
        case 5:
          sortFunc = function(a, b) {
            return (
              parseInt(a.product_post.weight, 10) -
              parseInt(b.product_post.weight, 10)
            );
          };
          break;
        case 6:
          sortFunc = function(a, b) {
            return (
              parseInt(b.product_post.weight, 10) -
              parseInt(a.product_post.weight, 10)
            );
          };
          break;
        default:
          sortFunc = function(a, b) {
            return b.productId - a.productId;
          };
          break;
      }

      return {
        currentSort: newSortId,
        localCatalog: [...state.localCatalog].sort(sortFunc),
      };
    });
  }

  render() {
    const {
      data,
      catalog,
      cart,
      addToCartBtnHandler,
      cartRemoveOneStackHandler,
      cartRemoveWholeItemHandler,
      location,
    } = this.props;
    const { currentSort, possibleSort, localCatalog } = this.state;

    const universal = data.wpgraphql.universalPage.universal_page;

    return (
      <Layout
        data={universal}
        cart={cart}
        catalog={catalog}
        addToCartBtnHandler={addToCartBtnHandler}
        cartRemoveOneStackHandler={cartRemoveOneStackHandler}
        cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
      >
        <SEO title="Магазин" />

        <TopShopSection
          pageTitle="Магазин"
          pathname={location.pathname}
          currentSort={currentSort}
          possibleSort={possibleSort}
          onSortChange={this.sortChangeHandler}
        />
        <MainShopSection
          catalog={localCatalog}
          addToCartBtnHandler={addToCartBtnHandler}
        />
      </Layout>
    );
  }
}

ShopPage.propTypes = {
  data: PropTypes.shape().isRequired,
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  cart: PropTypes.shape().isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  cartRemoveOneStackHandler: PropTypes.func.isRequired,
  cartRemoveWholeItemHandler: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ShopPage;

export const query = graphql`
  query shopQuery {
    wpgraphql {
      universalPage: page(id: "cGFnZToyMDg=") {
        universal_page {
          copyright
          inn
          instaLink
          orgn
          ooo
          phone
        }
      }
    }
  }
`;
