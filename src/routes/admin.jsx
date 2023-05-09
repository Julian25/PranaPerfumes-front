import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Administration from '../pages/Administration';
import Categories from '../pages/Categories';
import ProductsDashboard from '../pages/ProductsDashboard';
import EditProduct from '../components/EditProduct';

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Administration />}></Route>
        <Route path="categorias" element={<Categories />}></Route>
        <Route path="productos" element={<ProductsDashboard />}></Route>
        <Route path="productos/:id" element={<EditProduct />}></Route>
    </Routes>
    )
}

export default AdminRoutes;
