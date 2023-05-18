import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';
import { todoService } from './services/todoService';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: async ({ params }) => {
      const categories = await todoService.getAllCategories();

      return {
        categories
      };
    }
  },
  {
    path: 'categories/:categoryId',
    element: <CategoryPage />,
    loader: async ({ params }) => {
      const categories = await todoService.getAllCategories();
      const categoryId = params.categoryId;
      let categoryInfo = null;
      if (categoryId) {
        categoryInfo = await todoService.getCategoryInfo(categoryId);
      }
      const selectedMenuIndex = categories.findIndex((category) => category.id === categoryId);

      return {
        categories,
        categoryInfo,
        selectedMenuIndex
      };
    }
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
