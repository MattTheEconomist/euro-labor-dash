import React from 'react';
import logo from './logo.svg';
import './App.css';

// import ControlPanel from 'C:/Users/Admin/Documents/js/react/euro-labor-dash/euro-labor-dash/src/components/ControlPanel'
import ControlPanel from './components/ControlPanel'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}

      <ControlPanel />
    </div>
  );
}

export default App;
