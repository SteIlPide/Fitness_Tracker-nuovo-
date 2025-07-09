<template>
  <div>
    <h2>Modifica Obiettivi</h2>

    <h3>Attività fisica</h3>
    <div v-for="(attivita, index) in obiettivi.attivitaFisica" :key="index" class="editable-item">
      <span>{{ attivita.nome }} - {{ attivita.minuti }} minuti</span>
      <button class="edit-button" @click="modificaElemento('attivitaFisica', index)">✏️</button>
    </div>

    <h3>Peso</h3>
    <div v-for="(peso, index) in obiettivi.peso" :key="index" class="editable-item">
      <span>{{ peso.data }} - {{ peso.valore }} kg</span>
      <button class="edit-button" @click="modificaElemento('peso', index)">✏️</button>
    </div>

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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const obiettivi = reactive({
  attivitaFisica: [
    { nome: 'Corsa', minuti: 30 },
    { nome: 'Nuoto', minuti: 45 },
  ],
  peso: [
    { data: '2025-07-01', valore: 70 },
    { data: '2025-07-08', valore: 69.5 },
  ],
})

const showModal = ref(false)
const tipoElemento = ref('')
const indiceCorrente = ref(-1)
const elementoCorrente = reactive({})

function modificaElemento(tipo, index) {
  tipoElemento.value = tipo
  indiceCorrente.value = index
  Object.assign(elementoCorrente, JSON.parse(JSON.stringify(obiettivi[tipo][index])))
  showModal.value = true
}

function salvaModifiche() {
  if (tipoElemento.value === 'attivitaFisica') {
    if (!elementoCorrente.nome || elementoCorrente.minuti === undefined) return
  } else if (tipoElemento.value === 'peso') {
    if (!elementoCorrente.data || elementoCorrente.valore === undefined) return
  }
  obiettivi[tipoElemento.value][indiceCorrente.value] = JSON.parse(JSON.stringify(elementoCorrente))
  showModal.value = false
}

function annullaModifica() {
  showModal.value = false
}

function rimuoviElemento() {
  obiettivi[tipoElemento.value].splice(indiceCorrente.value, 1)
  showModal.value = false
}
</script>

<style scoped>
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
