// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//     ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
//   },
// }



module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    'postcss-preset-env',
    [
      'postcss-normalize',
      {
        allowDuplicates: false,
      },
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      },
    ],
    'autoprefixer',
  ],
};