module.exports = {
  typescript: {
    enableTypeChecking: false
  },
  // webpack: {
  //   configure: (source) => {
  //     const arr = source.module.rules[1].oneOf
  //     const tsRule = arr.find(item => !Array.isArray(item.test) && item.test.test('a.ts'))
  //     const workerReg = /\.worker\.(js|ts)$/

  //     const workerRule = {
  //       ...tsRule,
  //       test: workerReg,
  //       use: [{
  //         loader: require.resolve('worker-loader')
  //       }, {
  //         loader: tsRule.loader,
  //         options: tsRule.options
  //       }],
  //     }
  //     delete workerRule.loader
  //     delete workerRule.options

  //     tsRule.exclude = workerReg
  //     arr.push(workerRule)
      
  //     console.log(JSON.stringify(arr, null, 2))

  //     return source
  //   }
  // },
}