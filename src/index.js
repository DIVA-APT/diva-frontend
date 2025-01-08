import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<MainPage />} />
        <Route path='/detail/:code' element={<DetailPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
