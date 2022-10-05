import React from 'react';
import ReactDOM from 'react-dom/client';
import Footer from './components/Footer/Footer';
import Navbar from './components/NavBar/Navbar';
import './index.css';
import Homepage from './pages/Homepage/Homepage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar />
    <Homepage />
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
