<script lang="ts">
import TodoItem from '@/components/TodoList/TodoItem.vue'
import { CLASS_NAME_LEVEL } from './constants'
import { ItemList, ItemListLevel, List } from '@/types/common'
import { nextTick, PropType, reactive, ref, watch } from 'vue'
import { debounce } from '@/utils/debounce'
import { todoService } from '../../../services/todoService'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'

export default {
  components: {
    TodoItem
  },
  props: {
    todoListInitial: { type: Array as PropType<ItemList[]> }
  },
  setup(props, { emit }) {
    const router = useRoute()
    const todoList = reactive({ list: props.todoListInitial })
    const baseComponents = ref([])

    const setBaseComponentsRef = (el, idx) => {
      if (el) {
        baseComponents.value[idx] = el
      }
    }

    const updateTodoList = debounce(async (updatedList: List) => {
      if (todoList) {
        await todoService.updateList(router.params.id as string, updatedList)
      }
    }, 1000)

    const updateItemHandler = async (item: ItemList, index: number) => {
      const updatedList = todoList.list?.map((listItem) =>
        item.id === listItem.id ? item : listItem
      )
      if (index === todoList.list?.length - 1 && item.text !== '') {
        updatedList.push({
          id: uuidv4(),
          text: '',
          isDone: false,
          level: 0
        })
      }

      todoList.list = updatedList
      await updateTodoList(updatedList)
    }

    const removeItemHandler = async (id: string) => {
      const updatedList = todoList.list?.filter((item) => id !== item.id)
      todoList.list = updatedList
      await updateTodoList(updatedList)
    }

    const addNewItemHandler = async ({ value, level, id }: ItemList) => {
      if (todoList) {
        const updatedList = [...todoList.list]
        const newItemSiblingIndex = updatedList.findIndex((item) => item.id === id)

        updatedList.splice(
          newItemSiblingIndex !== -1 ? newItemSiblingIndex + 1 : updatedList.length,
          0,
          {
            text: value,
            isDone: false,
            level: level || ItemListLevel['level-0'],
            id: uuidv4()
          }
        )
        todoList.list = updatedList

        await updateTodoList(updatedList)
      }
    }

    watch(
      () => todoList.list,
      async () => {
        emit('updateTodoList', todoList.list)
        await updateTodoList(todoList.list)
      },
      { deep: true }
    )

    watch(
      () => props.todoListInitial,
      () => {
        todoList.list = props.todoListInitial
      }
    )

    const setFocusToElement = async (index: number) => {
      await nextTick()
      baseComponents.value?.[index]?.setFocus?.()
    }

    return {
      CLASS_NAME_LEVEL,
      setBaseComponentsRef,
      baseComponents,
      setFocusToElement,
      addNewItemHandler,
      removeItemHandler,
      updateItemHandler,
      todoList
    }
  }
}
</script>

<template>
  <ul class="todoList">
    <li
      v-for="(item, index) in todoList.list"
      :class="{ [CLASS_NAME_LEVEL[item.level]]: true }"
      class="listItem"
      :key="item.id"
    >
      <TodoItem
        :item="item"
        v-model:text="item.text"
        v-model:isDone="item.isDone"
        :index="index"
        :ref="(el) => setBaseComponentsRef(el, index)"
        @setFocusToElement="setFocusToElement"
        @addNewItem="addNewItemHandler"
        @removeItem="removeItemHandler"
        @updateItem="updateItemHandler"
      />
    </li>
  </ul>
</template>

<style scoped>
.todoList {
  margin: 0;
  padding-left: 16px;
  list-style-type: none;
}

.listItem.level-1 {
  margin-left: var(--margin);
}

.listItem.level-2 {
  margin-left: calc(2 * var(--margin));
}

.listItem.level-3 {
  margin-left: calc(3 * var(--margin));
}

.listItem.level-4 {
  margin-left: calc(4 * var(--margin));
}
</style>
