<script lang="ts">
import MenuItem from './MenuItem.vue'
import AddCategory from './AddCategory.vue'
import { Category } from '@/types/common'

export default {
  components: {
    MenuItem,
    AddCategory
  },
  emits: ['removeCategory', 'addNewCategory'],
  props: {
    allCategories: { type: Array as Category[] },
    selectedCategoryIndex: Number
  }
}
</script>

<template>
  <nav class="menu">
    <ul>
      <li
        v-for="(category, index) in allCategories"
        class="menuItem"
        :key="category.id"
        :class="{ active: selectedCategoryIndex === index }"
      >
        <MenuItem :category="category" @removeCategory="$emit('removeCategory', $event)" />
      </li>
      <li>
        <AddCategory @addNewCategory="$emit('addNewCategory', $event)" />
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
