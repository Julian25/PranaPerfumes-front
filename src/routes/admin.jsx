import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Administration from '../pages/Administration';
import Categories from '../pages/Categories';
import ProductsDashboard from '../pages/ProductsDashboard';

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Administration />}></Route>
        <Route path="categorias" element={<Categories />}></Route>
        <Route path="productos" element={<ProductsDashboard />}></Route>
    </Routes>
    )
}

export default AdminRoutes;
