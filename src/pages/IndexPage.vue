<template>
  <q-page padding>
    <div class="page-header q-mb-lg">
      <h1 class="text-h4 text-weight-bold text-primary">
        {{ greeting }}
      </h1>
      <p class="text-subtitle1 text-grey-7">Seu guia completo para o parto e pós-parto</p>

      <!-- Banner para completar perfil -->
      <q-banner v-if="!isProfileComplete" rounded class="bg-orange-2 q-mt-md">
        <template v-slot:avatar>
          <q-icon name="person_add" color="orange" />
        </template>
        <div class="text-body2">Complete seu perfil para personalizar sua experiência</div>
        <template v-slot:action>
          <q-btn flat color="orange" label="Completar" @click="navigateTo('/profile')" />
        </template>
      </q-banner>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="category-card" @click="navigateTo('/labor')">
          <q-card-section class="bg-orange text-white">
            <q-icon name="favorite" size="48px" />
            <div class="text-h5 q-mt-sm">Parto</div>
            <div class="text-caption text-black">Preparação e informações</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="category-card" @click="navigateTo('/postpartum')">
          <q-card-section class="bg-pink text-white">
            <q-icon name="child_care" size="48px" />
            <div class="text-h5 q-mt-sm">Pós-parto</div>
            <div class="text-caption text-black">Cuidados após o nascimento</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="category-card" @click="navigateTo('/contractions')">
          <q-card-section class="bg-red text-white">
            <q-icon name="timer" size="48px" />
            <div class="text-h5 q-mt-sm">Contrações</div>
            <div class="text-caption text-black">Contador de contrações</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="q-mt-xl">
      <h2 class="text-h5 q-mb-md">Favoritos</h2>
      <div v-if="favoriteContents.length > 0" class="row q-col-gutter-md">
        <div v-for="content in favoriteContents" :key="content.id" class="col-12">
          <ContentCard :content="content" />
        </div>
      </div>
      <q-card v-else flat bordered class="text-center q-pa-lg">
        <q-icon name="favorite_border" size="64px" color="grey-5" />
        <div class="text-grey-7 q-mt-md">Você ainda não tem favoritos</div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePregnancyStore } from 'src/stores/pregnancy'
import { useContentStore } from 'src/stores/content'
import ContentCard from 'src/components/ContentCard.vue'

const router = useRouter()
const pregnancyStore = usePregnancyStore()
const contentStore = useContentStore()

const isProfileComplete = computed(() => pregnancyStore.isProfileComplete)

const greeting = computed(() => {
  const profile = pregnancyStore.familyProfile
  if (profile.parent1Name) {
    return `${pregnancyStore.greetingMessage}, ${profile.parent1Name}!`
  }
  return 'Parceria da Gestante'
})

const favoriteContents = computed(() => {
  if (!pregnancyStore.favoriteContent || pregnancyStore.favoriteContent.length === 0) {
    return []
  }
  return pregnancyStore.favoriteContent.map((id) => contentStore.getContentById(id)).filter(Boolean)
})

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.page-header {
  text-align: center;
}

.category-card {
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  height: 100%;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.category-card .q-card__section {
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
