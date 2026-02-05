<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { usePregnancyStore } from 'src/stores/pregnancy'
import { useContentStore } from 'src/stores/content'

const pregnancyStore = usePregnancyStore()
const contentStore = useContentStore()

onMounted(async () => {
  console.log('🚀 Iniciando aplicação...')

  try {
    // Carregar dados do banco local
    console.log('📦 Carregando dados locais...')
    await pregnancyStore.loadFromDatabase()
    console.log('✅ Dados locais carregados')
  } catch (error) {
    console.error('❌ Erro ao carregar dados locais:', error)
  }

  try {
    // Carregar conteúdos do Firebase
    console.log('🔥 Carregando conteúdos do Firebase...')
    await contentStore.loadContents()
    console.log('✅ Conteúdos do Firebase carregados:', contentStore.contents)
  } catch (error) {
    console.error('❌ Erro ao carregar conteúdos do Firebase:', error)
  }
})
</script>
