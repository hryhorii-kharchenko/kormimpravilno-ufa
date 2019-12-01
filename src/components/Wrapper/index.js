import React from 'react';
import PropTypes from 'prop-types';

function Wrapper({
  children,
  maxWidth,
  justifyContent,
  alignItems,
  alignContent,
  wrap,
  direction,
}) {
  const styles = {
    maxWidth,
    justifyContent,
    alignItems,
    alignContent,
    wrap,
    direction,
  };

  return (
    <div className="Wrapper" style={styles}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  maxWidth: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  wrap: PropTypes.string,
  direction: PropTypes.string,
};

Wrapper.defaultProps = {
  maxWidth: '300px',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  wrap: 'no-wrap',
  direction: 'row',
};

export default Wrapper;
