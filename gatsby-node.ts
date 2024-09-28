import path from "path";
// import CopyWebpackPlugin from "copy-webpack-plugin";
import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, stage }) => {
  actions.setWebpackConfig({
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  });
};
