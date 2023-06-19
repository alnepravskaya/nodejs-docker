<script lang="ts">
import TodoList from '@/components/TodoList/TodoList.vue'
import TodoHeader from '@/components/TodoList/TodoHeader.vue'
import { useRoute } from 'vue-router'
import { onMounted, reactive, watch } from 'vue'
import { todoService } from '../../services/todoService'
import { v4 as uuidv4 } from 'uuid'

export default {
  emits: ['updateCategory'],
  components: {
    TodoList,
    TodoHeader
  },
  setup() {
    const router = useRoute()
    const categoryInfo = reactive({ list: [], name: '', id: '' })

    const updateCategoryInfo = async () => {
      const { list, name, id } = await todoService.getCategoryInfo(router.params.id as string)
      categoryInfo.list = list.concat({
        id: uuidv4(),
        text: '',
        isDone: false,
        level: 0
      })
      categoryInfo.name = name
      categoryInfo.id = id
    }

    onMounted(async () => {
      await updateCategoryInfo()
    })

    watch(router, async () => {
      await updateCategoryInfo()
    })

    return {
      categoryInfo,
      categoryId: router.params.id
    }
  }
}
</script>
<template>
  <div>
    <TodoHeader
      @updateCategory="$emit('updateCategory', $event)"
      :name="categoryInfo.name"
      :id="categoryInfo.id"
    />
    <TodoList :todoListInitial="categoryInfo.list" />
  </div>
</template>

<style></style>
