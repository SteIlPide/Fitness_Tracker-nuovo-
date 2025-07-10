<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Riepilogo dei dati inseriti:</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding">
      <div v-if="userStore.hasUserData">
        <!-- Dati del wireframe:  -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>I tuoi dati</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p><strong>Sesso:</strong> {{ userStore.userData.sesso || 'Non specificato' }}</p>
            <p>
              <strong>Altezza:</strong>
              {{
                userStore.userData.altezza ? userStore.userData.altezza + ' cm' : 'Non specificata'
              }}
            </p>
            <p><strong>Età:</strong> {{ userStore.userData.eta || 'Non specificata' }}</p>
            <p>
              <strong>Peso:</strong>
              {{ userStore.userData.peso ? userStore.userData.peso + ' kg' : 'Non specificato' }}
            </p>
            <p>
              <strong>Livello di attività:</strong>
              {{ formatActivityLevel(userStore.userData.livelloAttivita) || 'Non specificato' }}
            </p>
            <p>
              <strong>Obiettivo percorso:</strong>
              {{ formatObjective(userStore.userData.obiettivoPercorso) || 'Non specificato' }}
            </p>
            <p v-if="userStore.userData.pesoObiettivo">
              <strong>Peso obiettivo:</strong> {{ userStore.userData.pesoObiettivo }} kg
            </p>
            <p v-if="userStore.userData.tipoDieta">
              <strong>Tipo di dieta:</strong> {{ formatDietType(userStore.userData.tipoDieta) }}
            </p>
            <p v-if="userStore.userData.cibiEsclusi && userStore.userData.cibiEsclusi.length > 0">
              <strong>Cibi esclusi:</strong> {{ userStore.userData.cibiEsclusi.join(', ') }}
            </p>
            <p v-else><strong>Cibi esclusi:</strong> Nessuno</p>
          </ion-card-content>
        </ion-card>

        <ion-button expand="block" color="secondary" @click="modifyData" class="ion-margin-top"
          >Modifica dati</ion-button
        >
        <ion-button expand="block" @click="createPlan" class="ion-margin-top"
          >Crea il mio piano</ion-button
        >
      </div>
      <div v-else class="ion-text-center">
        <p>Nessun dato utente disponibile. Torna indietro per inserirli.</p>
        <ion-button @click="router.back()">Torna indietro</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user' // Importa lo store utente
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/vue'

const router = useRouter()
const userStore = useUserStore() // Inizializza lo store

// Funzioni di formattazione (rimangono le stesse)
const formatActivityLevel = (level) => {
  switch (level) {
    case 'sedentario':
      return 'Per nulla attivo'
    case 'leggermente_attivo':
      return 'Leggermente attivo'
    case 'attivo':
      return 'Attivo'
    case 'molto_attivo':
      return 'Molto attivo'
    default:
      return level
  }
}

const formatObjective = (objective) => {
  switch (objective) {
    case 'aumentare':
      return 'Aumentare di peso'
    case 'mantenere':
      return 'Mantenere il peso'
    case 'diminuire':
      return 'Diminuire di peso'
    default:
      return objective
  }
}

const formatDietType = (type) => {
  switch (type) {
    case 'standard':
      return 'Standard'
    case 'vegetariana':
      return 'Vegetariana'
    case 'vegana':
      return 'Vegana'
    case 'chetogenica':
      return 'Chetogenica'
    case 'senza_glutine':
      return 'Senza Glutine'
    default:
      return type
  }
}

// Funzione per tornare alla pagina di input dati
const modifyData = () => {
  router.push('/input-dati')
}

function calcolaFabbisognoCalorico(eta, peso, altezza, sesso, attivita, obiettivo) {
  let bmr

  if (sesso === 'maschio') {
    bmr = 10 * peso + 6.25 * altezza - 5 * eta + 5
  } else {
    bmr = 10 * peso + 6.25 * altezza - 5 * eta - 161
  }

  const fattoriAttivita = {
    sedentario: 1.2,
    leggermente_attivo: 1.375,
    attivo: 1.55,
    molto_attivo: 1.725,
  }
  bmr *= fattoriAttivita[attivita] || 1.2 // Default a sedentario se non specificato

  const obiettivoFattore = {
    aumentare: 500, // Aumenta il fabbisogno calorico
    mantenere: 0, // Mantiene il fabbisogno calorico
    diminuire: -500, // Diminuisce il fabbisogno calorico
  }
  bmr += obiettivoFattore[obiettivo] || 0 // Aggiunge o sottrae le calorie in base all'obiettivo
  return Math.round(bmr) // Arrotonda il risultato al numero intero più vicino
}
function calcolaAcquaDaBere(peso) {
  // Calcola l'acqua da bere in litri (circa 30-35 ml per kg di peso)
  let acquaDaBere
  acquaDaBere = Math.round(peso * 30)
  const livelloAttivita = {
    sedentario: 0,
    leggermente_attivo: 200,
    attivo: 500,
    molto_attivo: 800,
  }
  // Aggiunge un extra in base al livello di attività
  acquaDaBere += livelloAttivita[userStore.userData.livelloAttivita] || 0 // Default a sedentario se non specificato
  acquaDaBere = Math.round(acquaDaBere / 1000).toFixed(1) // Converte in litri
  return acquaDaBere // Restituisce l'acqua da bere in litri
}
// Funzione per creare il piano e navigare alla schermata principale
const createPlan = () => {
  // Calcolo fabbisogno calorico
  const fabbisogno = calcolaFabbisognoCalorico(
    userStore.userData.eta,
    userStore.userData.peso,
    userStore.userData.altezza,
    userStore.userData.sesso,
    userStore.userData.livelloAttivita,
    userStore.userData.obiettivoPercorso,
  )
  if (userStore.userData.obiettivoPercorso === 'aumentare') {
    userStore.dailyTargetProteins = Math.round((fabbisogno * 0.3) / 4) // 30% delle calorie da proteine
    userStore.dailyTargetCarbs = Math.round((fabbisogno * 0.5) / 4) // 50% delle calorie da carboidrati
    userStore.dailyTargetFats = Math.round((fabbisogno * 0.2) / 9) // 20% delle calorie da grassi
  } else if (userStore.userData.obiettivoPercorso === 'diminuire') {
    userStore.dailyTargetProteins = Math.round((fabbisogno * 0.3) / 4) // 30% delle calorie da proteine
    userStore.dailyTargetCarbs = Math.round((fabbisogno * 0.4) / 4) // 40% delle calorie da carboidrati
    userStore.dailyTargetFats = Math.round((fabbisogno * 0.3) / 9) // 30% delle calorie da grassi
  } else {
    //Mantenere il peso
    userStore.dailyTargetProteins = Math.round((fabbisogno * 0.25) / 4) // 25% delle calorie da proteine
    userStore.dailyTargetCarbs = Math.round((fabbisogno * 0.5) / 4) // 50% delle calorie da carboidrati
    userStore.dailyTargetFats = Math.round((fabbisogno * 0.25) / 9) // 25% delle calorie da grassi
  }

  //Calcolo dell'acqua da bere giornaliera
  let acquaDaBere = calcolaAcquaDaBere(userStore.userData.peso)
  // I dati sono già disponibili in userStore.userData
  userStore.dailyTargetKcal = fabbisogno
  userStore.waterTargetLiters = acquaDaBere

  router.push('/home') // Naviga alla schermata principale dell'app
}
</script>

<style scoped>
ion-card {
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

ion-card-header {
  --background: #f0f0f0;
  border-bottom: 1px solid #eee;
  border-radius: 15px 15px 0 0;
}

ion-card-title {
  font-size: 1.4em;
  color: #333;
}

ion-card-content p {
  margin-bottom: 8px;
  color: #555;
  line-height: 1.5;
}

ion-card-content strong {
  color: #333;
}

ion-button {
  --border-radius: 10px;
  height: 48px;
  font-size: 1.05em;
  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

ion-button[color='secondary'] {
  --background: #ffc107;
  --background-activated: #ffa000;
  --color: #333;
}

ion-button:not([color='secondary']) {
  --background: #4caf50;
  --background-activated: #45a049;
}
</style>
