import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../ContentWrapper';
import SecondaryBanner from '../SecondaryBanner';
import Sorting from '../Sorting';

import './TopShopSection.module.css';

function TopShopSection({
  pageTitle,
  pathname,
  currentSort,
  possibleSort,
  onSortChange,
}) {
  return (
    <section styleName="TopShopSection" id="top">
      <ContentWrapper>
        <div styleName="content-wrapper">
          <SecondaryBanner
            pageTitle={pageTitle}
            isAlignedLeft
            pathname={pathname}
          />
          <Sorting
            currentSort={currentSort}
            possibleSort={possibleSort}
            onSortChange={onSortChange}
            styleName="sorting"
          />
        </div>
      </ContentWrapper>
    </section>
  );
}

TopShopSection.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  currentSort: PropTypes.number.isRequired,
  possibleSort: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default TopShopSection;
