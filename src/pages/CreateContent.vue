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
          <div v-if="form.type === 'article'">
            <div class="row items-center q-mb-xs">
              <div class="text-subtitle2">Conteúdo (HTML)</div>
              <q-space />
              <q-btn
                flat
                dense
                color="primary"
                icon="image"
                label="Inserir Imagem"
                size="sm"
                @click="openImageDialog"
              />
            </div>
            <q-input
              ref="contentTextarea"
              v-model="form.content"
              outlined
              type="textarea"
              rows="8"
              hint="Pode usar HTML: <p>, <h3>, <strong>, <ul>, <li>, etc. Clique no cursor onde deseja inserir a imagem."
            />
          </div>

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

    <!-- Diálogo de Gerenciamento de Imagens -->
    <q-dialog v-model="imageDialog" persistent>
      <q-card style="min-width: 500px; max-width: 700px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Gerenciar Imagens</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-tabs
            v-model="imageTab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
          >
            <q-tab name="url" label="Inserir URL" icon="link" />
            <q-tab name="gallery" label="Galeria" icon="collections" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="imageTab" animated>
            <!-- Aba de Inserir URL -->
            <q-tab-panel name="url">
              <div class="q-gutter-md">
                <q-input
                  v-model="imageUrl"
                  label="URL da Imagem (ImgBB)"
                  outlined
                  placeholder="https://i.ibb.co/..."
                  hint="Cole aqui a URL da imagem já enviada no ImgBB"
                  @update:model-value="loadImagePreview"
                >
                  <template v-slot:prepend>
                    <q-icon name="link" />
                  </template>
                </q-input>

                <q-input
                  v-model="imageName"
                  label="Nome (opcional)"
                  outlined
                  placeholder="Ex: Logo parceria"
                />

                <q-input
                  v-model="imageDescription"
                  label="Descrição (opcional)"
                  outlined
                  type="textarea"
                  rows="2"
                  placeholder="Descrição para alt da imagem"
                />

                <!-- Preview da imagem -->
                <div v-if="imagePreview" class="q-mt-md">
                  <div class="text-caption q-mb-xs">Preview:</div>
                  <img
                    :src="imagePreview"
                    style="max-width: 100%; max-height: 300px; border-radius: 8px"
                    class="shadow-2"
                    @error="imagePreview = null"
                  />
                </div>

                <!-- Botões -->
                <div class="row q-gutter-sm q-mt-md">
                  <q-btn
                    label="Inserir no Artigo"
                    color="primary"
                    icon="add_photo_alternate"
                    :disable="!imageUrl"
                    @click="insertImageFromUrl"
                  />
                  <q-btn
                    label="Salvar na Galeria"
                    color="secondary"
                    icon="save"
                    outline
                    :loading="saving"
                    :disable="!imageUrl || saving"
                    @click="saveImageToGallery"
                  />
                  <q-btn label="Cancelar" flat @click="closeImageDialog" />
                </div>
              </div>
            </q-tab-panel>

            <!-- Aba de Galeria -->
            <q-tab-panel name="gallery">
              <div v-if="loadingImages" class="text-center q-pa-md">
                <q-spinner color="primary" size="3em" />
                <div class="q-mt-md">Carregando imagens...</div>
              </div>

              <div v-else-if="images.length === 0" class="text-center q-pa-md text-grey">
                Nenhuma imagem salva. Use a aba "Inserir URL" para adicionar imagens do ImgBB.
              </div>

              <div v-else class="row q-col-gutter-md">
                <div v-for="image in images" :key="image.id" class="col-6 col-sm-4">
                  <q-card class="cursor-pointer" @click="insertImageFromGallery(image)">
                    <q-img :src="image.url" ratio="1" />
                    <q-card-section class="q-pa-sm">
                      <div class="text-caption ellipsis">{{ image.name }}</div>
                      <div class="text-caption text-grey-7" v-if="image.description">
                        {{ image.description }}
                      </div>
                    </q-card-section>
                    <q-card-actions align="right">
                      <q-btn
                        flat
                        dense
                        color="negative"
                        icon="delete"
                        size="sm"
                        @click.stop="confirmDeleteImage(image)"
                      />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useContentStore } from 'src/stores/content'
import { firebaseAdmin } from 'src/services/firebaseAdmin'

const $q = useQuasar()
const contentStore = useContentStore()

// Refs
const contentTextarea = ref(null)

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

// Estados do diálogo de imagens
const imageDialog = ref(false)
const imageTab = ref('url')
const imageUrl = ref('')
const imageName = ref('')
const imageDescription = ref('')
const imagePreview = ref(null)
const images = ref([])
const loadingImages = ref(false)

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

// ===== FUNÇÕES DE GERENCIAMENTO DE IMAGENS =====

/**
 * Abrir diálogo de imagens
 */
const openImageDialog = async () => {
  imageDialog.value = true
  imageTab.value = 'url'
  await loadImages()
}

/**
 * Fechar diálogo de imagens
 */
const closeImageDialog = () => {
  imageDialog.value = false
  imageUrl.value = ''
  imageName.value = ''
  imageDescription.value = ''
  imagePreview.value = null
}

/**
 * Carregar preview da imagem pela URL
 */
const loadImagePreview = (url) => {
  if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
    imagePreview.value = url
  } else {
    imagePreview.value = null
  }
}

/**
 * Inserir imagem diretamente pela URL
 */
const insertImageFromUrl = () => {
  if (!imageUrl.value) {
    $q.notify({
      type: 'warning',
      message: 'Insira uma URL válida',
      position: 'top',
    })
    return
  }

  const alt = imageDescription.value || imageName.value || 'imagem'
  insertImageTag(imageUrl.value, alt)

  $q.notify({
    type: 'positive',
    message: 'Imagem inserida no artigo!',
    position: 'top',
  })

  // Resetar campos
  imageUrl.value = ''
  imageName.value = ''
  imageDescription.value = ''
  imagePreview.value = null
}

/**
 * Salvar URL da imagem na galeria
 */
const saveImageToGallery = async () => {
  if (!imageUrl.value) {
    $q.notify({
      type: 'warning',
      message: 'Insira uma URL válida',
      position: 'top',
    })
    return
  }

  saving.value = true

  try {
    const imageData = await firebaseAdmin.saveImageUrl({
      url: imageUrl.value,
      name: imageName.value || 'Imagem',
      description: imageDescription.value || '',
    })

    $q.notify({
      type: 'positive',
      message: 'Imagem salva na galeria!',
      position: 'top',
    })

    // Adicionar à lista local
    images.value.unshift(imageData)

    // Resetar campos
    imageUrl.value = ''
    imageName.value = ''
    imageDescription.value = ''
    imagePreview.value = null
  } catch (error) {
    console.error('Erro ao salvar imagem:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao salvar imagem: ' + error.message,
      position: 'top',
    })
  } finally {
    saving.value = false
  }
}

/**
 * Carregar imagens da galeria
 */
const loadImages = async () => {
  loadingImages.value = true
  try {
    images.value = await firebaseAdmin.getAllImages()
  } catch (error) {
    console.error('Erro ao carregar imagens:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao carregar imagens',
      position: 'top',
    })
  } finally {
    loadingImages.value = false
  }
}

/**
 * Inserir imagem da galeria
 */
const insertImageFromGallery = (image) => {
  const alt = image.description || image.name || 'imagem'
  insertImageTag(image.url, alt)
  $q.notify({
    type: 'positive',
    message: 'Imagem inserida com sucesso!',
    position: 'top',
  })
  imageDialog.value = false
}

/**
 * Inserir tag <img> na posição do cursor no textarea
 */
const insertImageTag = (url, alt = 'imagem') => {
  const textarea = contentTextarea.value?.$el?.querySelector('textarea')
  if (!textarea) {
    console.error('Textarea não encontrado')
    return
  }

  const startPos = textarea.selectionStart
  const endPos = textarea.selectionEnd
  const currentContent = form.value.content || ''

  // Tag HTML da imagem com classe para estilo
  const imageTag = `<img src="${url}" alt="${alt}" class="content-image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0;" />`

  // Inserir na posição do cursor
  const newContent =
    currentContent.substring(0, startPos) + imageTag + currentContent.substring(endPos)

  form.value.content = newContent

  // Focar o textarea novamente e posicionar cursor após a imagem
  setTimeout(() => {
    textarea.focus()
    const newCursorPos = startPos + imageTag.length
    textarea.setSelectionRange(newCursorPos, newCursorPos)
  }, 10)
}

/**
 * Confirmar exclusão de imagem
 */
const confirmDeleteImage = (image) => {
  $q.dialog({
    title: 'Confirmar exclusão',
    message: `Deseja realmente excluir a imagem "${image.name}" da galeria? Esta ação não afetará artigos que já usam esta imagem.`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await deleteImage(image)
  })
}

/**
 * Deletar imagem da galeria
 */
const deleteImage = async (image) => {
  try {
    await firebaseAdmin.deleteImage(image.id)
    $q.notify({
      type: 'positive',
      message: 'Imagem excluída da galeria!',
      position: 'top',
    })
    // Remover da lista local
    images.value = images.value.filter((img) => img.id !== image.id)
  } catch (error) {
    console.error('Erro ao excluir imagem:', error)
    $q.notify({
      type: 'negative',
      message: 'Erro ao excluir imagem: ' + error.message,
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
