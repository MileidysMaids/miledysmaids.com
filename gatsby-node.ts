import path from "path";
// const path = require("path");
import type { GatsbyNode } from "gatsby";

// const template = path.resolve(`./src/templates/template.tsx`);

// exports.onCreateWebpackConfig = ({ actions }: GatsbyNode) => {
//   actions.setWebpackConfig({
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "src"),
//       },
//     },
//   });
// };

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};
