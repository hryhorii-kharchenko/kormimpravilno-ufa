import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import './Button.module.css';

function Button({
  children,
  href,
  target,
  className,
  onClick,
  isTextBlack,
  isCircle,
  isFilled,
  isExternal,
  isAction,
}) {
  const btnStyles = ['Button'];
  let element;

  if (isTextBlack) {
    btnStyles.push('blackText');
  }

  if (isCircle) {
    btnStyles.push('circle', 'grayBorder');
  }

  if (isFilled) {
    btnStyles.push('filled');
  }

  if (isExternal) {
    element = (
      <a
        href={href}
        target={target}
        onClick={onClick}
        styleName={btnStyles.join(' ')}
        className={className}
      >
        {children}
      </a>
    );
  } else if (isAction) {
    element = (
      <button
        onClick={onClick}
        type="button"
        styleName={btnStyles.join(' ')}
        className={className}
      >
        {children}
      </button>
    );
  } else {
    element = (
      <Link to={href} styleName={btnStyles.join(' ')} className={className}>
        {children}
      </Link>
    );
  }

  return element;
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isTextBlack: PropTypes.bool,
  isCircle: PropTypes.bool,
  isFilled: PropTypes.bool,
  isExternal: PropTypes.bool,
  isAction: PropTypes.bool,
};

Button.defaultProps = {
  href: '#',
  target: '_self',
  width: null,
  className: null,
  onClick: null,
  isTextBlack: false,
  isCircle: false,
  isFilled: false,
  isExternal: false,
  isAction: false,
};

export default Button;
