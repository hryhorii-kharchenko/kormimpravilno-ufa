import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../ContentWrapper';
import ProductGallery from '../ProductGallery';
import Pagination from '../Pagination';

import './MainShopSection.module.css';

class MainShopSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productsOnPage: 12,
      currentPage: 1,
    };

    this.currentPageSetter = this.currentPageSetter.bind(this);
  }

  currentPageSetter(value) {
    this.setState(() => ({
      currentPage: value,
    }));
  }

  render() {
    const { catalog, addToCartBtnHandler, openCart } = this.props;
    const { currentPage, productsOnPage } = this.state;

    const currentPageProducts = catalog.slice(
      (currentPage - 1) * productsOnPage,
      currentPage * productsOnPage
    );

    return (
      <section styleName="MainShopSection" id="shop">
        <ContentWrapper>
          <ProductGallery
            products={currentPageProducts}
            catalog={currentPageProducts}
            onClick={addToCartBtnHandler}
            openCart={openCart}
            isShop
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(catalog.length / productsOnPage)}
            setCurrentPage={this.currentPageSetter}
          />
        </ContentWrapper>
      </section>
    );
  }
}

MainShopSection.propTypes = {
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addToCartBtnHandler: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
};

export default MainShopSection;
