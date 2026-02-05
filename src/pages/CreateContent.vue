<template>
  <q-page padding>
    <div class="page-header q-mb-lg">
      <q-btn flat round dense icon="arrow_back" @click="$router.push('/')" />
      <h1 class="text-h4 text-weight-bold q-ml-md">Gerenciar Conteúdos</h1>
    </div>

    <!-- Formulário de Criação -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6 q-mb-md">
          {{ editingContent ? 'Editar Conteúdo' : 'Novo Conteúdo' }}
        </div>

        <q-form @submit="saveContent" class="q-gutter-md">
          <!-- Tipo de Conteúdo -->
          <q-select
            v-model="form.type"
            :options="typeOptions"
            label="Tipo de Conteúdo"
            outlined
            emit-value
            map-options
            :rules="[(val) => !!val || 'Campo obrigatório']"
          />

          <!-- Categoria -->
          <q-select
            v-model="form.category"
            :options="categoryOptions"
            label="Categoria"
            outlined
            emit-value
            map-options
            :rules="[(val) => !!val || 'Campo obrigatório']"
          />

          <!-- Título -->
          <q-input
            v-model="form.title"
            label="Título"
            outlined
            :rules="[(val) => !!val || 'Campo obrigatório']"
          />

          <!-- Descrição -->
          <q-input
            v-model="form.description"
            label="Descrição"
            outlined
            type="textarea"
            rows="2"
            :rules="[(val) => !!val || 'Campo obrigatório']"
          />

          <!-- Conteúdo HTML (apenas para articles) -->
          <q-input
            v-if="form.type === 'article'"
            v-model="form.content"
            label="Conteúdo (HTML)"
            outlined
            type="textarea"
            rows="8"
            hint="Pode usar HTML: <p>, <h3>, <strong>, <ul>, <li>, etc."
          />

          <!-- URL (para vídeos e podcasts) -->
          <q-input
            v-if="form.type === 'video' || form.type === 'podcast'"
            v-model="form.url"
            label="URL"
            outlined
            type="url"
            hint="Link do YouTube, Spotify, etc."
            :rules="[(val) => !!val || 'Campo obrigatório']"
          />

          <!-- Ícone -->
          <q-select
            v-model="form.icon"
            :options="iconOptions"
            label="Ícone"
            outlined
            emit-value
            map-options
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.value" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <q-icon :name="form.icon" />
            </template>
          </q-select>

          <!-- Cor -->
          <q-select
            v-model="form.color"
            :options="colorOptions"
            label="Cor"
            outlined
            emit-value
            map-options
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-avatar :color="scope.opt.value" size="24px" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <!-- Ordem -->
          <q-input
            v-model.number="form.order"
            label="Ordem de Exibição"
            outlined
            type="number"
            min="1"
          />

          <!-- Featured -->
          <q-toggle v-model="form.featured" label="Destacar na Home" />

          <!-- Botões -->
          <div class="row q-gutter-sm">
            <q-btn
              type="submit"
              color="primary"
              :label="editingContent ? 'Atualizar' : 'Criar Conteúdo'"
              :loading="saving"
              unelevated
            />
            <q-btn v-if="editingContent" label="Cancelar" color="grey" flat @click="cancelEdit" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Lista de Conteúdos -->
    <q-card>
      <q-card-section>
        <div class="text-h6 q-mb-md">Conteúdos Criados</div>

        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
        >
          <q-tab name="labor" label="Parto" />
          <q-tab name="postpartum" label="Pós-parto" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <!-- Parto -->
          <q-tab-panel name="labor">
            <div v-if="loading" class="text-center q-pa-md">
              <q-spinner color="primary" size="3em" />
            </div>
            <div v-else-if="laborContents.length === 0" class="text-center text-grey-7 q-pa-lg">
              Nenhum conteúdo criado ainda
            </div>
            <q-list v-else separator>
              <q-item v-for="content in laborContents" :key="content.id" class="q-py-md">
                <q-item-section avatar>
                  <q-avatar :color="content.color" :icon="content.icon" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ content.title }}</q-item-label>
                  <q-item-label caption lines="2">{{ content.description }}</q-item-label>
                  <q-item-label caption class="q-mt-xs">
                    <q-badge
                      :color="
                        content.type === 'article'
                          ? 'blue'
                          : content.type === 'video'
                            ? 'red'
                            : 'purple'
                      "
                    >
                      {{ content.type }}
                    </q-badge>
                    <q-badge v-if="content.featured" color="orange" class="q-ml-xs"
                      >Destaque</q-badge
                    >
                    <span class="q-ml-xs text-grey">Ordem: {{ content.order }}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="row q-gutter-xs">
                    <q-btn icon="edit" color="primary" flat dense @click="editContent(content)" />
                    <q-btn
                      icon="delete"
                      color="negative"
                      flat
                      dense
                      @click="confirmDelete(content)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>

          <!-- Pós-parto -->
          <q-tab-panel name="postpartum">
            <div v-if="loading" class="text-center q-pa-md">
              <q-spinner color="primary" size="3em" />
            </div>
            <div
              v-else-if="postpartumContents.length === 0"
              class="text-center text-grey-7 q-pa-lg"
            >
              Nenhum conteúdo criado ainda
            </div>
            <q-list v-else separator>
              <q-item v-for="content in postpartumContents" :key="content.id" class="q-py-md">
                <q-item-section avatar>
                  <q-avatar :color="content.color" :icon="content.icon" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-medium">{{ content.title }}</q-item-label>
                  <q-item-label caption lines="2">{{ content.description }}</q-item-label>
                  <q-item-label caption class="q-mt-xs">
                    <q-badge
                      :color="
                        content.type === 'article'
                          ? 'blue'
                          : content.type === 'video'
                            ? 'red'
                            : 'purple'
                      "
                    >
                      {{ content.type }}
                    </q-badge>
                    <q-badge v-if="content.featured" color="orange" class="q-ml-xs"
                      >Destaque</q-badge
                    >
                    <span class="q-ml-xs text-grey">Ordem: {{ content.order }}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="row q-gutter-xs">
                    <q-btn icon="edit" color="primary" flat dense @click="editContent(content)" />
                    <q-btn
                      icon="delete"
                      color="negative"
                      flat
                      dense
                      @click="confirmDelete(content)"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useContentStore } from 'src/stores/content'
import { firebaseAdmin } from 'src/services/firebaseAdmin'

const $q = useQuasar()
const contentStore = useContentStore()

const form = ref({
  type: 'article',
  category: 'labor',
  title: '',
  description: '',
  content: '',
  url: '',
  icon: 'article',
  color: 'primary',
  order: 1,
  featured: false,
})

const editingContent = ref(null)
const saving = ref(false)
const loading = ref(false)
const activeTab = ref('labor')

const typeOptions = [
  { label: 'Artigo', value: 'article' },
  { label: 'Vídeo', value: 'video' },
  { label: 'Podcast', value: 'podcast' },
]

const categoryOptions = [
  { label: 'Parto', value: 'labor' },
  { label: 'Pós-parto', value: 'postpartum' },
]

const iconOptions = [
  { label: 'Artigo', value: 'article' },
  { label: 'Aviso', value: 'warning' },
  { label: 'Favorito', value: 'favorite' },
  { label: 'Info', value: 'info' },
  { label: 'Saúde', value: 'healing' },
  { label: 'Bebê', value: 'child_care' },
  { label: 'Médico', value: 'medical_services' },
  { label: 'Exercício', value: 'fitness_center' },
  { label: 'Alimentação', value: 'restaurant' },
  { label: 'Sono', value: 'bedtime' },
  { label: 'Psicologia', value: 'psychology' },
  { label: 'Checklist', value: 'checklist' },
  { label: 'Livro', value: 'menu_book' },
  { label: 'Vídeo', value: 'play_circle' },
  { label: 'Áudio', value: 'headphones' },
]

const colorOptions = [
  { label: 'Roxo (Primary)', value: 'primary' },
  { label: 'Azul', value: 'blue' },
  { label: 'Verde', value: 'green' },
  { label: 'Laranja', value: 'orange' },
  { label: 'Rosa', value: 'pink' },
  { label: 'Vermelho', value: 'red' },
  { label: 'Roxo', value: 'purple' },
  { label: 'Ciano', value: 'cyan' },
  { label: 'Âmbar', value: 'amber' },
  { label: 'Teal', value: 'teal' },
]

const laborContents = computed(() => {
  return [...contentStore.contents.labor].sort((a, b) => a.order - b.order)
})

const postpartumContents = computed(() => {
  return [...contentStore.contents.postpartum].sort((a, b) => a.order - b.order)
})

const saveContent = async () => {
  saving.value = true

  try {
    const contentData = {
      type: form.value.type,
      category: form.value.category,
      title: form.value.title,
      description: form.value.description,
      icon: form.value.icon,
      color: form.value.color,
      order: form.value.order,
      featured: form.value.featured,
    }

    // Adicionar content ou url dependendo do tipo
    if (form.value.type === 'article') {
      contentData.content = form.value.content
    } else {
      contentData.url = form.value.url
    }

    if (editingContent.value) {
      // Atualizar
      await firebaseAdmin.updateContent(editingContent.value.id, contentData)
      $q.notify({
        type: 'positive',
        message: 'Conteúdo atualizado com sucesso!',
        position: 'top',
      })
    } else {
      // Criar novo
      await firebaseAdmin.createContent(contentData)
      $q.notify({
        type: 'positive',
        message: 'Conteúdo criado com sucesso!',
        position: 'top',
      })
    }

    // Resetar form
    resetForm()

    // Recarregar conteúdos
    await contentStore.refreshContents()
  } catch (error) {
    console.error('Erro ao salvar conteúdo:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao salvar conteúdo: ' + error.message,
      position: 'top',
    })
  } finally {
    saving.value = false
  }
}

const editContent = (content) => {
  editingContent.value = content
  form.value = {
    type: content.type,
    category: content.category,
    title: content.title,
    description: content.description,
    content: content.content || '',
    url: content.url || '',
    icon: content.icon,
    color: content.color,
    order: content.order,
    featured: content.featured || false,
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  editingContent.value = null
  form.value = {
    type: 'article',
    category: 'labor',
    title: '',
    description: '',
    content: '',
    url: '',
    icon: 'article',
    color: 'primary',
    order: 1,
    featured: false,
  }
}

const confirmDelete = (content) => {
  $q.dialog({
    title: 'Confirmar exclusão',
    message: `Deseja realmente excluir "${content.title}"?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await deleteContent(content.id)
  })
}

const deleteContent = async (contentId) => {
  try {
    await firebaseAdmin.deleteContent(contentId)
    $q.notify({
      type: 'positive',
      message: 'Conteúdo excluído com sucesso!',
      position: 'top',
    })
    await contentStore.refreshContents()
  } catch (error) {
    console.error('Erro ao excluir conteúdo:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao excluir conteúdo: ' + error.message,
      position: 'top',
    })
  }
}

onMounted(async () => {
  loading.value = true
  await contentStore.loadContents()
  loading.value = false
})
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
}
</style>
