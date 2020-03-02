import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CatalogProvider({
  children,
  shopId,
  catalogFull,
  cart,
  openCart,
  closeCart,
  addToCartBtnHandler,
  cartRemoveOneStackHandler,
  cartRemoveWholeItemHandler,
  openCityModal,
  clearCart,
}) {
  const [availableProducts, setAvailableProducts] = useState(null);
  useEffect(() => {
    fetch(
      `https://spb.wpkormimpravilno.ru/wp-json/kormimpravilno/v1/available_products/${shopId.toString()}`,
      {
        method: 'GET',
      }
    )
      .then(response => {
        if (response.ok) return response.json();
        alert('error response not ok');
        return null;
      })
      .then(json => {
        setAvailableProducts(JSON.parse(json));
      })
      .catch(error => console.error(error));
  }, []);

  let catalog = catalogFull;
  if (availableProducts) {
    catalog = Object.values(availableProducts).map(({ ingredient_id }) =>
      catalogFull.find(elem => elem.product_post.posterId === ingredient_id)
    );

    catalog = catalog.filter(elem => elem !== undefined);
  }

  return (
    <>
      {React.cloneElement(children, {
        cart,
        catalog,
        catalogFull,
        openCart,
        closeCart,
        addToCartBtnHandler,
        cartRemoveOneStackHandler,
        cartRemoveWholeItemHandler,
        openCityModal,
        shopId,
        clearCart,
      })}
    </>
  );
}

CatalogProvider.propTypes = {
  children: PropTypes.element.isRequired,
  shopId: PropTypes.number.isRequired,
  catalogFull: PropTypes.shape().isRequired,
};

export default CatalogProvider;
