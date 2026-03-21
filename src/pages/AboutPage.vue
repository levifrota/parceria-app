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
      <div class="text-center q-py-xl flex column items-center">
        <q-avatar size="100px" class="q-mb-md justify-center">
          <q-icon name="img:/icons/android/play_store_512.png" size="100px" color="primary" />
        </q-avatar>
        <h4 class="text-h4 text-weight-bold text-primary q-ma-none">Parceria ao Lado</h4>
        <p class="text-subtitle1 text-grey-7 q-mt-sm">
          Tecnologia educacional para o cuidado no ciclo gravídico-puerperal
        </p>
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
            O <strong>Parceria ao Lado</strong> é uma tecnologia educacional construída a partir de
            evidências científicas que identificaram lacunas na preparação de parcerias para o
            parto. O aplicativo nasce para ampliar esse cuidado, valorizando a pluralidade e
            incluindo qualquer pessoa que exerça relação de parentalidade com a pessoa gestante.
          </p>
          <p class="text-body1 text-grey-8 q-mt-sm">
            O nome <strong>Parceria ao Lado</strong> remete ao termo latino <em>obstare</em> (“ficar
            ao lado”), origem da palavra "obstetra". Estar ao lado significa participar ativamente
            durante toda a gestação, com ênfase no trabalho de parto e parto.
          </p>
        </q-card-section>
      </q-card>

      <!-- Funcionalidades -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="star" class="q-mr-sm" />
            Conteúdos Educacionais
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
                <q-icon name="school" color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Pesquisadora</q-item-label>
                <q-item-label>Enfermeira Glória Cibele Bezerra Siqueira Frota</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="school" color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Pesquisadora</q-item-label>
                <q-item-label>Professora Doutora Maria Adelane Monteiro da Silva</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="person" color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Desenvolvedor</q-item-label>
                <q-item-label
                  ><a
                    class="text-primary"
                    href="https://www.linkedin.com/in/levifrota27/"
                    target="_blank"
                    style="text-decoration: none"
                    >Levi Frota</a
                  ></q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="library_books" color="grey-6" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Apoio</q-item-label>
                <q-item-section class="apoio">
                  <img style="max-width: 15vw" src="../assets/PREOUVA.png" alt="PREOUVA" />
                  <img
                    style="max-width: 30vw"
                    src="../assets/brasao-uva-oficial-horizontal.png"
                    alt="UVA"
                  />
                </q-item-section>
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
    icon: 'gavel',
    title: 'Direitos do Acompanhante',
    description: 'Informações sobre os direitos da parceria durante o trabalho de parto e parto.',
  },
  {
    icon: 'pregnant_woman',
    title: 'Trabalho de Parto e Parto',
    description: 'Orientações práticas para apoiar a pessoa gestante em cada etapa.',
  },
  {
    icon: 'accessibility_new',
    title: 'Posições Verticalizadas e Alívio da Dor',
    description: 'Incentivo a posições verticalizadas e métodos não farmacológicos de conforto.',
  },
  {
    icon: 'fact_check',
    title: 'Cesárea, Violência Obstétrica e Cuidados com o Bebê',
    description:
      'Conteúdos sobre motivos reais de cesariana, violência obstétrica e cuidados neonatais.',
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

:deep(*) {
  --q-transition-duration: 0ms !important;
}

:deep(.q-focus-helper) {
  display: none !important;
}

:deep(.q-hoverable:hover > .q-focus-helper) {
  display: none !important;
}

:deep(a:hover),
:deep(.q-btn:hover),
:deep(.q-card:hover),
:deep(.q-item:hover),
:deep(.q-chip:hover) {
  background: transparent !important;
  color: inherit !important;
  box-shadow: none !important;
}
</style>
