<script lang="ts">
import { Category } from '@/types/common'
import { todoService } from '../../../services/todoService'
import { useRoute, useRouter } from 'vue-router'

export default {
  props: {
    category: { type: Object as Category }
  },

  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const removeCategoryHandler = async (e: Event) => {
      e.preventDefault()
      await todoService.removeCategory(props.category.id)

      if (route.params.id === props.category.id) {
        router.push(`/`)
      }
    }
    return {
      removeCategoryHandler
    }
  }
}
</script>

<template>
  <RouterLink class="menuItemValue" :to="{ path: '/categories/' + category.id }">
    {{ category.name }}
    <button class="btnRemove" @click="removeCategoryHandler">X</button>
  </RouterLink>
</template>

<style scoped>
.router-link-active {
  background: #175088;
}

.menuItemValue {
  box-sizing: border-box;
  width: calc(100% - 32px);
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  text-decoration: none;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.menuItem button.btnRemove {
  margin: 0;
  border-radius: 0;
}

button.btnRemove {
  position: absolute;
  top: 0;
  right: 0;
  height: 48px;
}

.menuItemValue.router-link-active button.btnRemove {
  background: #175088;
}

button.btnRemove:hover {
  color: #ff4545;
}

input:focus-visible {
  outline: none;
}

.btnRemove {
  opacity: 0;
}

.menuItem:hover .btnRemove {
  opacity: 1;
}

.menuItemValue.router-link-active button.btnRemove {
  background: #175088;
  opacity: 1;
}
</style>
