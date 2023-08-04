<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useBreadCrumbsStore } from '@/stores/breadCrumbsStore';

const route = useRoute();
const breadCrumbsStore = useBreadCrumbsStore();
onMounted(() => {
  breadCrumbsStore.clearBreadCrumbs();
  breadCrumbsStore.addBreadCrumb(
    {
      title: 'Dashboard',
      to: route.path,
      disabled: true
    }
  );
}
);
</script>
