import React from 'react';
import MenuItem from './MenuItem/MenuItem';
import AddCategory from './AddCategory/AddCategory';
import { Category } from '../../types/common';
import styles from './menu.module.css';

const Menu = (props: {
  categoriesList: { id: string; name: string }[];
  allCategories: Category[];
  onRemoveCategory: (id: string) => void;
  onAddNewCategory: (id: string) => void;
}) => {
  const { allCategories, onRemoveCategory, onAddNewCategory } = props;

  return (
    <div className={styles.menu}>
      <nav>
        <ul>
          {allCategories?.map(({ name, id }) => (
            <MenuItem key={id} id={id} name={name} onRemoveCategory={onRemoveCategory} />
          ))}
        </ul>
      </nav>

      <AddCategory onSubmit={onAddNewCategory} />
    </div>
  );
};

export default Menu;
