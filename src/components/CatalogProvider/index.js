import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

function CatalogProvider({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query CatalogQuery {
          wpgraphql {
            products {
              nodes {
                product_post {
                  productName
                  composition
                  weight
                  cooking
                  nutrition
                  similar {
                    first
                    second
                    third
                  }
                }
                ... on WPGraphQL_SimpleProduct {
                  price
                  productId
                  id
                  image {
                    sourceUrl
                    mediaItemId
                    modified
                    imageFile {
                      childImageSharp {
                        fluid(maxWidth: 386) {
                          base64
                          aspectRatio
                          src
                          srcSet
                          sizes
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        return React.cloneElement(children, {
          catalog: data.wpgraphql.products.nodes,
        });
      }}
    />
  );
}

CatalogProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default CatalogProvider;
