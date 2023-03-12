import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import ListState from './state/ListState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ListState>
    <App />
    </ListState>
  </React.StrictMode>
);


