import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

function SanitizeHTML({ html, options }) {
  const defaultOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'ul', 'ol', 'li'],
    allowedAttributes: {
      a: ['href'],
    },
    allowedIframeHostnames: [],
    selfClosing: ['br'],
  };

  function sanitize(dirty) {
    return {
      __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
    };
  }

  return <div dangerouslySetInnerHTML={sanitize(html)} />;
}

SanitizeHTML.defaultProps = {
  options: {},
};

SanitizeHTML.propTypes = {
  html: PropTypes.string.isRequired,
  options: PropTypes.shape(),
};

export default SanitizeHTML;
