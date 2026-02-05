import { boot } from 'quasar/wrappers'
import { db } from 'src/services/database'

export default boot(async ({ app }) => {
  try {
    await db.init()
    console.log('Database boot: inicializado com sucesso')

    // Tornar o db disponível globalmente se necessário
    app.config.globalProperties.$db = db
  } catch (error) {
    console.error('Erro ao inicializar database no boot:', error)
  }
})
