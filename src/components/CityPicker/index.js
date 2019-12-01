import React from 'react';
import PropTypes from 'prop-types';

function CityPicker({ cities }) {
  const citiesMapped = cities.map(city => (
    <option value={city.name.toLowercase()}>{city.name.toLowercase()}</option>
  ));

  return (
    <select name="Город:" id="москва" className="CityPicker">
      {citiesMapped}
    </select>
  );
}

CityPicker.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CityPicker;
