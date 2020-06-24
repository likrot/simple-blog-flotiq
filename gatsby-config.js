require('dotenv').config();
const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = {
    developMiddleware: app => {
        app.use(
            "/.netlify/functions/",
            createProxyMiddleware({
                target: "http://localhost:8888",
                pathRewrite: {
                    "/.netlify/functions/": "",
                },
            })
        )
    },
    siteMetadata: {
        title: `Star Wars Ipsum Blog`,
        author: `likrot`,
        description: `A starter blog demonstrating what Flotiq & Gatsby can do together.`,
        siteUrl: `https://flotiq-blog.herokuapp.com/`, /* this will be changed later */
        social: {
            twitter: `flotiq`,
        },
    },
    plugins: [
        {
            "resolve": "gatsby-source-flotiq",
            "options": {
                "baseUrl": process.env.GATSBY_FLOTIQ_BASE_URL,
                "authToken": process.env.GATSBY_FLOTIQ_API_KEY,
                "forceReload": true,
                "includeTypes": ['blogpost','_media']
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/assets`,
                name: `assets`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 590,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    `gatsby-remark-smartypants`,
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                //trackingId: `ADD YOUR TRACKING ID HERE`,
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
    ],
}
