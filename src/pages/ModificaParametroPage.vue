<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <template v-slot:start>
          <ion-buttons>
            <ion-back-button defaultHref="/impostazioni" />
          </ion-buttons>
        </template>
        <ion-title>Modifica {{ label }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ label }} attuale</ion-card-title>
          <ion-text color="medium" class="ion-margin-top">
            <p>{{ valoreAttuale }} {{ unita }}</p>
          </ion-text>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-label position="stacked">Nuovo {{ label }}</ion-label>
            <ion-input
              v-model="nuovoValore"
              :type="inputType"
              :placeholder="'Inserisci nuovo ' + label.toLowerCase()"
            />
          </ion-item>

          <ion-button expand="block" class="ion-margin-top" @click="salva"> Salva </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const parametro = route.query.parametro
const label = route.query.label || 'Parametro'
const inputType = route.query.type || 'text'

const nuovoValore = ref('')
const valoreAttuale = ref('')
const unita = ref('')

onMounted(() => {
  switch (parametro) {
    case 'pesoObiettivo':
      valoreAttuale.value = userStore.userData.pesoObiettivo ?? 'N/A'
      unita.value = 'Kg'
      break
    case 'livelloAttivita':
      valoreAttuale.value = userStore.userData.livelloAttivita ?? 'N/A'
      break
    case 'obiettivoPercorso':
      valoreAttuale.value = userStore.userData.obiettivoPercorso ?? 'N/A'
      break
    default:
      valoreAttuale.value = 'N/A'
  }
})

function salva() {
  if (nuovoValore.value === '') return

  switch (parametro) {
    case 'pesoObiettivo':
      userStore.userData.pesoObiettivo = Number(nuovoValore.value)
      break
    case 'livelloAttivita':
      userStore.userData.livelloAttivita = nuovoValore.value
      break
    case 'obiettivoPercorso':
      userStore.userData.obiettivoPercorso = nuovoValore.value
      break
  }

  router.push('/impostazioni')
}
</script>

<style scoped>
ion-card-title,
ion-label {
  font-weight: bold;
}
</style>
