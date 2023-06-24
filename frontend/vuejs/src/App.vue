<script lang="ts">
import MainMenu from './components/MainMenu/MainMenu.vue'
import { onMounted, ref, watch } from 'vue'
import { todoService } from '../services/todoService'
import { useRoute, useRouter } from 'vue-router'

export default {
  components: {
    MainMenu
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const allCategories = ref([])
    const selectedCategoryIndex = ref(0)

    onMounted(async () => {
      allCategories.value = await todoService.getAllCategories()
      selectedCategoryIndex.value =
        allCategories.value?.findIndex(({ id }) => id === route.params.id) || 0
    })

    watch(route, () => {
      const selectedCategoryIndexValue = allCategories.value.findIndex(
        ({ id }) => id === route.params.id
      )

      if (selectedCategoryIndexValue > -1) {
        selectedCategoryIndex.value = selectedCategoryIndexValue
      } else {
        router.push(`/`)
      }
    })

    const addNewCategoryHandler = async (value: string) => {
      const response = await todoService.addNewCategory(value)
      allCategories.value = response.body
      router.push(`/categories/${allCategories.value[allCategories.value.length - 1].id}`)
    }

    const updateCategoryHandler = async ({ name, id }: { name: string; id: string }) => {
      const response = await todoService.updateCategory({ name, id })
      allCategories.value = response.body
    }

    const removeCategoryHandler = async (id: string) => {
      const response = await todoService.removeCategory(id)
      if (allCategories.value[selectedCategoryIndex.value].id === id) {
        router.push(`/`)
      }
      allCategories.value = response.body
    }

    return {
      allCategories,
      updateCategoryHandler,
      removeCategoryHandler,
      addNewCategoryHandler,
      selectedCategoryIndex
    }
  }
}
</script>

<template>
  <div class="pageContainer">
    <MainMenu
      :allCategories="allCategories"
      :selectedCategoryIndex="selectedCategoryIndex"
      @removeCategory="removeCategoryHandler"
      @addNewCategory="addNewCategoryHandler"
    />
    <div class="container">
      <RouterView @updateCategory="updateCategoryHandler" />
    </div>
  </div>
</template>

<style>
:root {
  --margin: 24px;
}

body {
  padding: 0;
}

button,
input {
  box-sizing: border-box;
  height: 32px;
  margin: 0 4px;
  padding: 4px;
}

input {
  border: none;
}

input[type='text']:focus-visible {
  outline: none;
}

button {
  cursor: pointer;
  display: inline-block;
  border: none;
  vertical-align: baseline;
  border-radius: 4px;
  background-color: #ffffff;
  color: #1876d2;
}

button:hover {
  background-color: rgba(25, 118, 210, 0.04);
}

button:disabled {
  border-color: #406f9a;
  color: #406f9a;
  cursor: not-allowed;
}

.pageContainer {
  display: flex;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
}

button.btnRemove {
  width: 32px;
  border: none;
  color: #ff0101;
  background: transparent;
}

button.btnSquare {
  width: 32px;
  height: 32px;
}
</style>
