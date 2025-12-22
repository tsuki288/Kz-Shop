import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout'; // ADD THIS IMPORT
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} /> {/* ADD THIS LINE */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);