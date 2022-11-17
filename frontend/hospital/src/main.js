import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style.css'

// export const listPacientes = new Vue();

// new Vue({
//  el: '#app',
//  render: h => h(App)
// })

const app = createApp(App)

app.use(router)

app.mount('#app')
