<template>
  <div class="markdown-view">
    <Markdown
    :source="source"
    :plugins="plugins"

    />
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';
import axios from 'axios';

export default {
  components: {
    Markdown
  },
  data() {
    return {
      source: '# .... Loading',
      plugins: [
      ]
    }
  },
  methods: {
    async getSource() {
      // const { data } = await axios.get('https://raw.githubusercontent.com/JanGuillermo/vue3-markdown-it/master/README.md');
      const { data } = await axios.get('https://raw.githubusercontent.com/bitnami/charts/main/bitnami/grafana/README.md');
      this.source = data;
    },
    getAssetTestFile() {
      this.source = require('@/assets/md/test.md');
    }
  },
  mounted() {
    this.getSource();
    // this.getAssetTestFile();
  }
}
</script>
<style scoped>
.markdown-view {
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>
