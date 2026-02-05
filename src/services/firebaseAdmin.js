import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'

// Usar a mesma configuração do firebase.js
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}

// Reusar a mesma instância se já existir
let app
try {
  app = initializeApp(firebaseConfig)
} catch (error) {
  // App já inicializado
  app = initializeApp(firebaseConfig, 'admin-app')
  console.log(error)
}

const db = getFirestore(app)

class FirebaseAdminService {
  constructor() {
    this.db = db
  }

  /**
   * Criar um novo conteúdo
   * @param {Object} contentData - Dados do conteúdo
   * @returns {Promise<string>} ID do documento criado
   */
  async createContent(contentData) {
    try {
      const docRef = await addDoc(collection(this.db, 'contents'), {
        ...contentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      console.log('✅ Conteúdo criado com ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('❌ Erro ao criar conteúdo:', error)
      throw error
    }
  }

  /**
   * Atualizar um conteúdo existente
   * @param {string} contentId - ID do conteúdo
   * @param {Object} contentData - Dados atualizados
   */
  async updateContent(contentId, contentData) {
    try {
      const contentRef = doc(this.db, 'contents', contentId)
      await updateDoc(contentRef, {
        ...contentData,
        updatedAt: serverTimestamp(),
      })

      console.log('✅ Conteúdo atualizado:', contentId)
    } catch (error) {
      console.error('❌ Erro ao atualizar conteúdo:', error)
      throw error
    }
  }

  /**
   * Deletar um conteúdo
   * @param {string} contentId - ID do conteúdo
   */
  async deleteContent(contentId) {
    try {
      const contentRef = doc(this.db, 'contents', contentId)
      await deleteDoc(contentRef)

      console.log('✅ Conteúdo deletado:', contentId)
    } catch (error) {
      console.error('❌ Erro ao deletar conteúdo:', error)
      throw error
    }
  }
}

export const firebaseAdmin = new FirebaseAdminService()
