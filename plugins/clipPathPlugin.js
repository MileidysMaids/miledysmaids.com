// /plugins/clipPathPlugin.js
module.exports = function ({ addUtilities, theme }) {
  const newUtilities = {
    ".clip-half-oval": {
      clipPath: theme("clipPath.half-oval"),
    },
    ".bottom-oval": {
      clipPath: theme("clipPath.bottom-oval-sm"),
    },
    ".top-oval": {
      clipPath: theme("clipPath.top-oval-sm"),
    },
    // Responsive clip-paths for small screens
    "@screen sm": {
      ".bottom-oval": {
        clipPath: theme("clipPath.bottom-oval"),
      },
      ".top-oval": {
        clipPath: theme("clipPath.top-oval"),
      },
    },
  };

  addUtilities(newUtilities, ["responsive"]);
};
