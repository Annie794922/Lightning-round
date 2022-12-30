import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入CSS reset影響全域(前方不用@符號；影響全域的是CSS而非SCSS，因此適合引入reset和第三方套件等檔案)
import "./assets/scss/normalize.scss"

createApp(App).use(store).use(router).mount('#app')
