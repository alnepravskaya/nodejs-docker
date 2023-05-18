import Menu from '../components/Menu/Menu';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Category } from '../types/common';

const HomePage = () => {
  const { categories } = useLoaderData() as { categories: Category[] };

  return (
    <>
      <Menu categoriesList={categories} />
      <h4>Please add new category or choose from existing</h4>
    </>
  );
};

export default HomePage;
