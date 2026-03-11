<template>
  <q-page padding>
    <div class="page-header q-mb-lg">
      <q-btn flat round dense icon="arrow_back" @click="$router.back()" />
      <h1 class="text-h4 text-weight-bold q-ml-md">Pós-parto</h1>
      <q-space />
      <q-btn flat round dense icon="refresh" @click="refreshContents" :loading="loading" />
    </div>

    <div v-if="loading && postpartumContents.length === 0" class="text-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
      <div class="text-grey-7 q-mt-md">Carregando conteúdos...</div>
    </div>

    <div v-else-if="error" class="text-center q-pa-xl">
      <q-icon name="error" color="negative" size="3em" />
      <div class="text-negative q-mt-md">{{ error }}</div>
      <q-btn color="primary" label="Tentar Novamente" @click="refreshContents" class="q-mt-md" />
    </div>

    <div v-else class="row q-col-gutter-md">
      <div v-for="content in postpartumContents" :key="content.id" class="col-12">
        <ContentCard :content="content" />
      </div>

      <div v-if="postpartumContents.length === 0" class="col-12">
        <q-card flat bordered class="text-center q-pa-xl">
          <q-icon name="article" size="4em" color="grey-5" />
          <div class="text-grey-7 q-mt-md">Nenhum conteúdo disponível</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useContentStore } from 'src/stores/content'
import ContentCard from 'src/components/ContentCard.vue'

const contentStore = useContentStore()

const postpartumContents = computed(() =>
  [...contentStore.contents.postpartum].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
)
const loading = computed(() => contentStore.loading)
const error = computed(() => contentStore.error)

const refreshContents = async () => {
  await contentStore.refreshContents()
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
}
</style>
