import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/reset.css';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Home />
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
