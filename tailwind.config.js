// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        content: "600px",
      },
      maxWidth: {
        content: "600px",
      },
      colors: {
        primary: {
          light: colors.rose[400],
          DEFAULT: colors.rose[500],
          dark: colors.rose[600],
        },
        secondary: {
          light: colors.stone[400],
          DEFAULT: colors.stone[500],
          dark: colors.stone[600],
        },
        muted: {
          light: colors.stone[200],
          DEFAULT: colors.stone[400],
          dark: colors.stone[500],
        },
      },
    },
  },
  plugins: [],
};
