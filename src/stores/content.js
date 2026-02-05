import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { firebase } from 'src/services/firebase'

export const useContentStore = defineStore('content', () => {
  const contents = ref({
    labor: [],
    postpartum: [],
  })

  const loading = ref(false)
  const error = ref(null)
  const lastFetch = ref(null)

  // Cache de 5 minutos
  const CACHE_DURATION = 5 * 60 * 1000

  /**
   * Verificar se os dados em cache ainda são válidos
   */
  const isCacheValid = computed(() => {
    if (!lastFetch.value) return false
    return Date.now() - lastFetch.value < CACHE_DURATION
  })

  /**
   * Carregar todos os conteúdos do Firebase
   * @param {boolean} forceRefresh - Forçar atualização ignorando cache
   */
  const loadContents = async (forceRefresh = false) => {
    // Se tem cache válido e não é refresh forçado, não buscar
    if (isCacheValid.value && !forceRefresh) {
      console.log('Usando conteúdos do cache')
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await firebase.getAllContents()
      contents.value = data
      lastFetch.value = Date.now()
      console.log('Conteúdos carregados do Firebase:', data)
    } catch (err) {
      console.error('Erro ao carregar conteúdos:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Carregar conteúdos de uma categoria específica
   */
  const loadContentsByCategory = async (category) => {
    loading.value = true
    error.value = null

    try {
      const data = await firebase.getContentsByCategory(category)
      contents.value[category] = data
      console.log(`Conteúdos de ${category} carregados:`, data)
    } catch (err) {
      console.error(`Erro ao carregar conteúdos de ${category}:`, err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Buscar um conteúdo por ID de forma síncrona (apenas cache)
   */
  const getContentById = (id) => {
    // Buscar no cache
    for (const category in contents.value) {
      const found = contents.value[category].find((c) => c.id === id)
      if (found) return found
    }
    return null
  }

  /**
   * Buscar um conteúdo por ID de forma assíncrona (cache + Firebase)
   */
  const fetchContentById = async (id) => {
    // Tentar encontrar no cache primeiro
    const cached = getContentById(id)
    if (cached) return cached

    // Se não encontrou, buscar no Firebase
    try {
      const content = await firebase.getContentById(id)
      if (content) {
        // Adicionar ao cache
        const category = content.category || 'labor'
        if (contents.value[category]) {
          contents.value[category].push(content)
        }
      }
      return content
    } catch (err) {
      console.error('Erro ao buscar conteúdo:', err)
      return null
    }
  }

  /**
   * Recarregar conteúdos do Firebase
   */
  const refreshContents = async () => {
    await loadContents(true)
  }

  /**
   * Limpar cache
   */
  const clearCache = () => {
    lastFetch.value = null
  }

  return {
    contents,
    loading,
    error,
    lastFetch,
    isCacheValid,
    loadContents,
    loadContentsByCategory,
    getContentById,
    fetchContentById,
    refreshContents,
    clearCache,
  }
})
