import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootPath = resolve(__dirname, '../..')

export default function () {
  try {
    const envPath = resolve(rootPath, '.env')
    const envFile = readFileSync(envPath, 'utf8')

    const env = {}

    // Parse manual do arquivo .env
    envFile.split('\n').forEach((line) => {
      line = line.trim()

      // Ignorar linhas vazias e comentários
      if (!line || line.startsWith('#')) {
        return
      }

      // Parse linha KEY=VALUE
      const match = line.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim()
        env[key] = value
      }
    })

    return env
    } catch (error) {
      console.error('Erro ao ler arquivo .env:', error.message)
      return {}
    }
  }