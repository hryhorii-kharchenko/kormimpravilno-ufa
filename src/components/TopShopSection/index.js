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
  isSortPickerOpen,
  sortPickerOpenHandler,
  sortPickerCloseHandler,
  onSortChange,
  currentCategory,
  possibleCategory,
  isCategoryPickerOpen,
  categoryPickerOpenHandler,
  categoryPickerCloseHandler,
  onCategoryChange,
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
          <div styleName="sorting-wrapper">
            <Sorting
              text="Категория"
              currentSort={currentCategory}
              possibleSort={possibleCategory}
              onSortChange={onCategoryChange}
              isOpen={isCategoryPickerOpen}
              openHandler={categoryPickerOpenHandler}
              closeHandler={categoryPickerCloseHandler}
              styleName="category"
            />

            <div styleName="divider" />

            <Sorting
              text="Сортировать"
              currentSort={currentSort}
              possibleSort={possibleSort}
              onSortChange={onSortChange}
              isOpen={isSortPickerOpen}
              openHandler={sortPickerOpenHandler}
              closeHandler={sortPickerCloseHandler}
              styleName="sorting"
            />
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

TopShopSection.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  currentSort: PropTypes.number.isRequired,
  possibleSort: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isSortPickerOpen: PropTypes.bool.isRequired,
  sortPickerOpenHandler: PropTypes.func.isRequired,
  sortPickerCloseHandler: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  currentCategory: PropTypes.number.isRequired,
  possibleCategory: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isCategoryPickerOpen: PropTypes.bool.isRequired,
  categoryPickerOpenHandler: PropTypes.func.isRequired,
  categoryPickerCloseHandler: PropTypes.func.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default TopShopSection;
