module.exports = {
  purge: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./pages/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-1": "#161c20",
        "accent-2": "#16192c",
        "accent-3": "#764a3b",
        "accent-4": "#282828",
        "accent-5": "#0A1128",
        "accent-6": "#001F54",
        "accent-7": "#FF355E",
        "accent-8": "#55bde8",
        "accent-9": "#FEFCFB",
        "accent-10": "#000000EE",
        success: "#0070f3",
        cyan: "#79ffe1",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
