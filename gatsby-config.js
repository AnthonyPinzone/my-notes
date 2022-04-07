module.exports = {
  siteMetadata: {
    title: `My Notes`,
    siteUrl: `https://mynotes.gatsbyjs.io/`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    // "gatsby-plugin-react-helmet",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "books",
        path: `${__dirname}/books`,
      },
      __key: "books",
    },
  ],
};
