const path = require(`path`);
const fetch = require('node-fetch');
const fs = require('fs');

const {
  createRemoteFileNode,
  // createFilePath,
} = require(`gatsby-source-filesystem`);

if (process.NODE_ENV === 'development') {
  exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
      devtool: 'eval-source-map',
    });
  };
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'develop-html' || stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /vminpoly/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      wpgraphql {
        products(first: 300) {
          nodes {
            ... on WPGraphQL_SimpleProduct {
              id
              slug
            }
          }
        }
        posts {
          nodes {
            id
            recipe_post {
              recipeName
              description
              ingredients
              preparation
              similar {
                first
                second
                third
              }
            }
            slug
            featuredImageSmall: featuredImage {
              sourceUrl
              mediaItemId
              modified
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 726, maxHeight: 909) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
            featuredImageFull: featuredImage {
              sourceUrl
              mediaItemId
              modified
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 726, maxHeight: 909) {
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
        universalPage: page(id: "cGFnZToyMDg=") {
          universal_page {
            copyright
            inn
            instaLink
            orgn
            ooo
            phone
            city
          }
        }
      }
      bannerBg: file(relativePath: { eq: "bg-recipe.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
      defaultImageSmall: file(relativePath: { eq: "default.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 385, maxHeight: 217) {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
      defaultImageFull: file(relativePath: { eq: "default.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 726, maxHeight: 909) {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
  `);
  data.wpgraphql.products.nodes.forEach(({ id, slug }) => {
    actions.createPage({
      path: slug,
      component: path.resolve(`./src/layouts/product.js`),
      context: {
        id,
        universal: data.wpgraphql.universalPage.universal_page,
      },
    });
  });

  const posts = data.wpgraphql.posts.nodes;
  for (let i = 0; i < posts.length; i += 1) {
    if (!posts[i].featuredImageSmall) {
      posts[i].featuredImageSmall = {};
      posts[i].featuredImageSmall.imageFile = data.defaultImageSmall;
    }
    if (posts[i].slug[0] !== '/') {
      posts[i].slug = `/${posts[i].slug}`;
    }
  }
  posts.forEach(({ id, slug }) => {
    actions.createPage({
      path: slug,
      component: path.resolve(`./src/layouts/recipe.js`),
      context: {
        id,
        posts,
        bannerBg: data.bannerBg,
        universal: data.wpgraphql.universalPage.universal_page,
      },
    });
  });
};

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  getNode,
  store,
  reporter,
}) => {
  const { createNode, touchNode } = actions;

  // Add all media libary images so they can be queried by
  // childImageSharp
  createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        async resolve(source) {
          if (source.sourceUrl) {
            let fileNodeID;
            let fileNode;
            let sourceModified;

            // Set the file cacheID, get it (if it has already been set)
            const mediaDataCacheKey = `wordpress-media-${source.mediaItemId}`;
            const cacheMediaData = await cache.get(mediaDataCacheKey);

            if (source.modified) {
              sourceModified = source.modified;
            }

            // If we have cached media data and it wasn't modified, reuse
            // previously created file node to not try to redownload
            if (cacheMediaData && sourceModified === cacheMediaData.modified) {
              fileNode = getNode(cacheMediaData.fileNodeID);

              // check if node still exists in cache
              // it could be removed if image was made private
              if (fileNode) {
                fileNodeID = cacheMediaData.fileNodeID;
                // https://www.gatsbyjs.org/docs/node-creation/#freshstale-nodes
                touchNode({
                  nodeId: fileNodeID,
                });
              }
            }

            // If we don't have cached data, download the file
            if (!fileNodeID) {
              try {
                // Get the filenode
                fileNode = await createRemoteFileNode({
                  url: source.sourceUrl,
                  store,
                  cache,
                  createNode,
                  createNodeId,
                  reporter,
                });

                if (fileNode) {
                  fileNodeID = fileNode.id;

                  await cache.set(mediaDataCacheKey, {
                    fileNodeID,
                    modified: sourceModified,
                  });
                }
              } catch (e) {
                // Ignore
                console.log(e);
                return null;
              }
            }

            if (fileNode) {
              return fileNode;
            }
          }
          return null;
        },
      },
    },
  });
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const token = fs.readFileSync('./token_insta.txt', {
    encoding: 'utf8',
    flag: 'r',
  });
  console.log(token);

  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,permalink,media_url,thumbnail_url&access_token=${token}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    console.log('Instagram: Response bad');
    return;
  }

  const json = await response.json();
  const { data } = json;

  for (let i = 0; i < 8; i += 1) {
    const myData = data[i];
    myData.position = i;

    if (myData.thumbnail_url) {
      myData.media_url = myData.thumbnail_url;
      delete myData.thumbnail_url;
    }

    const nodeContent = JSON.stringify(myData);

    const nodeMeta = {
      id: createNodeId(`insta-data-${myData.id}`),
      parent: null,
      children: [],
      internal: {
        type: `InstaNode`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(myData),
      },
    };

    const node = { ...myData, ...nodeMeta };
    createNode(node);
  }
};

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (node.internal.type === 'InstaNode' && node.media_url !== null) {
    const fileNode = await createRemoteFileNode({
      url: node.media_url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id;
    }
  }
};
