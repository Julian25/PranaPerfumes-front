import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Administration from '../pages/Administration';
import ProductsDashboard from '../pages/ProductsDashboard';
import EditProduct from '../components/EditProduct';
import CategoriesDashboard from '../components/CategoriesDashboard';

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Administration />}></Route>
        <Route path="categorias" element={<CategoriesDashboard />}></Route>
        <Route path="productos" element={<ProductsDashboard />}></Route>
        <Route path="productos/:id" element={<EditProduct />}></Route>
    </Routes>
    )
}

export default AdminRoutes;
