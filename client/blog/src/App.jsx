import { useEffect, useState } from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify';
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import Login from './components/Login';
import Signup from './components/Signup';
import RefreshUser from './auth/RefreshUser.js';
import { useSelector } from 'react-redux';
import AllBlogs from './components/AllBlogs.jsx';
import MyBlogs from './components/MyBlogs.jsx';
import 'react-toastify/dist/ReactToastify.css';
import CreateBlog from './components/CreateBlog.jsx';
import SingleBlog from './components/SingleBlog.jsx';
import EditBlog from './components/EditBlog.jsx';

function App() {
  const isLoggin = useSelector((state) => state.auth.isLoggin);
  // console.log(isLoggin)

  return (
    <>
      <RefreshUser isLoggin={isLoggin} />
      <Routes>

        <Route path="/" element={<Layout />} >
          {/* Home route */}
          <Route index element={<Navigate to={isLoggin ? "/allblogs" : "/login"} />} />

          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/allblogs" element={isLoggin ? <AllBlogs /> : <Navigate to="/login" />} />
          <Route path="/myblogs" element={isLoggin ? <MyBlogs /> : <Navigate to="/login" />} />
          <Route path="/createBlog" element={isLoggin ? <CreateBlog /> : <Navigate to="/login" />} />
          <Route path="/blog/:id" element={isLoggin ? <SingleBlog /> : <Navigate to="/login" />} />
          <Route path="/update/:id" element={isLoggin ? <EditBlog /> : <Navigate to="/login" />} />

        </Route>

      </Routes>
      <ToastContainer />

    </>
  )
}

export default App
