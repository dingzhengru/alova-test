<template>
  <div>
    <h1>Home</h1>
    {{ todo }}
  </div>
</template>

<script>
import { apiEntries, /*apiGetDataVersionList,*/ apiGetTodoList } from '@/api/test';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const entries = ref([]);
    const data = ref([]);
    const todo = ref([]);
    onMounted(async () => {
      entries.value = await apiEntries();
      // data.value = await apiGetDataVersionList();
      todo.value = await apiGetTodoList();
    });

    return {
      entries,
      data,
      todo,
    };
  },
};
</script>
