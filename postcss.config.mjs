export default {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    '@unocss/postcss': {},
    autoprefixer: {},
    'postcss-import': {},
    'postcss-nested': {},
    'postcss-preset-env': {}
  }
}
