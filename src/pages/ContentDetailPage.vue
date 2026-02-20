<template>
  <q-page padding>
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
      <div class="text-grey-7 q-mt-md">Carregando conteúdo...</div>
    </div>

    <div v-else-if="content" class="content-detail">
      <div class="page-header q-mb-lg">
        <q-btn flat round dense icon="arrow_back" @click="$router.back()" />
        <h1 class="text-h5 text-weight-bold q-ml-md">{{ content.title }}</h1>
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
            <q-avatar :color="content.color" text-color="white" :icon="content.icon" size="72px" />
            <div class="col q-ml-md">
              <div class="text-h6">{{ content.title }}</div>
              <div class="text-caption text-grey-7">{{ content.description }}</div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section v-if="content.type === 'article'">
          <div class="text-body1" v-html="content.content"></div>
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
</style>
