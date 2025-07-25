import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@/assets/css/style.css'
import App from '@/App.vue'
import router from '@/router'
import i18n from '@/i18n'

const app = createApp(App)
const pinia = createPinia()

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
})

// Load saved locale from localStorage
const savedLocale = localStorage.getItem('locale')
if (savedLocale) {
  i18n.global.locale.value = savedLocale
}

app.use(pinia)
app.use(Antd)
app.use(router)
app.use(i18n)
app.mount('#app')
