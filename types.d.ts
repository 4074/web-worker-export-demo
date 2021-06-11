// declare module "worker-loader!*" {
//     // You need to change `Worker`, if you specified a different value for the `workerType` option
//     class WebpackWorker extends Worker {
//       constructor();

//       postMessage(message: {type: 'create-file', payload: FileItem | FileItem[]}): void
//     }
  
//     // Uncomment this if you set the `esModule` option to `false`
//     // export = WebpackWorker;
//     export default WebpackWorker;
//   }