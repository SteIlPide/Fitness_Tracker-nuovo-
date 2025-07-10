<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <template v-slot:start>
          <ion-buttons>
            <ion-back-button></ion-back-button>
          </ion-buttons>
        </template>
        <ion-title>Impostazioni</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <!-- Sezione IMPOSTAZIONI GENERALI -->
      <ion-card class="settings-card">
        <ion-card-header>
          <ion-card-title class="section-title">IMPOSTAZIONI GENERALI</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="full">
            <!-- Impostazione: Notifiche -->
            <ion-item @click="debugItemClick('Notifiche')">
              <ion-label>Notifiche</ion-label>
              <template v-slot:end>
                <ion-toggle
                  :checked="userStore.notificationsEnabled"
                  @ionChange="toggleNotifications($event)"
                  aria-label="Abilita/Disabilita Notifiche"
                />
              </template>
            </ion-item>

            <!-- Impostazione: Unità di Misura -->
            <ion-item @click="debugItemClick('Unità di Misura')">
              <ion-label>Unità di Misura</ion-label>
              <template v-slot:end>
                <ion-select
                  :value="userStore.unitSystem"
                  @ionChange="setUnitSystem($event)"
                  aria-label="Seleziona Unità di Misura"
                >
                  <ion-select-option value="metric">Metrico (kg, cm, L)</ion-select-option>
                  <ion-select-option value="imperial"
                    >Imperiale (lbs, pollici, gal)</ion-select-option
                  >
                </ion-select>
              </template>
            </ion-item>

            <!-- Impostazione: Tema App -->
            <ion-item @click="debugItemClick('Tema App')">
              <ion-label>Tema App</ion-label>
              <template v-slot:end>
                <ion-select
                  :value="userStore.appTheme"
                  @ionChange="setAppTheme($event)"
                  aria-label="Seleziona Tema App"
                >
                  <ion-select-option value="system">Sistema</ion-select-option>
                  <ion-select-option value="light">Chiaro</ion-select-option>
                  <ion-select-option value="dark">Scuro</ion-select-option>
                </ion-select>
              </template>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- Sezione OBIETTIVI PERSONALIZZATI -->
      <ion-card class="settings-card">
        <ion-card-header>
          <ion-card-title class="section-title">OBIETTIVI PERSONALIZZATI</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="full">
            <ion-item button detail>
              <ion-label>Obiettivi Nutrizionali e Acqua</ion-label>
              <template v-slot:end>
                <ion-text>N/A kcal, N/A L</ion-text>
              </template>
            </ion-item>
            <ion-item>
              <ion-label>Obiettivo peso</ion-label>
              <template v-slot:end>
                <ion-text>N/A Kg</ion-text>
              </template>
            </ion-item>
            <ion-item>
              <ion-label>Livello attività</ion-label>
              <template v-slot:end>
                <ion-text>N/A</ion-text>
              </template>
            </ion-item>
            <ion-item>
              <ion-label>Obiettivo percorso</ion-label>
              <template v-slot:end>
                <ion-text>N/A</ion-text>
              </template>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- Sezione PROFILO PERSONALE -->
      <ion-card class="settings-card">
        <ion-card-header>
          <ion-card-title class="section-title">PROFILO PERSONALE</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="full">
            <ion-item button detail>
              <ion-label>Età, sesso, altezza, peso</ion-label>
              <template v-slot:end>
                <ion-text>N/A anni, N/A, N/A cm, N/A kg</ion-text>
              </template>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- Sezione PREFERENZE ALIMENTARI -->
      <ion-card class="settings-card">
        <ion-card-header>
          <ion-card-title class="section-title">PREFERENZE ALIMENTARI</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="full">
            <ion-item button detail>
              <ion-label>Tipo di dieta</ion-label>
              <template v-slot:end>
                <ion-text>Nessuna</ion-text>
              </template>
            </ion-item>
            <ion-item button detail>
              <ion-label>Cibi esclusi</ion-label>
              <template v-slot:end>
                <ion-text>Nessuno</ion-text>
              </template>
            </ion-item>
            <ion-item button detail>
              <ion-label>Allergeni</ion-label>
              <template v-slot:end>
                <ion-text>Nessuno</ion-text>
              </template>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/vue'
import { useUserStore } from '../stores/user'
import { onMounted } from 'vue' // Importa onMounted

const userStore = useUserStore()

// --- Funzioni per Impostazioni Generali ---
const toggleNotifications = (event) => {
  console.log('DEBUG: Cliccato Notifiche. Valore:', event.detail.checked)
  userStore.setNotificationsEnabled(event.detail.checked)
  console.log('DEBUG: Notifiche abilitate (store):', userStore.notificationsEnabled)
}

const setUnitSystem = (event) => {
  console.log('DEBUG: Cliccato Unità di Misura. Valore:', event.detail.value)
  userStore.setUnitSystem(event.detail.value)
  console.log('DEBUG: Sistema di unità (store):', userStore.unitSystem)
}

const setAppTheme = (event) => {
  console.log('DEBUG: Cliccato Tema App. Valore:', event.detail.value)
  userStore.setAppTheme(event.detail.value)
  console.log('DEBUG: Tema App (store):', userStore.appTheme)
}

// Nuova funzione di debug per il click sull'item
const debugItemClick = (itemName) => {
  console.log(`DEBUG: Cliccato sull'elemento della lista: ${itemName}`)
}

// Log iniziale dello stato dello store quando il componente è montato
onMounted(() => {
  console.log('DEBUG: Stato iniziale dello userStore:')
  console.log('  notificationsEnabled:', userStore.notificationsEnabled)
  console.log('  unitSystem:', userStore.unitSystem)
  console.log('  appTheme:', userStore.appTheme)
})
</script>

<style scoped>
ion-toolbar {
  --background: #f8f8f8;
  --color: #333;
}

ion-title {
  font-size: 1.2em;
  font-weight: bold;
}

.settings-card {
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
}

.settings-card:first-of-type {
  margin-top: 0;
}

ion-card-header {
  padding-bottom: 0;
}

.section-title {
  font-size: 0.9em;
  font-weight: bold;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 10px;
  padding-left: 16px;
}

ion-list {
  background: transparent;
  padding-top: 0;
}

ion-item {
  --background: transparent;
  --padding-start: 16px;
  --inner-padding-end: 16px;
  --min-height: 50px;
  font-size: 1.05em;
  color: #333;
  /* Rimuovi i debug CSS aggressivi qui per non nascondere */
}

ion-item:last-of-type {
  --border-width: 0;
}

/* Rimuovi i debug CSS aggressivi per ion-toggle e ion-select */
</style>
