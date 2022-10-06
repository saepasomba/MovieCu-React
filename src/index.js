import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/NavBar/Navbar';
import Homepage from './pages/Homepage/Homepage';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import MovieSearch from './pages/MovieSearch/MovieSearch';
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/details/:movieID' element={<MovieDetails />} />
        <Route path='/search/:query' element={<MovieSearch action='search' />} replace />
        <Route path='/genre/:query' element={<MovieSearch action='genre' />} replace />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
