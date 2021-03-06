import React from 'react';
import PropTypes from 'prop-types';

function Wrapper({
  className,
  marginTop,
  display,
  children,
  maxWidth,
  justifyContent,
  alignItems,
  alignContent,
  flexWrap,
  flexDirection,
}) {
  const styles = {
    marginTop,
    display,
    maxWidth,
    justifyContent,
    alignItems,
    alignContent,
    flexWrap,
    flexDirection,
  };

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  className: PropTypes.string,
  marginTop: PropTypes.string,
  display: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  maxWidth: PropTypes.string,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignContent: PropTypes.string,
  flexWrap: PropTypes.string,
  flexDirection: PropTypes.string,
};

Wrapper.defaultProps = {
  className: '',
  marginTop: 'initial',
  display: 'flex',
  maxWidth: 'initial',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  flexWrap: 'nowrap',
  flexDirection: 'row',
};

export default Wrapper;
