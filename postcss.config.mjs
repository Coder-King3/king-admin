export default {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    autoprefixer: {},
    'postcss-import': {},
    'postcss-preset-env': {},
    'postcss-nested': {},
    '@unocss/postcss': {}
  }
}
