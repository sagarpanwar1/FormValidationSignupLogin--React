import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from './components/ResetPassword';
import ProductView from './components/ProductView';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/products" element={<ProductView />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App
