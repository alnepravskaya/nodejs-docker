import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ItemList, ItemListLevel } from '../../../types/common';
import { classNameLevel, INPUT_NAME, MAX_LEVEL, MIN_LEVEL } from './constants';
import { ARROW_DOWN, ENTER, ARROW_UP, TAB, BACKSPACE } from './../../../contants/contants';
import styles from './todoItem.module.css';
import commonStyles from '../../../commonStyles.module.css';

const ToDoItem = (props: {
  currentIndexFocus: number;
  index: number;
  item: ItemList;
  onUpdateItem: (item: ItemList) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: ({
    value,
    index,
    level,
    id
  }: {
    value: string;
    index?: number;
    level?: ItemListLevel;
    id?: string;
  }) => void;
  isLastItem?: boolean;
}) => {
  const {
    item: { text, id, isDone, level },
    item,
    index,
    onUpdateItem,
    onRemoveItem,
    onAddItem,
    isLastItem,
    currentIndexFocus
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const [newValue, setNewValue] = useState(text);
  const [isChecked, setIsChecked] = useState(isDone);

  useEffect(() => {
    if (currentIndexFocus === index) {
      inputRef?.current?.focus();
    }
  }, []);

  const updateHandler = () => {
    if (!isLastItem || (isLastItem && newValue.trim() !== '')) {
      onUpdateItem({ ...item, text: newValue, isDone: isChecked });
    }

    if (isLastItem) {
      setNewValue('');
      setIsChecked(false);
    }
  };

  const editItemStatusHandler = () => {
    setIsChecked((isChecked) => !isChecked);
    if (!isLastItem) {
      onUpdateItem({ ...item, isDone: !isChecked });
    }
  };

  const updateValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.currentTarget.value);
  };

  const keyDownHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === ENTER) {
      if (e.metaKey) {
        editItemStatusHandler();
      } else if (e.currentTarget?.value !== '') {
        if (isLastItem) {
          onAddItem({ value: e.currentTarget.value });
          setNewValue('');
        } else {
          updateHandler();
          onAddItem({ value: '', index, level, id });
        }
      }
    } else if (e.code === BACKSPACE && e.currentTarget?.value === '') {
      const newName = INPUT_NAME + (Number(e.currentTarget.name.replace(/\D/g, '')) - 1);
      const prevSibling = document.querySelector(`input[name=${newName}]`) as HTMLInputElement;
      prevSibling?.focus();

      onRemoveItem(id);
      e.preventDefault();
    } else if (e.code === ARROW_DOWN) {
      const newName = INPUT_NAME + (Number(e.currentTarget.name.replace(/\D/g, '')) + 1);
      const nextSibling = document.querySelector(`input[name=${newName}]`) as HTMLInputElement;
      nextSibling?.focus();
    } else if (e.code === ARROW_UP) {
      const newName = INPUT_NAME + (Number(e.currentTarget.name.replace(/\D/g, '')) - 1);
      const prevSibling = document.querySelector(`input[name=${newName}]`) as HTMLInputElement;
      prevSibling?.focus();

      e.preventDefault();
    } else if (e.code === TAB) {
      e.preventDefault();
      if (e.shiftKey) {
        if (item.level > MIN_LEVEL) {
          onUpdateItem({ ...item, level: level - 1 });
        }
      } else {
        if (props.item.level < MAX_LEVEL) {
          onUpdateItem({ ...item, level: level + 1 });
        }
      }
    }
  };

  return (
    <li key={id} className={`${styles.listItem} ${styles[classNameLevel[level]]}`}>
      <div className={styles.itemLine}>
        <input type="checkbox" checked={isChecked} onChange={editItemStatusHandler} name={id} />
        <input
          type="text"
          name={INPUT_NAME + index.toString()}
          value={newValue}
          onChange={updateValueHandler}
          onBlur={updateHandler}
          onKeyDown={keyDownHandler}
          ref={inputRef}
          placeholder="To-do"
          className={isChecked && !isLastItem ? styles.crossed : ''}
        />
        {!isLastItem && (
          <button
            className={`${styles.btnRemove} ${commonStyles.btnRemove} ${commonStyles.btnSquare}`}
            onClick={onRemoveItem.bind(null, id)}
          >
            X
          </button>
        )}
      </div>
    </li>
  );
};

export default ToDoItem;
