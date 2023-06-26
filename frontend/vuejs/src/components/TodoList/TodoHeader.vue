<script lang="ts">
import { ref, watch } from 'vue'
import { todoService } from '../../../services/todoService'

export default {
  props: {
    name: String,
    id: String
  },
  setup(props) {
    const todoListHeader = ref(props.name)

    watch(props, () => {
      todoListHeader.value = props.name
    })

    const updateCategoryNameHandler = async () => {
      await todoService.updateCategory({ id: props.id || '', name: todoListHeader.value || '' })
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
