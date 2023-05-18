import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CategoryPage from './pages/category/CategoryPage';
import HomePage from './pages/home/HomePage';
import {categoryPageLoader} from "./pages/category/loader";
import './App.css';
import { homePageLoader } from './pages/home/loader';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: homePageLoader
  },
  {
    path: 'categories/:categoryId',
    element: <CategoryPage />,
    loader: categoryPageLoader
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
