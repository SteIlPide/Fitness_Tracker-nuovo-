<template>
  <ion-page :key="$route.fullPath">
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

          <ion-button expand="block" class="ion-margin-top" @click="salva">Salva</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// Computed per leggere sempre i parametri aggiornati dalla query
const parametro = computed(() => route.query.parametro)
const label = computed(() => route.query.label || 'Parametro')
const inputType = computed(() => route.query.type || 'text')

const nuovoValore = ref('')
const valoreAttuale = ref('')
const unita = ref('')

// Watch per aggiornare valore attuale ogni volta che cambia parametro
watch(parametro, aggiornaValoreAttuale, { immediate: true })

function aggiornaValoreAttuale() {
  console.log('DEBUG parametro:', parametro.value)
  switch (parametro.value) {
    case 'pesoObiettivo':
      valoreAttuale.value = userStore.userData.pesoObiettivo ?? 'N/A'
      unita.value = 'Kg'
      break
    case 'livelloAttivita':
      valoreAttuale.value = userStore.userData.livelloAttivita ?? 'N/A'
      unita.value = ''
      break
    case 'obiettivoPercorso':
      valoreAttuale.value = userStore.userData.obiettivoPercorso ?? 'N/A'
      unita.value = ''
      break
    default:
      valoreAttuale.value = 'N/A'
      unita.value = ''
  }
}

function salva() {
  if (nuovoValore.value === '') return

  switch (parametro.value) {
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

  router.back()
}
</script>

<style scoped>
ion-card-title,
ion-label {
  font-weight: bold;
}
</style>
