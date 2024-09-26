import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ actions, stage }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      resolve: { alias: { "@prisma/client": false } },
    });
  }

  actions.setWebpackConfig({
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    externals: { "@prisma/client": "commonjs @prisma/client" },
  });
};
