/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx,html}'),
   ...createGlobPatternsForDependencies(__dirname),
  ],

  theme: {
    extend: {},
  },
  plugins: [],
}