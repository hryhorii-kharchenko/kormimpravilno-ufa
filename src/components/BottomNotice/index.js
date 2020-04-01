import React from 'react';
import PropTypes from 'prop-types';

import './BottomNotice.module.css';
import CrossIcon from '../../images/inline/cross.svg';

function BottomNotice({ children, closeNotice }) {
  return (
    <section styleName="BottomNotice">
      <div styleName="background">
        <p styleName="text">{children}</p>

        <button type="button" onClick={closeNotice} styleName="cross-btn">
          <CrossIcon styleName="cross-img" />
        </button>
      </div>
    </section>
  );
}

BottomNotice.propTypes = {
  children: PropTypes.string.isRequired,
  closeNotice: PropTypes.func.isRequired,
};

export default BottomNotice;
