<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon size="small" icon="$vuetify"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup>
import { useBreadCrumbsStore } from '@/stores/breadCrumbsStore';
import { computed } from 'vue';

const breadCrumbsStore = useBreadCrumbsStore();
const items = computed(() => breadCrumbsStore.breadCrumbs);
</script>
