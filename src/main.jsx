import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx' // Correct the path to your App component

// Import Bootstrap and Bootstrap Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import your global stylesheet
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)