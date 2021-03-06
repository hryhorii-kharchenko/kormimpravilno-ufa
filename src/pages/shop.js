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
      allSortFunc: [
        (a, b) => {
          const aId = a.product_post.defaultSortingId;
          const bId = b.product_post.defaultSortingId;
          if (aId && bId) {
            return aId - bId;
          }
          if (aId) {
            return -1;
          }
          if (bId) {
            return 1;
          }
          return b.productId - a.productId;
        },
        (a, b) => {
          return a.product_post.productName.localeCompare(
            b.product_post.productName
          );
        },
        (a, b) => {
          return b.productId - a.productId;
        },
        (a, b) => {
          return (
            parseInt(a.price.slice(1), 10) - parseInt(b.price.slice(1), 10)
          );
        },
        (a, b) => {
          return (
            parseInt(b.price.slice(1), 10) - parseInt(a.price.slice(1), 10)
          );
        },
        (a, b) => {
          return (
            parseInt(a.product_post.weight, 10) -
            parseInt(b.product_post.weight, 10)
          );
        },
        (a, b) => {
          return (
            parseInt(b.product_post.weight, 10) -
            parseInt(a.product_post.weight, 10)
          );
        },
      ],
      currentCategory: 0,
      possibleCategory: [
        { value: 0, label: 'Все товары', slug: '' },
        { value: 1, label: 'Мясные продукты', slug: 'rublennye' },
        { value: 2, label: 'Пельмени и вареники', slug: 'pelmeni' },
        { value: 3, label: 'Выпечка', slug: 'vypechka' },
        { value: 4, label: 'Конфеты', slug: 'konfety' },
        // { value: 5, label: 'Фарш функциональный', slug: 'farsh' },
        { value: 6, label: 'Сертификаты, книги', slug: 'books' },
        // { value: 7, label: 'Сыры, шоколад, вода', slug: 'cheese' },
        // { value: 8, label: 'Упаковка', slug: 'package' },
        { value: 9, label: 'Балаклея', slug: 'other' },
        { value: 10, label: 'Чай', slug: 'tea' },
      ],
      // localCatalog: [...props.catalog],
      isCategoryPickerOpen: false,
      isSortPickerOpen: false,
    };

    this.allFilterFunc = this.allFilterFunc.bind(this);
    this.sortChangeHandler = this.sortChangeHandler.bind(this);
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    this.categoryPickerOpenHandler = this.categoryPickerOpenHandler.bind(this);
    this.categoryPickerCloseHandler = this.categoryPickerCloseHandler.bind(
      this
    );
    this.sortPickerOpenHandler = this.sortPickerOpenHandler.bind(this);
    this.sortPickerCloseHandler = this.sortPickerCloseHandler.bind(this);
  }

  allFilterFunc(id) {
    const { possibleCategory } = this.state;
    const category = possibleCategory.find(elem => elem.value === id);

    if (id === 0) {
      return () => true;
    }

    return elem => {
      return elem.categories.nodes[0].slug === category.slug;
    };
  }

  categoryPickerOpenHandler() {
    this.setState(() => {
      return { isCategoryPickerOpen: true };
    });
  }

  categoryPickerCloseHandler() {
    this.setState(() => {
      return { isCategoryPickerOpen: false };
    });
  }

  sortPickerOpenHandler() {
    this.setState(() => {
      return { isSortPickerOpen: true };
    });
  }

  sortPickerCloseHandler() {
    this.setState(() => {
      return { isSortPickerOpen: false };
    });
  }

  sortChangeHandler(newSortId) {
    this.setState(state => {
      // const sortFunc = state.allSortFunc[newSortId];

      return {
        currentSort: newSortId,
        // localCatalog: [...state.localCatalog].sort(sortFunc),
      };
    });
  }

  categoryChangeHandler(newCategoryId) {
    this.setState(state => {
      // const { catalog } = this.props;
      // const filterFunc = state.allFilterFunc[newCategoryId];
      // const sortFunc = state.allSortFunc[state.currentSort];

      return {
        currentCategory: newCategoryId,
        // localCatalog: [...catalog].filter(filterFunc).sort(sortFunc),
      };
    });
  }

  render() {
    const {
      data,
      cart,
      catalog,
      addToCartBtnHandler,
      openCart,
      location,
    } = this.props;
    const {
      currentSort,
      possibleSort,
      isSortPickerOpen,
      currentCategory,
      possibleCategory,
      isCategoryPickerOpen,
      // localCatalog,
      // allFilterFunc,
      allSortFunc,
    } = this.state;

    const universal = data.wpgraphql.universalPage.universal_page;

    const filterFunc = this.allFilterFunc(currentCategory);
    const sortFunc = allSortFunc[currentSort];
    const newCatalog = [...catalog].filter(filterFunc).sort(sortFunc);

    return (
      <Layout
        data={universal}
        cart={cart}
        // catalog={catalog}
        // addToCartBtnHandler={addToCartBtnHandler}localCatalog
        // cartRemoveOneStackHandler={cartRemoveOneStackHandler}
        // cartRemoveWholeItemHandler={cartRemoveWholeItemHandler}
        openCart={openCart}
      >
        <SEO title="Магазин" />

        <TopShopSection
          pageTitle="Магазин"
          pathname={location.pathname}
          currentSort={currentSort}
          possibleSort={possibleSort}
          isSortPickerOpen={isSortPickerOpen}
          sortPickerOpenHandler={this.sortPickerOpenHandler}
          sortPickerCloseHandler={this.sortPickerCloseHandler}
          onSortChange={this.sortChangeHandler}
          currentCategory={currentCategory}
          possibleCategory={possibleCategory}
          isCategoryPickerOpen={isCategoryPickerOpen}
          categoryPickerOpenHandler={this.categoryPickerOpenHandler}
          categoryPickerCloseHandler={this.categoryPickerCloseHandler}
          onCategoryChange={this.categoryChangeHandler}
        />
        <MainShopSection
          catalog={newCatalog}
          addToCartBtnHandler={addToCartBtnHandler}
          openCart={openCart}
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
  openCart: PropTypes.func.isRequired,
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
          city
        }
      }
    }
  }
`;
