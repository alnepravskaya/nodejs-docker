<script lang="ts">
import TodoList from '@/components/TodoList/TodoList.vue'
import TodoHeader from '@/components/TodoList/TodoHeader.vue'
import InfoTable from '@/components/Info/InfoTable.vue'
import { useRoute, useRouter } from 'vue-router'
import { reactive, watch } from 'vue'
import { todoService } from '../../services/todoService'
import { v4 as uuidv4 } from 'uuid'

export default {
  emits: ['updateCategory'],
  components: {
    TodoList,
    TodoHeader,
    InfoTable
  },
  async setup() {
    const route = useRoute()
    const router = useRouter()

    const categoryInfo = reactive({ list: [], name: '', id: '' })

    watch(route, async () => {
      await updateCategoryInfo()
    })

    const updateCategoryInfo = async () => {
      const selectedCategoryIndexValue = todoService.allCategories.value.findIndex(
        ({ id }) => id === route.params.id
      )

      if (selectedCategoryIndexValue > -1) {
        const { list, name, id } = await todoService.getCategoryInfo(route.params.id as string)

        if (list[list.length - 1]?.text === '') {
          categoryInfo.list = list
        } else {
          categoryInfo.list = list.concat({
            id: uuidv4(),
            text: '',
            isDone: false,
            level: 0
          })
        }
        categoryInfo.name = name
        categoryInfo.id = id
      } else {
        router.push(`/`)
      }
    }

    await updateCategoryInfo()

    return {
      categoryInfo
    }
  }
}
</script>
<template>
  <div class="categoryContainer">
    <TodoHeader :name="categoryInfo.name" :id="categoryInfo.id" />
    <TodoList :todoListInitial="categoryInfo.list" />
  </div>
  <InfoTable />
</template>

<style scoped>
.categoryContainer {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  padding: 16px;
  box-sizing: border-box;
}
</style>
