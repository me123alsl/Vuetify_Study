<template>
  <div>
    <h1>Home</h1>
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
      title: route.meta.breadcrumb,
      to: route.path,
      disabled: true
    }
  );
}
);
</script>
