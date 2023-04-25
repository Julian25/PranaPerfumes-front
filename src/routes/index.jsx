import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Products from '../pages/Products';
import PrivateRoute from './privateRoute';
import Login from '../components/login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/productos" element={<Products />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path='/administracion/*' element={<PrivateRoute />}></Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App;
