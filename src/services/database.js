import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'
import { Capacitor } from '@capacitor/core'

class DatabaseService {
  constructor() {
    this.sqlite = null
    this.db = null
    this.dbName = 'parceria_gestante.db'
    this.initialized = false
  }

  async init() {
    if (this.initialized) return

    try {
      console.log('🗄️ Inicializando database...')
      console.log('📱 Plataforma:', Capacitor.getPlatform())

      if (Capacitor.isNativePlatform()) {
        // Tentar usar SQLite nativo
        try {
          console.log('Tentando inicializar SQLite nativo...')
          this.sqlite = new SQLiteConnection(CapacitorSQLite)
          await this.openDatabase()
          await this.createTables()
          console.log('✅ SQLite nativo inicializado com sucesso')
        } catch (sqliteError) {
          console.warn('⚠️ SQLite não disponível, usando localStorage:', sqliteError.message)
          // Fallback para localStorage se SQLite falhar
          this.db = null
          this.sqlite = null
        }
      } else {
        // Web - usar localStorage
        console.log('🌐 Rodando no navegador, usando localStorage')
      }

      this.initialized = true
      console.log('✅ Database inicializado com sucesso')
    } catch (error) {
      console.error('❌ Erro ao inicializar database:', error)
      // Garantir que está inicializado mesmo com erro
      this.initialized = true
    }
  }

  async openDatabase() {
    try {
      const ret = await this.sqlite.checkConnectionsConsistency()
      const isConn = (await this.sqlite.isConnection(this.dbName, false)).result

      if (ret.result && isConn) {
        this.db = await this.sqlite.retrieveConnection(this.dbName, false)
      } else {
        this.db = await this.sqlite.createConnection(this.dbName, false, 'no-encryption', 1, false)
      }

      await this.db.open()
    } catch (error) {
      console.error('Erro ao abrir database:', error)
      throw error
    }
  }

  async createTables() {
    const queries = [
      // Tabela de perfil da família
      `CREATE TABLE IF NOT EXISTS family_profile (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        baby_name TEXT,
        parent1_name TEXT,
        parent2_name TEXT,
        user_role TEXT DEFAULT 'parceria',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // Tabela de contrações
      `CREATE TABLE IF NOT EXISTS contractions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp INTEGER NOT NULL,
        duration INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // Tabela de favoritos
      `CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content_id INTEGER NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
    ]

    if (Capacitor.isNativePlatform() && this.db) {
      for (const query of queries) {
        await this.db.execute(query)
      }
    }
  }

  // ========== PERFIL DA FAMÍLIA ==========

  async saveFamilyProfile(profile) {
    if (!this.db || !Capacitor.isNativePlatform()) {
      // Fallback: localStorage
      localStorage.setItem('family_profile', JSON.stringify(profile))
      return
    }

    try {
      const query = `
        INSERT OR REPLACE INTO family_profile
        (id, baby_name, parent1_name, parent2_name, user_role, updated_at)
        VALUES (1, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `
      await this.db.run(query, [
        profile.babyName || '',
        profile.parent1Name || '',
        profile.parent2Name || '',
        profile.userRole || 'parceria',
      ])
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
    }
  }

  async getFamilyProfile() {
    if (!this.db || !Capacitor.isNativePlatform()) {
      // Fallback: localStorage
      const stored = localStorage.getItem('family_profile')
      return stored ? JSON.parse(stored) : null
    }

    try {
      const query = 'SELECT * FROM family_profile WHERE id = 1'
      const result = await this.db.query(query)

      if (result.values && result.values.length > 0) {
        const row = result.values[0]
        return {
          babyName: row.baby_name || '',
          parent1Name: row.parent1_name || '',
          parent2Name: row.parent2_name || '',
          userRole: row.user_role || 'parceria',
        }
      }
      return null
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      return null
    }
  }

  // ========== CONTRAÇÕES ==========

  async saveContraction(contraction) {
    if (!this.db || !Capacitor.isNativePlatform()) {
      // Fallback: localStorage
      const contractions = this.getContractionsFromStorage()
      contractions.push(contraction)
      localStorage.setItem('contractions', JSON.stringify(contractions))
      return
    }

    try {
      const query = `
        INSERT INTO contractions (timestamp, duration)
        VALUES (?, ?)
      `
      await this.db.run(query, [contraction.timestamp, contraction.duration])
    } catch (error) {
      console.error('Erro ao salvar contração:', error)
    }
  }

  async getContractions() {
    if (!this.db || !Capacitor.isNativePlatform()) {
      // Fallback: localStorage
      return this.getContractionsFromStorage()
    }

    try {
      const query = 'SELECT * FROM contractions ORDER BY timestamp DESC LIMIT 50'
      const result = await this.db.query(query)

      if (result.values) {
        return result.values.map((row) => ({
          id: row.id,
          timestamp: row.timestamp,
          duration: row.duration,
        }))
      }
      return []
    } catch (error) {
      console.error('Erro ao buscar contrações:', error)
      return []
    }
  }

  async clearContractions() {
    if (!this.db || !Capacitor.isNativePlatform()) {
      // Fallback: localStorage
      localStorage.removeItem('contractions')
      return
    }

    try {
      const query = 'DELETE FROM contractions'
      await this.db.execute(query)
    } catch (error) {
      console.error('Erro ao limpar contrações:', error)
    }
  }

  getContractionsFromStorage() {
    const stored = localStorage.getItem('contractions')
    return stored ? JSON.parse(stored) : []
  }

  // ========== FAVORITOS ==========

  async toggleFavorite(contentId) {
    if (!this.db || !Capacitor.isNativePlatform()) {
      // Fallback: localStorage
      const favorites = this.getFavoritesFromStorage()
      const index = favorites.indexOf(contentId)

      if (index > -1) {
        favorites.splice(index, 1)
      } else {
        favorites.push(contentId)
      }

      localStorage.setItem('favorites', JSON.stringify(favorites))
      return
    }

    try {
      const checkQuery = 'SELECT id FROM favorites WHERE content_id = ?'
      const result = await this.db.query(checkQuery, [contentId])

      if (result.values && result.values.length > 0) {
        // Remove favorito
        const deleteQuery = 'DELETE FROM favorites WHERE content_id = ?'
        await this.db.run(deleteQuery, [contentId])
      } else {
        // Adiciona favorito
        const insertQuery = 'INSERT INTO favorites (content_id) VALUES (?)'
        await this.db.run(insertQuery, [contentId])
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error)
    }
  }

  async getFavorites() {
    if (!this.db || !Capacitor.isNativePlatform()) {
      // Fallback: localStorage
      return this.getFavoritesFromStorage()
    }

    try {
      const query = 'SELECT content_id FROM favorites ORDER BY created_at DESC'
      const result = await this.db.query(query)

      if (result.values) {
        return result.values.map((row) => row.content_id)
      }
      return []
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error)
      return []
    }
  }

  getFavoritesFromStorage() {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  }

  // ========== UTILITÁRIOS ==========

  async close() {
    if (Capacitor.isNativePlatform() && this.db) {
      try {
        await this.db.close()
      } catch (error) {
        console.error('Erro ao fechar database:', error)
      }
    }
  }
}

export const db = new DatabaseService()
