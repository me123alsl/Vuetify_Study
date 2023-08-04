import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useBreadCrumbsStore = defineStore("breadCrumbs", () => {
  const breadCrumbs = ref([]);
  function addBreadCrumb(breadCrumb) {
    if (breadCrumbs.value.length > 0) {
      breadCrumbs.value[breadCrumbs.value.length - 1].disabled = false;
    }
    breadCrumbs.value.push(breadCrumb);
  }
  function removeBreadCrumb(breadCrumb) {
    breadCrumbs.value.splice(breadCrumbs.value.indexOf(breadCrumb), 1);
  }
  function clearBreadCrumbs() {
    breadCrumbs.value = [];
  }
  const getBreadCrumbs = computed(() => {
    return breadCrumbs.value;
  });

  return {
    breadCrumbs,
    addBreadCrumb,
    removeBreadCrumb,
    clearBreadCrumbs,
    getBreadCrumbs,
  };
});
