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
      height: {
        content: "calc(100vh - 5rem)",
      },
      colors: {
        primary: {
          light: colors.rose[400],
          DEFAULT: colors.rose[500],
          dark: colors.rose[600],
        },
        secondary: {
          light: colors.stone[400],
          DEFAULT: colors.stone[600],
          dark: colors.stone[700],
        },
        muted: {
          light: colors.stone[200],
          DEFAULT: colors.stone[400],
          dark: colors.stone[500],
        },
        error: {
          DEFAULT: colors.red[500],
        },
        icon: {
          DEFAULT: colors.gray[500],
        },
      },
    },
  },
  plugins: [],
};
