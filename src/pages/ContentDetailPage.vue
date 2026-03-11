<template>
  <q-page padding>
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
      <div class="text-grey-7 q-mt-md">Carregando conteúdo...</div>
    </div>

    <div v-else-if="content" class="content-detail">
      <div class="page-header q-mb-lg">
        <q-btn flat round dense icon="arrow_back" @click="$router.back()" />
        <q-space />
        <q-btn
          flat
          round
          dense
          :icon="isFavorite ? 'favorite' : 'favorite_border'"
          :color="isFavorite ? 'red' : 'grey'"
          @click="toggleFavorite"
        />
      </div>

      <q-card>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <q-img
              :src="content.imageUrl"
              style="width: 100px; height: 100px; border-radius: 10px; flex-shrink: 0"
              spinner-color="grey-4"
              spinner-size="24px"
            />
            <div class="col q-ml-md">
              <div class="text-h6">{{ content.title }}</div>
              <div class="text-caption text-grey-7">{{ content.description }}</div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section v-if="content.type === 'article'">
          <div class="text-body1" v-html="personalizedContent"></div>
        </q-card-section>

        <q-card-section v-else-if="content.type === 'video'">
          <VideoPlayer :src="content.url" />
        </q-card-section>

        <q-card-section v-else-if="content.type === 'podcast'">
          <AudioPlayer :src="content.url">
            <template #title>
              <span class="audio-player-title">{{ content.title }}</span>
            </template>
          </AudioPlayer>
        </q-card-section>
      </q-card>
    </div>

    <div v-else class="text-center q-pa-xl">
      <q-icon name="error" color="negative" size="3em" />
      <div class="text-negative q-mt-md">Conteúdo não encontrado</div>
      <q-btn color="primary" label="Voltar" @click="$router.back()" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useContentStore } from 'src/stores/content'
import { usePregnancyStore } from 'src/stores/pregnancy'
import VideoPlayer from 'src/components/VideoPlayer.vue'
import AudioPlayer from 'src/components/AudioPlayer.vue'

const route = useRoute()
const contentStore = useContentStore()
const pregnancyStore = usePregnancyStore()

const content = ref(null)
const loading = ref(true)

const contentId = computed(() => route.params.id)
const isFavorite = computed(() => pregnancyStore.isFavorite(contentId.value))

const personalizedContent = computed(() => {
  if (!content.value?.content) return ''
  const { babyName, parent1Name, parent2Name } = pregnancyStore.familyProfile
  return content.value.content
    .replace(/\{\{gestante\}\}/gi, parent2Name || 'você')
    .replace(/\{\{parceria\}\}/gi, parent1Name || 'sua parceria')
    .replace(/\{\{bebe\}\}/gi, babyName || 'seu bebê')
})

console.log('content:', content)

const toggleFavorite = async () => {
  await pregnancyStore.toggleFavoriteAndSave(contentId.value)
}

onMounted(async () => {
  loading.value = true
  content.value = await contentStore.fetchContentById(contentId.value)
  loading.value = false
})
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
}

.content-detail {
  max-width: 800px;
  margin: 0 auto;
}

:deep(.text-body1 img) {
  max-width: 100% !important;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}
</style>
