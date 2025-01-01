import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<MainPage />} />
        <Route path='/a' element={<DetailPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
