// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Pinia
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())

registerPlugins(app)

app.mount('#app')
