import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db } from 'src/services/database'

export const usePregnancyStore = defineStore('pregnancy', () => {
  const contractions = ref([])
  const favoriteContent = ref([])

  // Dados da família
  const familyProfile = ref({
    babyName: '',
    parent1Name: '',
    parent2Name: '',
    userRole: 'parceria', // 'papai', 'mamãe' ou 'parceria'
  })

  // Adicionar contração
  const addContraction = (timestamp) => {
    contractions.value.push({
      id: Date.now(),
      timestamp,
      duration: null,
    })
  }

  // Finalizar contração
  const endContraction = (id, duration) => {
    const contraction = contractions.value.find((c) => c.id === id)
    if (contraction) {
      contraction.duration = duration
    }
  }

  // Limpar contrações
  const clearContractions = () => {
    contractions.value = []
  }

  // Calcular frequência das contrações (últimas 10)
  const contractionFrequency = computed(() => {
    const recent = contractions.value.slice(-10)
    if (recent.length < 2) return null

    const intervals = []
    for (let i = 1; i < recent.length; i++) {
      intervals.push(recent[i].timestamp - recent[i - 1].timestamp)
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
    return Math.round(avgInterval / 60000) // em minutos
  })

  // Verificar se deve ir para maternidade
  const shouldGoToHospital = computed(() => {
    const recent = contractions.value.slice(-5)
    if (recent.length < 5) return false

    // Se contrações estão regulares a cada 5 minutos ou menos
    const avgFrequency = contractionFrequency.value
    return avgFrequency !== null && avgFrequency <= 5
  })

  // Favoritos
  const toggleFavorite = (contentId) => {
    const index = favoriteContent.value.indexOf(contentId)
    if (index > -1) {
      favoriteContent.value.splice(index, 1)
    } else {
      favoriteContent.value.push(contentId)
    }
  }

  const isFavorite = (contentId) => {
    return favoriteContent.value.includes(contentId)
  }

  // Perfil da família
  const updateFamilyProfile = (profile) => {
    familyProfile.value = { ...familyProfile.value, ...profile }
  }

  const isProfileComplete = computed(() => {
    return (
      familyProfile.value.parent1Name.trim() !== '' &&
      familyProfile.value.parent2Name.trim() !== '' &&
      familyProfile.value.userRole !== ''
    )
  })

  const greetingMessage = computed(() => {
    const role = familyProfile.value.userRole
    const roleNames = {
      papai: 'Papai',
      mamae: 'Mamãe',
      parceria: 'Parceria',
    }
    return roleNames[role] || 'Olá'
  })

  // ========== PERSISTÊNCIA COM BANCO DE DADOS ==========

  // Carregar dados do banco
  const loadFromDatabase = async () => {
    try {
      // Carregar perfil
      const profile = await db.getFamilyProfile()
      if (profile) {
        familyProfile.value = profile
      }

      // Carregar favoritos
      const favorites = await db.getFavorites()
      favoriteContent.value = favorites

      // Carregar contrações
      const dbContractions = await db.getContractions()
      contractions.value = dbContractions
    } catch (error) {
      console.error('Erro ao carregar dados do banco:', error)
    }
  }

  // Adicionar contração e salvar no banco
  const addContractionAndSave = async (timestamp) => {
    const contraction = {
      id: Date.now(),
      timestamp,
      duration: null,
    }
    contractions.value.push(contraction)
  }

  // Finalizar contração e salvar no banco
  const endContractionAndSave = async (id, duration) => {
    const contraction = contractions.value.find((c) => c.id === id)
    if (contraction) {
      contraction.duration = duration
      // Salvar no banco
      await db.saveContraction({
        timestamp: contraction.timestamp,
        duration: contraction.duration,
      })
    }
  }

  // Limpar contrações e banco
  const clearContractionsAndDatabase = async () => {
    contractions.value = []
    await db.clearContractions()
  }

  // Toggle favorito e salvar no banco
  const toggleFavoriteAndSave = async (contentId) => {
    const index = favoriteContent.value.indexOf(contentId)
    if (index > -1) {
      favoriteContent.value.splice(index, 1)
    } else {
      favoriteContent.value.push(contentId)
    }
    await db.toggleFavorite(contentId)
  }

  // Atualizar perfil e salvar no banco
  const updateFamilyProfileAndSave = async (profile) => {
    familyProfile.value = { ...familyProfile.value, ...profile }
    await db.saveFamilyProfile(familyProfile.value)
  }

  return {
    contractions,
    favoriteContent,
    familyProfile,
    addContraction,
    endContraction,
    clearContractions,
    contractionFrequency,
    shouldGoToHospital,
    toggleFavorite,
    isFavorite,
    updateFamilyProfile,
    isProfileComplete,
    greetingMessage,
    // Novas funções com persistência
    loadFromDatabase,
    addContractionAndSave,
    endContractionAndSave,
    clearContractionsAndDatabase,
    toggleFavoriteAndSave,
    updateFamilyProfileAndSave,
  }
})
