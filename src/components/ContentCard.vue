<template>
  <q-card class="content-card" @click="openContent">
    <q-card-section class="row items-center">
      <q-avatar :color="content.color" text-color="white" :icon="content.icon" size="56px" />

      <div class="col q-ml-md">
        <div class="text-h6">{{ content.title }}</div>
        <div class="text-caption text-grey-7">{{ content.description }}</div>
      </div>

      <q-btn
        flat
        round
        dense
        :icon="isFavorite ? 'favorite' : 'favorite_border'"
        :color="isFavorite ? 'red' : 'grey'"
        @click.stop="toggleFavorite"
      />
    </q-card-section>

    <q-badge v-if="content.type === 'video'" color="red" class="type-badge">
      <q-icon name="play_circle" size="xs" class="q-mr-xs" />
      Vídeo
    </q-badge>
    <q-badge v-else-if="content.type === 'podcast'" color="purple" class="type-badge">
      <q-icon name="headphones" size="xs" class="q-mr-xs" />
      Podcast
    </q-badge>
    <q-badge v-else color="blue" class="type-badge">
      <q-icon name="article" size="xs" class="q-mr-xs" />
      Artigo
    </q-badge>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePregnancyStore } from 'src/stores/pregnancy'

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const store = usePregnancyStore()

const isFavorite = computed(() => store.isFavorite(props.content.id))

const toggleFavorite = async () => {
  await store.toggleFavoriteAndSave(props.content.id)
}

const openContent = () => {
  router.push(`/content/${props.content.id}`)
}
</script>

<style scoped>
.content-card {
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;
  overflow: visible;
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.type-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
