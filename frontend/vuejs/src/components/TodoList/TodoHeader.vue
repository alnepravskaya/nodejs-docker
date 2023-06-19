<script lang="ts">
import { ref, watch } from 'vue'

export default {
  props: {
    name: String,
    id: String
  },
  emits: ['updateCategory'],
  setup(props, { emit }) {
    const todoListHeader = ref(props.name)

    watch(props, () => {
      todoListHeader.value = props.name
    })

    const updateCategoryNameHandler = () => {
      emit('updateCategory', { id: props.id, name: todoListHeader.value })
    }

    return {
      todoListHeader,
      updateCategoryNameHandler
    }
  }
}
</script>

<template>
  <div class="toDoHeader">
    <input
      type="text"
      name="inputName"
      v-model="todoListHeader"
      @blur="updateCategoryNameHandler"
      placeholder="Todo Header"
    />
  </div>
</template>

<style scoped>
.toDoHeader input {
  width: 100%;
  margin: 16px 0;
  font-size: 28px;
  font-weight: 600;
  text-transform: capitalize;
}
</style>
