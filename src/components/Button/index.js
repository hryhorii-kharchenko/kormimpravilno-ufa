import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

function Button({
  children,
  href,
  target,
  parentClasses,
  onClick,
  isTextBlack,
  isWide,
  isCircle,
  isFilled,
  isExternal,
  isAction,
}) {
  const btnClasses = [classes.Button];
  let element;

  if (parentClasses) {
    btnClasses.push(...parentClasses);
  }

  if (isTextBlack) {
    btnClasses.push(classes['black-text']);
  }

  if (isWide) {
    btnClasses.push(classes.wide);
  }

  if (isCircle) {
    btnClasses.push([classes.circle, classes['grey-border']]);
  }

  if (isFilled) {
    btnClasses.push(classes.filled);
  }

  if (isExternal) {
    element = (
      <a
        href={href}
        target={target}
        onClick={onClick}
        className={btnClasses.join(' ')}
      >
        {children}
      </a>
    );
  } else if (isAction) {
    element = (
      <button onClick={onClick} type="button" className={btnClasses.join(' ')}>
        {children}
      </button>
    );
  } else {
    element = (
      <Link to={href} className={btnClasses.join(' ')}>
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
  parentClasses: PropTypes.string,
  onClick: PropTypes.func,
  isTextBlack: PropTypes.bool,
  isWide: PropTypes.bool,
  isCircle: PropTypes.bool,
  isFilled: PropTypes.bool,
  isExternal: PropTypes.bool,
  isAction: PropTypes.bool,
};

Button.defaultProps = {
  href: '#',
  target: '_self',
  parentClasses: null,
  onClick: null,
  isTextBlack: false,
  isWide: false,
  isCircle: false,
  isFilled: false,
  isExternal: false,
  isAction: false,
};

export default Button;
