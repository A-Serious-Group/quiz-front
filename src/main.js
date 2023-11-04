import { createApp } from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax3'
import router from './router'

import './vuesax.css'
import './index.css'
import 'material-icons';

const app = createApp(App)

app.use(Vuesax)
app.use(router)

app.mount('#app')
