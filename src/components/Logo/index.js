import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';

function Logo({ isAlt }) {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.jpg" }) {
        childImageSharp {
          fixed(width: 235, height: 26) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      logoAlt: file(relativePath: { eq: "logo-alt.jpg" }) {
        childImageSharp {
          fixed(width: 102, height: 47) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <Link to="/" className="Logo">
      <Img
        fixed={
          isAlt
            ? data.logoAlt.childImageSharp.fixed
            : data.logo.childImageSharp.fixed
        }
        alt="Кормим правильно"
        className={isAlt ? 'Logo-img-alt' : 'Logo-img'}
      />
    </Link>
  );
}

Logo.propTypes = {
  isAlt: PropTypes.bool,
};

Logo.defaultProps = {
  isAlt: false,
};

export default Logo;
