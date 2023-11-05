import { createApp } from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax3'
import router from './router'

import 'vuesax3/dist/vuesax.css'
import './index.css'
import './assets/scss/main.scss'

const app = createApp(App)

app.use(Vuesax)
app.use(router)

app.mount('#app')
