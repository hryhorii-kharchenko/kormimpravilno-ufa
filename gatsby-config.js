module.exports = {
  siteMetadata: {
    title: 'Кормим правильно',
    description: 'Производство натуральных полуфабрикатов',
    author: 'kharchenko.hryhorii@yandex.com',
  },
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-svgr',
    //   options: {
    //     exclude: /icons/,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /inline/,
        },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'WPGraphQL',
        fieldName: 'wpgraphql',
        url: 'http://kormimpravilno.loc/graphql',
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: 'Montserrat',
            variants: ['400', '400i', '700', '800'],
            subsets: ['latin', 'cyrillic'],
          },
        ],
      },
    },
    'gatsby-background-image-es5',
    'gatsby-plugin-react-css-modules',
    `gatsby-plugin-postcss`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'kormim-pravilno',
        short_name: 'kormimpravilno',
        start_url: '/',
        // background_color: '#663399',
        // theme_color: '#663399',
        display: 'minimal-ui',
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
