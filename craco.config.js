module.exports = {
  typescript: {
    enableTypeChecking: false
  },
  webpack: {
    configure: (source) => {
      const arr = source.module.rules[1].oneOf
      const workerReg = /create-file-worker\\dist\\index.js/

      const workerRule = {
        test: workerReg,
        loader: require.resolve('worker-loader')
      }

      arr.unshift(workerRule)
      return source
    }
  },
}