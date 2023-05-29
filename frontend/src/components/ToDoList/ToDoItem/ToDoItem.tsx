import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ItemList, ItemListLevel } from '../../../types/common';
import {
  ARROW_DOWN,
  ARROW_UP,
  classNameLevel,
  ENTER,
  INPUT_NAME,
  MAX_LEVEL,
  MIN_LEVEL,
  TAB
} from './constants';
import styles from './todoItem.module.css';

const ToDoItem = (props: {
  currentIndexFocus: number;
  index: number;
  item: ItemList;
  onUpdateItem: (item: ItemList, id: string) => void;
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
      const end = inputRef?.current?.value.length || 0;
      inputRef?.current?.setSelectionRange(end, end);
      inputRef?.current?.focus();
    }
  }, []);

  const updateHandler = () => {
    onUpdateItem({ ...item, text: newValue }, id);
  };

  const editItemStatusHandler = () => {
    setIsChecked((isChecked) => !isChecked);
    onUpdateItem({ ...item, isDone: !isChecked }, id);
  };

  const updateValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === ENTER && e.currentTarget?.value !== '') {
      if (isLastItem) {
        onAddItem({ value: e.currentTarget.value });
        setNewValue('');
      } else {
        updateHandler();
        onAddItem({ value: '', index, level, id });
      }
    }
    if (e.code === ARROW_DOWN) {
      const newName = INPUT_NAME + (Number(e.currentTarget.name.replace(/\D/g, '')) + 1);
      const nextSibling = document.querySelector(`input[name=${newName}]`) as HTMLInputElement;
      nextSibling?.focus();
    }

    if (e.code === ARROW_UP) {
      const newName = INPUT_NAME + (Number(e.currentTarget.name.replace(/\D/g, '')) - 1);
      const nextSibling = document.querySelector(`input[name=${newName}]`) as HTMLInputElement;

      const end = nextSibling?.value.length;
      nextSibling?.setSelectionRange(end, end);
      nextSibling?.focus();

      e.preventDefault();
    }

    if (e.code === TAB) {
      e.preventDefault();

      if (props.item.level < MAX_LEVEL) {
        onUpdateItem({ ...item, level: level + 1 }, id);
      }
    }

    if (e.shiftKey && e.code === TAB) {
      if (props.item.level > MIN_LEVEL) {
        onUpdateItem({ ...item, level: level - 1 }, id);
      }
    }
  };

  return (
    <li key={id} className={`${styles['list-item']} ${styles[classNameLevel[level]]}`}>
      <div className={styles['item-line']}>
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
          className={isChecked ? styles.crossed : ''}
        />
        {!isLastItem && (
          <button
            className={`${styles['btn-remove']} btn-remove btn-square`}
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
