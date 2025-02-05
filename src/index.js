import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import NewMainPage from './pages/NewMainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route index element={<MainPage />} /> */}
      <Route index element={<NewMainPage />} />
      <Route path='/' element={<App />}>
        <Route path='/detail/:code' element={<DetailPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
