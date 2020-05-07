import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import './Button.module.css';

function Button({
  children,
  href,
  target,
  id,
  className,
  onClick,
  isTextBlack,
  isCircle,
  isFilled,
  isExternal,
  isAction,
  isCancel,
  style,
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

  // if (isCancel) {
  //   btnStyles.push(' cancel');
  // }

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
  } else if (isAction || !href) {
    element = (
      <button
        onClick={onClick}
        type="button"
        id={id}
        styleName={btnStyles.join(' ')}
        className={className}
        style={style}
      >
        {children}
      </button>
    );
  } else {
    element = (
      <Link
        to={href}
        onClick={onClick}
        styleName={btnStyles.join(' ')}
        className={className}
      >
        {children}
      </Link>
    );
  }

  return element;
}

Button.defaultProps = {
  href: null,
  target: '_self',
  width: null,
  id: null,
  className: null,
  onClick: null,
  isTextBlack: false,
  isCircle: false,
  isFilled: false,
  isExternal: false,
  isAction: false,
  isOrder: false,
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isTextBlack: PropTypes.bool,
  isCircle: PropTypes.bool,
  isFilled: PropTypes.bool,
  isExternal: PropTypes.bool,
  isAction: PropTypes.bool,
};

export default Button;
