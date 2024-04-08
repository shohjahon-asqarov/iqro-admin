import React from 'react';
import ReactDOM from 'react-dom/client';

// app
import App from './App.jsx';

// styles
import './index.css';
import './css/style.css';

// react router
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
