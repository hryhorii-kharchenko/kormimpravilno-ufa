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
      productsOnPage: 9,
      currentPage: 0,
    };
  }

  render() {
    const { catalog } = this.props;
    const { currentPage, productsOnPage } = this.state;

    const currentPageProducts = catalog.slice(
      currentPage * productsOnPage,
      (currentPage + 1) * productsOnPage
    );

    return (
      <section styleName="MainShopSection" id="shop">
        <ContentWrapper>
          <ProductGallery products={currentPageProducts} />
          <Pagination
            currentPage={currentPage + 1}
            totalPages={Math.ceil(catalog.length / productsOnPage)}
          />
        </ContentWrapper>
      </section>
    );
  }
}

MainShopSection.propTypes = {
  catalog: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MainShopSection;
