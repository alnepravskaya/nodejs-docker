<script lang="ts">
import { ref } from 'vue'
import { todoService } from '../../../services/todoService'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()

    const newCategory = ref('')

    const addCategoryHandler = async () => {
      if (newCategory.value) {
        await todoService.addNewCategory(newCategory.value)
        newCategory.value = ''
        router.push(
          `/categories/${
            todoService.allCategories.value[todoService.allCategories.value.length - 1].id
          }`
        )
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
    <input type="text" v-model.trim="newCategory" @keydown.enter="addCategoryHandler" />
    <button type="submit" @click="addCategoryHandler" :disabled="!newCategory">Add</button>
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
