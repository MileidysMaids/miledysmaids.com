import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";

const paths = [".env.local"];
if (process.env.NODE_ENV === "development") paths.push(".env.development");
if (process.env.NODE_ENV === "production") paths.push(".env");
dotenv.config({ path: paths });

export default {
  graphqlTypegen: true,
  siteMetadata: {
    title: `Mileidy's Maids`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        host: "preview.contentful.com",
        environment: "development",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-sitemap",
  ],
} as GatsbyConfig;
