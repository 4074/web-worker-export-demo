import { saveAs } from 'file-saver'

import logo from './logo.svg';
import './App.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
import CreateFileWorker from 'create-file-worker'
// import save from './export.worker'

function buildData(rows = 1000) {
  const result = []
  for (let i = 0; i < rows; i += 1) {
    const row = []
    for (let j = 0; j < 10; j += 1) {
      row.push(i + j + '哈')
    }
    result.push(row)
  }
  return result
}

function exportData(file: any, worker?: CreateFileWorker) {
  
  if (worker) {
    worker.onmessage = ({ data }) => {
      const { type, payload } = data
      if (type === 'cfw:success') {
        console.time()
        for (const item of payload) {
          const blob = new Blob([item.buffer])
          saveAs(blob, item.name)
        }
        console.timeEnd()
      }
    }
    
    worker.postMessage({type: 'cfw:create', payload: file})
  } else {
    // save(file).then((data) => {
    //   for (const item of data) {
    //     const blob = new Blob([item.buffer])
    //     saveAs(blob, item.name)
    //   }
    //   console.timeEnd()
    // })
  }
}

function App() {
  const handleExport = () => {
    const data = buildData(100)
    const worker = new CreateFileWorker()
    exportData({
      type: 'xlsx',
      name: '你好.xlsx',
      data: [{name: 'sheet1', data}]
    }, worker)
    exportData({
      type: 'zip',
      name: '世界.zip',
      files: [
        {
          type: 'xlsx',
          name: '壹.xlsx',
          data: [{name: 'sheet1', data}, {name: 'shee2', data}]
        },
        {
          type: 'xlsx',
          name: '2.xlsx',
          data: [{name: 'sheet1', data}]
        }
      ]
    }, worker)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input />
        <button onClick={handleExport}>Export Excel</button>
      </header>
    </div>
  );
}

export default App;
