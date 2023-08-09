// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Pinia
import { createPinia } from 'pinia'

// markdonw-it
import Markdown from 'vue3-markdown-it'
import 'highlight.js/styles/monokai.css';

const app = createApp(App)
app.use(createPinia())
app.use(Markdown)

registerPlugins(app)

app.mount('#app')
