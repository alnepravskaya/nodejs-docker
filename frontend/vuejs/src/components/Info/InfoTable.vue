<template>
  <div class="info">
    <h3>Navigation Shortcuts</h3>
    <table>
      <tbody>
        <tr>
          <td>
            <span class="keyEvent">Tab</span>
          </td>
          <td class="text">Shift field on new level(max level is 4)</td>
        </tr>
        <tr>
          <td>
            <span class="keyEvent">Tab</span> +
            <span class="keyEvent">Shift</span>
          </td>
          <td class="text">Unshift field on new level</td>
        </tr>
        <tr>
          <td>
            <span class="keyEvent">Command</span> +
            <span class="keyEvent">Enter</span>
          </td>
          <td class="text">Check/Uncheck current field</td>
        </tr>
        <tr>
          <td>
            <span class="keyEvent">Enter</span>
          </td>
          <td class="text">Update field and create new field</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.info {
  flex: none;
  margin-left: auto;
  padding: 16px;
  background: #fafafa;
}

.keyEvent {
  padding: 0 4px;
  background: #fff;
  border-width: 1px;
  border-radius: 3px;
  border-style: solid;
  border-color: #d5d5d5;
}

.text {
  padding: 0 8px;
}

@media (max-width: 1200px) {
  .info {
    display: none;
  }
}
</style>
