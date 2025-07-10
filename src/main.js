import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { IonicVue } from '@ionic/vue'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './theme/calendar.css'

// ✅ 1. Crea una variabile per Pinia e registra il plugin
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// ✅ 2. Crea l'app e usa l'istanza Pinia modificata
const app = createApp(App)
app.use(IonicVue)
app.use(pinia) // usa quella con il plugin registrato
app.use(router)

// ✅ 3. Mount e gestione della classe 'has-footer'
router.isReady().then(() => {
  app.mount('#app')

  router.afterEach((to) => {
    const appEl = document.querySelector('ion-app')
    if (appEl) {
      const routesWithFooter = [
        '/home',
        '/obiettivi',
        '/calendario',
        '/piatti-salvati',
        '/impostazioni',
        '/select-meal',
        '/search-create-plate',
        '/add-plate-details',
        '/search-results',
        '/enter-quantity',
        '/food-summary',
      ]
      if (routesWithFooter.includes(to.path)) {
        appEl.classList.add('has-footer')
      } else {
        appEl.classList.remove('has-footer')
      }
    }
  })
})
