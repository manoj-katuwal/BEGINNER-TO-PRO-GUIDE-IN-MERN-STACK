import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import ProductDetail from './components/ProductDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
