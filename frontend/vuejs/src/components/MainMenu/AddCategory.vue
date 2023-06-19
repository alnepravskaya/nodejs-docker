<script lang="ts">
import { reactive } from 'vue'

export default {
  emit: ['addNewCategory'],
  setup(props, { emit }) {
    const newCategory = reactive({ value: '' })

    const addCategoryHandler = () => {
      if (newCategory.value) {
        emit('addNewCategory', newCategory.value)
        newCategory.value = ''
      }
    }

    return {
      newCategory,
      addCategoryHandler
    }
  }
}
</script>

<template>
  <div class="addCategory">
    <input type="text" v-model.trim="newCategory.value" @keydown.enter="addCategoryHandler" />
    <button type="submit" @click="addCategoryHandler" :disabled="!newCategory.value">Add</button>
  </div>
</template>

<style scoped>
.addCategory input {
  margin-left: 16px;
  background: transparent;
  color: #ffffff;
  border-bottom: 2px solid #9ea7b0;
}

.addCategory input[type='text']:focus-visible {
  outline: none;
}

.addCategory button {
  background: transparent;
  color: #ffffff;
}

.addCategory button:disabled {
  color: #bfc6ce;
  cursor: not-allowed;
}

@media (max-width: 800px) {
  .addCategory input {
    width: 100%;
    margin-left: 0;
  }
}
</style>
