
import React from 'react';
import ReactDOM from 'react-dom';
 // You can skip this if you don't have an index.css file.
 import App from './App';  // ✅ CORRECT (App.js is in the same folder)
 // This imports your App component

// This renders your App component into the root div in index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // This is the div with id 'root' in index.html
);
