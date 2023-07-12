<template>
  <router-view />
  {{ data }}
</template>

<script>
import { apiEntries, apiGetDataVersionList } from '@/api/test';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const entries = ref([]);
    const data = ref([]);
    onMounted(async () => {
      entries.value = await apiEntries();
      data.value = await apiGetDataVersionList();
    });

    return {
      entries,
      data,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
