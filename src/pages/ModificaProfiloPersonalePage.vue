<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Modifica Profilo</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-label position="stacked"
            >Età attuale: {{ userStore.userData.eta ?? 'N/A' }}</ion-label
          >
          <ion-input type="number" v-model="eta" label="Nuova età"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked"
            >Sesso attuale: {{ userStore.userData.sesso ?? 'N/A' }}</ion-label
          >
          <ion-select v-model="sesso" interface="popover">
            <ion-select-option value="maschio">Maschio</ion-select-option>
            <ion-select-option value="femmina">Femmina</ion-select-option>
            <ion-select-option value="altro">Altro</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label position="stacked"
            >Altezza attuale: {{ userStore.userData.altezza ?? 'N/A' }} cm</ion-label
          >
          <ion-input type="number" v-model="altezza" label="Nuova altezza (cm)"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked"
            >Peso attuale: {{ userStore.userData.peso ?? 'N/A' }} kg</ion-label
          >
          <ion-input type="number" v-model="peso" label="Nuovo peso (kg)"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button expand="block" @click="salvaDati"> Salva </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const eta = ref(userStore.userData.eta ?? '')
const sesso = ref(userStore.userData.sesso ?? '')
const altezza = ref(userStore.userData.altezza ?? '')
const peso = ref(userStore.userData.peso ?? '')

function salvaDati() {
  userStore.userData.eta = eta.value
  userStore.userData.sesso = sesso.value
  userStore.userData.altezza = altezza.value
  userStore.userData.peso = peso.value

  router.push({ name: 'Impostazioni' })
}
</script>
