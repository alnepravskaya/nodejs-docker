<script lang="ts">
import MainMenu from './components/MainMenu/MainMenu.vue'

export default {
  components: {
    MainMenu
  }
}
</script>

<template>
  <Suspense>
    <div class="pageContainer">
      <MainMenu />
      <div class="container">
        <RouterView />
      </div>
    </div>
  </Suspense>
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
