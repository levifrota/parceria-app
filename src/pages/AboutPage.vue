<template>
  <q-page class="about-page">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" @click="$router.back()" />
        <q-toolbar-title>Sobre o Projeto</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div class="q-pa-md">
      <!-- Hero Section -->
      <div class="text-center q-py-xl">
        <q-avatar size="100px" class="q-mb-md">
          <q-icon name="handshake" size="60px" color="primary" />
        </q-avatar>
        <h4 class="text-h4 text-weight-bold text-primary q-ma-none">Parceria ao Lado</h4>
        <p class="text-subtitle1 text-grey-7 q-mt-sm">Conectando pessoas e oportunidades</p>
      </div>

      <q-separator class="q-my-md" />

      <!-- Sobre -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6 text-primary q-mb-sm">
            <q-icon name="info" class="q-mr-sm" />
            O que é o Parceria ao Lado?
          </div>
          <p class="text-body1 text-grey-8">
            O <strong>Parceria ao Lado</strong> é uma plataforma mobile desenvolvida para facilitar
            a conexão entre pessoas que buscam parcerias em projetos, negócios e iniciativas
            colaborativas. Nossa missão é tornar a busca por parceiros mais simples, rápida e
            eficiente.
          </p>
        </q-card-section>
      </q-card>

      <!-- Funcionalidades -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="star" class="q-mr-sm" />
            Funcionalidades
          </div>
          <q-list>
            <q-item v-for="feature in features" :key="feature.title" class="q-pa-sm">
              <q-item-section avatar>
                <q-icon :name="feature.icon" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">{{ feature.title }}</q-item-label>
                <q-item-label caption>{{ feature.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Tecnologias -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="code" class="q-mr-sm" />
            Tecnologias Utilizadas
          </div>
          <div class="row q-gutter-sm">
            <q-chip
              v-for="tech in technologies"
              :key="tech.name"
              :color="tech.color"
              text-color="white"
              :icon="tech.icon"
            >
              {{ tech.name }}
            </q-chip>
          </div>
        </q-card-section>
      </q-card>

      <!-- Versão e Contato -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="contact_support" class="q-mr-sm" />
            Informações
          </div>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="tag" color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Versão</q-item-label>
                <q-item-label>1.0.0</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="person" color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Desenvolvedor</q-item-label>
                <q-item-label>levifrota</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="openGitHub">
              <q-item-section avatar>
                <q-icon name="open_in_new" color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Repositório</q-item-label>
                <q-item-label class="text-primary">github.com/levifrota/parceria-app</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Footer -->
      <div class="text-center text-grey-6 q-py-md">
        <p class="text-caption">Feito com ❤️ usando Quasar Framework</p>
        <p class="text-caption">© {{ currentYear }} Parceria App. Todos os direitos reservados.</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { openURL } from 'quasar'

const currentYear = new Date().getFullYear()

const features = ref([
  {
    icon: 'search',
    title: 'Busca de Parceiros',
    description: 'Encontre parceiros ideais para seus projetos com facilidade.',
  },
  {
    icon: 'chat',
    title: 'Comunicação Direta',
    description: 'Converse diretamente com potenciais parceiros pelo app.',
  },
  {
    icon: 'business_center',
    title: 'Gestão de Projetos',
    description: 'Organize e acompanhe suas parcerias em um só lugar.',
  },
  {
    icon: 'verified_user',
    title: 'Perfis Verificados',
    description: 'Perfis autenticados para garantir a confiabilidade das conexões.',
  },
])

const technologies = ref([
  { name: 'Vue 3', color: 'green-7', icon: 'code' },
  { name: 'Quasar', color: 'blue-8', icon: 'phone_android' },
  { name: 'JavaScript', color: 'yellow-9', icon: 'javascript' },
  { name: 'Capacitor', color: 'purple-7', icon: 'devices' },
])

function openGitHub() {
  openURL('https://github.com/levifrota/parceria-app')
}
</script>

<style scoped>
.about-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
