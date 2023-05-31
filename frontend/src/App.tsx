import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CategoryPage from './pages/category/CategoryPage';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/404/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { menuLoader } from './pages/menuLoader';
import { categoryPageLoader } from './pages/category/loader';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: menuLoader
  },
  {
    path: 'categories/:categoryId',
    element: <CategoryPage />,
    loader: categoryPageLoader,
    errorElement: <ErrorBoundary />
  },
  {
    path: '*',
    element: <NotFoundPage />,
    loader: menuLoader
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
