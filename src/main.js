import './assets/main.css'
import './assets/theme.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes'

createApp(App).use(router).mount('#app')
