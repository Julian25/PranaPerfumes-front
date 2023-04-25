import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import Administration from '../pages/Administration';
import Categories from '../pages/Categories';
import Home from '../pages/Home';

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Administration />}></Route>
        <Route path="categorias" element={<Categories />}></Route>
    </Routes>
    )
}

export default AdminRoutes;
