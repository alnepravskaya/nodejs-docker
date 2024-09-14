<script lang="ts">
import MenuItem from './MenuItem.vue'
import AddCategory from './AddCategory.vue'
import { todoService } from '../../../services/todoService'

export default {
  components: {
    MenuItem,
    AddCategory
  },
  async setup() {
    await todoService.getAllCategories()

    return {
      allCategories: todoService.allCategories,
      todoService
    }
  }
}
</script>

<template>
  <nav class="menu">
    <ul>
      <li v-for="category in allCategories" class="menuItem" :key="category.id">
        <MenuItem :category="category" />
      </li>
      <li>
        <AddCategory />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.menu {
  width: 210px;
  height: 100vh;
  overflow: scroll;
  background: #1876d2;
  flex: none;
}

.menu ul {
  padding-left: 0;
  margin: 0;
}

.menuItem {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

@media (max-width: 800px) {
  .menu {
    width: 110px;
  }
}
</style>
