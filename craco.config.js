module.exports = {
  typescript: {
    enableTypeChecking: false
  },
  webpack: {
    configure: (source) => {
      source.module.rules[1].oneOf.unshift({
        test: /\.worker\.(j|t)s$/,
        loader: 'worker-loader'
      })
      return source
    }
  }
}