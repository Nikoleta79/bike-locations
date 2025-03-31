<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #333;
}

[data-theme="dark"] {
  --bg-color: #222;
  --text-color: #fff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
</style>

