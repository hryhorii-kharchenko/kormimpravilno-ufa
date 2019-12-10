import React from 'react';
import PropTypes from 'prop-types';

function CityPicker({ cities }) {
  const citiesMapped = cities.map(city => (
    <option value={city.toLowerCase()} key={city}>
      {city}
    </option>
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
