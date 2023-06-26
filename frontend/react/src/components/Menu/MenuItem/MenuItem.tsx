import { NavLink } from 'react-router-dom';
import styles from './menuItem.module.css';
import commonStyles from '../../../commonStyles.module.css';

const MenuItem = (props: { id: string; name: string; onRemoveCategory: (id: string) => void }) => {
  const { id, name, onRemoveCategory } = props;

  return (
    <li className={styles.menuItem}>
      <NavLink
        to={`/categories/${id}`}
        className={({ isActive }) => `${styles.menuItemValue} ${isActive ? styles.selected : ''}`}
      >
        {name}
      </NavLink>
      <button
        className={`${styles.btnRemove} ${commonStyles.btnRemove}`}
        onClick={onRemoveCategory.bind(null, id)}
      >
        X
      </button>
    </li>
  );
};

export default MenuItem;
