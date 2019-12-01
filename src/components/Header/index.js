import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Menu from '../Menu';
import Logo from '../Logo';
import Wrapper from '../Wrapper';
import CityPicker from '../CityPicker/CityPicker';
import Button from '../Button';

const Header = ({ siteTitle }) => (
  <header>
    {/* <Menu items={} /> */}

    {/* <Logo src={} /> */}

    <Wrapper>
      {/* <CityPicker cities={} /> */}

      <Button href={`tel:${phone}`} isTextBlack isExternal>
        {phone}
      </Button>

      <Button href={url} target="_blank" isCircle isExternal>
        <img className="InstaBtn-icon" src={iconUrl} alt="Instagram" />
      </Button>
    </Wrapper>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
