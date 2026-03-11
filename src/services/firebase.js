import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

class FirebaseService {
  constructor() {
    this.db = db
    this.initialized = true
  }

  // ========== CONTEÚDOS ==========

  /**
   * Buscar todos os conteúdos
   * @returns {Promise<Object>} Objeto com conteúdos organizados por categoria
   */
  async getAllContents() {
    try {
      console.log('🔥 Firebase: Buscando conteúdos...')
      const contentsRef = collection(this.db, 'contents')
      const snapshot = await getDocs(contentsRef)

      console.log('📊 Firebase: Total de documentos encontrados:', snapshot.size)

      const contentsByCategory = {
        labor: [],
        postpartum: [],
      }

      snapshot.forEach((doc) => {
        const content = { id: doc.id, ...doc.data() }
        console.log('📄 Documento encontrado:', content)
        const category = content.category || 'labor'

        if (contentsByCategory[category]) {
          contentsByCategory[category].push(content)
        }
      })

      console.log('✅ Firebase: Conteúdos organizados por categoria:', contentsByCategory)
      return contentsByCategory
    } catch (error) {
      console.error('❌ Firebase: Erro ao buscar conteúdos:', error)
      console.error('Detalhes do erro:', error.message, error.code)
      return { labor: [], postpartum: [] }
    }
  }

  /**
   * Buscar conteúdos por categoria
   * @param {string} category - 'labor' ou 'postpartum'
   * @returns {Promise<Array>} Array de conteúdos
   */
  async getContentsByCategory(category) {
    try {
      const contentsRef = collection(this.db, 'contents')
      const q = query(contentsRef, where('category', '==', category))
      const snapshot = await getDocs(q)

      const contents = []
      snapshot.forEach((doc) => {
        contents.push({ id: doc.id, ...doc.data() })
      })

      console.log('** CONTENTS: ', contents)

      return contents
    } catch (error) {
      console.error('Erro ao buscar conteúdos por categoria:', error)
      return []
    }
  }

  /**
   * Buscar um conteúdo específico por ID
   * @param {string} contentId - ID do conteúdo
   * @returns {Promise<Object|null>} Conteúdo ou null
   */
  async getContentById(contentId) {
    try {
      const contentRef = doc(this.db, 'contents', contentId)
      const contentSnap = await getDoc(contentRef)

      if (contentSnap.exists()) {
        return { id: contentSnap.id, ...contentSnap.data() }
      }

      return null
    } catch (error) {
      console.error('Erro ao buscar conteúdo:', error)
      return null
    }
  }

  /**
   * Buscar conteúdos em destaque
   * @returns {Promise<Array>} Array de conteúdos em destaque
   */
  async getFeaturedContents() {
    try {
      const contentsRef = collection(this.db, 'contents')
      const q = query(contentsRef, where('featured', '==', true))
      const snapshot = await getDocs(q)

      const contents = []
      snapshot.forEach((doc) => {
        contents.push({ id: doc.id, ...doc.data() })
      })

      return contents
    } catch (error) {
      console.error('Erro ao buscar conteúdos em destaque:', error)
      return []
    }
  }
}

export const firebase = new FirebaseService()
