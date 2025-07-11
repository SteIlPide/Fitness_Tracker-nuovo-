// src/stores/obiettivi.js
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid' // Importa uuid per generare ID unici

export const useObiettiviStore = defineStore('obiettivi', {
  state: () => ({
    // Inizializza con alcuni dati di esempio, ognuno con un ID unico
    attivitaFisica: [
      { id: uuidv4(), nome: 'Corsa', minuti: 30 },
      { id: uuidv4(), nome: 'Nuoto', minuti: 45 },
    ],
    peso: [
      { id: uuidv4(), data: '2025-07-01', valore: 70 },
      { id: uuidv4(), data: '2025-07-08', valore: 69.5 },
    ],
  }),
  actions: {
    // Azioni per le attività fisiche
    addAttivita(attivita) {
      this.attivitaFisica.push({ ...attivita, id: uuidv4() }) // Assicura un nuovo ID se non già presente
    },
    updateAttivita(updatedAttivita) {
      const index = this.attivitaFisica.findIndex((a) => a.id === updatedAttivita.id)
      if (index !== -1) {
        this.attivitaFisica[index] = updatedAttivita
      }
    },
    deleteAttivita(id) {
      this.attivitaFisica = this.attivitaFisica.filter((a) => a.id !== id)
    },

    // Azioni per le misurazioni del peso
    addPeso(misurazionePeso) {
      this.peso.push({ ...misurazionePeso, id: uuidv4() }) // Assicura un nuovo ID se non già presente
    },
    updatePeso(updatedMisurazionePeso) {
      const index = this.peso.findIndex((p) => p.id === updatedMisurazionePeso.id)
      if (index !== -1) {
        this.peso[index] = updatedMisurazionePeso
      }
    },
    deletePeso(id) {
      this.peso = this.peso.filter((p) => p.id !== id)
    },
  },
  // *** ABILITA LA PERSISTENZA PER QUESTO STORE ***
  persist: true,
})
