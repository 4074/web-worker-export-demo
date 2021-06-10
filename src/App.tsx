import React from 'react';
import logo from './logo.svg';
import './App.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
import Exporter from 'worker-loader!./export.worker'
const e = new Exporter()
e.addEventListener('message', (e) => console.log(e))


function App() {
  const handleExport = () => {
    console.log(111)
    e.postMessage('aaa')
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
        <button onClick={handleExport}>Export Excel</button>
      </header>
    </div>
  );
}

export default App;
