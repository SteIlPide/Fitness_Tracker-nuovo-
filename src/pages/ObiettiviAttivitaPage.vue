<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Modifica Obiettivi</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h3>Attività fisica</h3>
      <!-- Itera sui dati dello store -->
      <div
        v-for="attivita in obiettiviStore.attivitaFisica"
        :key="attivita.id"
        class="editable-item"
      >
        <span>{{ attivita.nome }} - {{ attivita.minuti }} minuti</span>
        <!-- Passa l'ID per la modifica -->
        <button class="edit-button" @click="modificaElemento('attivitaFisica', attivita.id)">
          ✏️
        </button>
      </div>

      <ion-button expand="block" @click="aggiungiElemento('attivitaFisica')">
        ➕ Aggiungi Attività Fisica
      </ion-button>

      <h3>Peso</h3>
      <!-- Itera sui dati dello store -->
      <div v-for="peso in obiettiviStore.peso" :key="peso.id" class="editable-item">
        <span>{{ peso.data }} - {{ peso.valore }} kg</span>
        <!-- Passa l'ID per la modifica -->
        <button class="edit-button" @click="modificaElemento('peso', peso.id)">✏️</button>
      </div>

      <ion-button expand="block" @click="aggiungiElemento('peso')"> ➕ Aggiungi Peso </ion-button>

      <!-- Modal -->
      <div v-if="showModal" class="modal-backdrop">
        <div class="modal">
          <h3>Modifica {{ tipoElemento === 'attivitaFisica' ? 'Attività' : 'Peso' }}</h3>

          <div v-if="tipoElemento === 'attivitaFisica'">
            <label>Nome:</label>
            <input v-model="elementoCorrente.nome" type="text" />
            <label>Minuti:</label>
            <input v-model.number="elementoCorrente.minuti" type="number" />
          </div>

          <div v-else-if="tipoElemento === 'peso'">
            <label>Data:</label>
            <input v-model="elementoCorrente.data" type="date" />
            <label>Valore (kg):</label>
            <input v-model.number="elementoCorrente.valore" type="number" step="0.1" />
          </div>

          <div class="modal-buttons">
            <button @click="salvaModifiche">Salva</button>
            <button class="cancel" @click="annullaModifica">Annulla</button>
            <button class="delete" @click="rimuoviElemento">Elimina</button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/vue'
import { ref, reactive } from 'vue'
import { useObiettiviStore } from '@/stores/obiettivi' // Importa il nuovo store
import { v4 as uuidv4 } from 'uuid' // Necessario per generare ID temporanei per i nuovi elementi prima di salvarli

const obiettiviStore = useObiettiviStore() // Inizializza lo store

const showModal = ref(false)
const tipoElemento = ref('')
const idCorrente = ref(null) // Ora usiamo l'ID invece dell'indice
const elementoCorrente = reactive({}) // Oggetto reattivo per i dati del form modale

function modificaElemento(tipo, id) {
  tipoElemento.value = tipo
  idCorrente.value = id // Salva l'ID dell'elemento che stiamo modificando

  let itemToEdit
  if (tipo === 'attivitaFisica') {
    itemToEdit = obiettiviStore.attivitaFisica.find((a) => a.id === id)
  } else if (tipo === 'peso') {
    itemToEdit = obiettiviStore.peso.find((p) => p.id === id)
  }

  if (itemToEdit) {
    // Copia profonda per evitare modifiche dirette all'array dello store prima del salvataggio
    Object.assign(elementoCorrente, JSON.parse(JSON.stringify(itemToEdit)))
    showModal.value = true
    console.log('DEBUG: Modifica elemento. Elemento corrente:', elementoCorrente)
  }
}

function aggiungiElemento(tipo) {
  tipoElemento.value = tipo
  idCorrente.value = null // Indica che è un nuovo elemento

  // Inizializza elementoCorrente con un nuovo ID temporaneo
  if (tipo === 'attivitaFisica') {
    Object.assign(elementoCorrente, { id: uuidv4(), nome: '', minuti: 0 })
  } else if (tipo === 'peso') {
    Object.assign(elementoCorrente, {
      id: uuidv4(),
      data: new Date().toISOString().slice(0, 10),
      valore: 0,
    })
  }

  showModal.value = true
  console.log('DEBUG: Aggiungi elemento. Elemento corrente resettato:', elementoCorrente)
}

function salvaModifiche() {
  console.log(
    'DEBUG: Salvataggio modifiche. Tipo:',
    tipoElemento.value,
    'ID:',
    idCorrente.value,
    'Elemento:',
    elementoCorrente,
  )

  // Validazione (puoi sostituire alert con un componente Ionic per una migliore UX)
  if (tipoElemento.value === 'attivitaFisica') {
    if (
      !elementoCorrente.nome ||
      elementoCorrente.minuti === undefined ||
      elementoCorrente.minuti < 0
    ) {
      alert("Per favore, inserisci un nome e minuti validi per l'attività.")
      return
    }
  } else if (tipoElemento.value === 'peso') {
    if (
      !elementoCorrente.data ||
      elementoCorrente.valore === undefined ||
      elementoCorrente.valore <= 0
    ) {
      alert('Per favore, inserisci una data e un valore di peso validi.')
      return
    }
  }

  // Crea una copia dell'elemento corrente da passare allo store
  const elementoDaSalvare = JSON.parse(JSON.stringify(elementoCorrente))

  if (idCorrente.value === null) {
    // Aggiungi nuovo elemento usando l'azione dello store
    if (tipoElemento.value === 'attivitaFisica') {
      obiettiviStore.addAttivita(elementoDaSalvare)
    } else if (tipoElemento.value === 'peso') {
      obiettiviStore.addPeso(elementoDaSalvare)
    }
    console.log('DEBUG: Nuovo elemento aggiunto tramite store:', elementoDaSalvare)
  } else {
    // Modifica esistente usando l'azione dello store
    if (tipoElemento.value === 'attivitaFisica') {
      obiettiviStore.updateAttivita(elementoDaSalvare)
    } else if (tipoElemento.value === 'peso') {
      obiettiviStore.updatePeso(elementoDaSalvare)
    }
    console.log('DEBUG: Elemento esistente modificato tramite store:', elementoDaSalvare)
  }

  showModal.value = false
  Object.assign(elementoCorrente, {}) // Resetta elementoCorrente dopo il salvataggio
}

function annullaModifica() {
  showModal.value = false
  Object.assign(elementoCorrente, {}) // Resetta elementoCorrente all'annullamento
  console.log('DEBUG: Modifica annullata.')
}

function rimuoviElemento() {
  if (idCorrente.value !== null) {
    // Rimuovi elemento usando l'azione dello store
    if (tipoElemento.value === 'attivitaFisica') {
      obiettiviStore.deleteAttivita(idCorrente.value)
    } else if (tipoElemento.value === 'peso') {
      obiettiviStore.deletePeso(idCorrente.value)
    }
    console.log('DEBUG: Elemento rimosso tramite store con ID:', idCorrente.value)
  }
  showModal.value = false
  Object.assign(elementoCorrente, {}) // Resetta elementoCorrente dopo la rimozione
}
</script>

<style scoped>
/* Stili esistenti (non modificati) */
.editable-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #ddd;
}
.editable-item:nth-child(odd) {
  background-color: #f9f9f9;
}
.edit-button {
  background: none;
  border: none;
  color: #007bff;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
}
input {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 0.5rem;
}
button:hover {
  background-color: #0056b3;
}
button.cancel {
  background-color: #6c757d;
}
button.cancel:hover {
  background-color: #5a6268;
}
button.delete {
  background-color: #dc3545;
}
button.delete:hover {
  background-color: #c82333;
}
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
