<script lang="ts">
import { PropType, ref } from 'vue'
import { MAX_LEVEL, MIN_LEVEL } from './constants'
import { ItemList } from '@/types/common'
import { ARROW_DOWN, ARROW_UP, BACKSPACE, ENTER, TAB } from '@/contants/contants'

export default {
  props: {
    item: { type: Object as PropType<ItemList>, required: true },
    index: Number,
    text: String,
    isDone: Boolean
  },
  expose: ['setFocus'],
  emits: [
    'updateItem',
    'addNewItem',
    'setFocusToElement',
    'removeItem',
    'update:text',
    'update:isDone'
  ],
  setup(props, { emit }) {
    const input = ref(null)

    const setFocus = () => {
      input.value.focus()
    }

    const onBlurItemHandler = () => {
      emit('updateItem', props.item, props.index)
    }

    const editItemStatusHandler = () => {
      emit('updateItem', { ...props.item, isDone: !props.item.isDone }, props.index)
    }

    const keyDownHandler = (e) => {
      if (e.code === ENTER) {
        if (e.metaKey) {
          editItemStatusHandler()
        } else if (e.currentTarget?.value !== '') {
          emit('addNewItem', {
            value: '',
            index: props.index,
            level: props.item.level,
            id: props.item.id
          })
          emit('setFocusToElement', props.index + 1)
        }
      } else if (e.code === BACKSPACE && props.item.text === '') {
        e.preventDefault()
        emit('setFocusToElement', props.index - 1)
        emit('removeItem', props.item.id)
      } else if (e.code === ARROW_DOWN) {
        emit('setFocusToElement', props.index + 1)
      } else if (e.code === ARROW_UP) {
        emit('setFocusToElement', props.index - 1)
        e.preventDefault()
      } else if (e.code === TAB) {
        e.preventDefault()
        if (e.shiftKey) {
          if (props.item.level > MIN_LEVEL) {
            emit('updateItem', { ...props.item, level: props.item.level - 1 }, props.index)
          }
        } else {
          if (props.item.level < MAX_LEVEL) {
            emit('updateItem', { ...props.item, level: props.item.level + 1 }, props.index)
          }
        }
      }
    }

    const removeItemHandler = () => {
      emit('removeItem', props.item.id)
    }

    return {
      input,
      setFocus,
      keyDownHandler,
      removeItemHandler,
      editItemStatusHandler,
      onBlurItemHandler
    }
  }
}
</script>

<template>
  <div class="itemLine">
    <input type="checkbox" :checked="isDone" @change="$emit('update:isDone', !isDone)" />
    <input
      type="text"
      :value="text"
      @input="$emit('update:text', $event.target.value)"
      @keydown="keyDownHandler"
      @blur="onBlurItemHandler"
      placeholder="To-do"
      ref="input"
      :class="{ crossed: item.isDone }"
    />

    <button className="btnRemove btnSquare" @click="removeItemHandler">X</button>
  </div>
</template>

<style scoped>
.itemLine {
  display: flex;
  align-items: center;
}

.listItem .crossed {
  text-decoration: line-through;
}

.listItem button {
  margin: 0 4px;
}

.listItem label {
  display: flex;
  align-items: center;
}

.listItem input[type='checkbox'] {
  height: 20px;
  width: 20px;
}

.listItem input[type='text']:focus-visible {
  outline: none;
}

button.btnRemove:hover {
  background: #f5e0e0;
}

.listItem .btnRemove {
  opacity: 0;
  margin-left: auto;
}

.listItem:hover .btnRemove {
  opacity: 1;
}

.listItem input[type='text'] {
  width: 100%;
}
</style>
