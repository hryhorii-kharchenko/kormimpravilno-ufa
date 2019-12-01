import React from 'react';
import { Link } from 'gatsby';

import classes from './Button.module.css';

function Button({
  childen,
  href = '#',
  target = '_self',
  parentClasses = null,
  onClick = null,
  isTextBlack = false,
  isWide = false,
  isCircle = false,
  isFilled = false,
  isExternal = false,
  isAction = false,
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
        {childen}
      </a>
    );
  } else if (isAction) {
    element = (
      <button onClick={onClick} type="button" className={btnClasses.join(' ')}>
        {childen}
      </button>
    );
  } else {
    element = (
      <Link to={href} className={btnClasses.join(' ')}>
        {childen}
      </Link>
    );
  }

  return { element };
}

export default Button;
