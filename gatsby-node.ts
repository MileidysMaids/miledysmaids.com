import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "node_modules/.prisma/client/", // Direct path to binary
            to: "prisma/", // Target location in the build (eg. "public/prisma"), // Target location in the build
          },
        ],
      }),
    ],
  });
};
