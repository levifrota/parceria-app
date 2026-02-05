<template>
  <q-page padding>
    <div class="page-header q-mb-lg">
      <q-btn flat round dense icon="arrow_back" @click="$router.back()" />
      <h1 class="text-h4 text-weight-bold q-ml-md">Perfil da Família</h1>
    </div>

    <q-card class="profile-card">
      <q-card-section>
        <div class="text-h6 text-primary q-mb-md">
          <q-icon name="family_restroom" size="sm" class="q-mr-sm" />
          Informações da Família
        </div>
        <p class="text-body2 text-grey-7">
          Preencha os dados para personalizar sua experiência no aplicativo
        </p>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit="saveProfile" class="q-gutter-md">
          <!-- Nome do Bebê -->
          <q-input
            v-model="form.babyName"
            label="Nome do Bebê"
            hint="Opcional - você pode preencher depois"
            outlined
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="child_care" color="pink" />
            </template>
          </q-input>

          <!-- Nome do Pai/Mãe 1 -->
          <q-input
            v-model="form.parent1Name"
            label="Nome do Pai/Mãe 1"
            outlined
            clearable
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="primary" />
            </template>
          </q-input>

          <!-- Nome do Pai/Mãe 2 -->
          <q-input
            v-model="form.parent2Name"
            label="Nome do Pai/Mãe 2"
            outlined
            clearable
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="secondary" />
            </template>
          </q-input>

          <!-- Como quer ser chamado -->
          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-sm">Como você gostaria de ser chamado(a)?</div>
            <q-option-group
              v-model="form.userRole"
              :options="roleOptions"
              color="primary"
              inline
              class="role-options"
            />
          </div>

          <!-- Visualização do tratamento -->
          <q-banner v-if="form.userRole" rounded class="bg-blue-1 q-mb-md">
            <template v-slot:avatar>
              <q-icon :name="getRoleIcon(form.userRole)" color="primary" />
            </template>
            <div class="text-body2">
              Você será chamado(a) de <strong>{{ getRoleLabel(form.userRole) }}</strong> no
              aplicativo
            </div>
          </q-banner>

          <!-- Botões -->
          <div class="row q-gutter-sm q-mt-md">
            <q-btn
              type="submit"
              color="primary"
              label="Salvar Perfil"
              icon="save"
              class="col"
              :loading="saving"
            />
            <q-btn
              v-if="isProfileComplete"
              flat
              color="grey"
              label="Cancelar"
              @click="$router.back()"
              class="col"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Card de Informações -->
    <q-card class="q-mt-md info-card" flat bordered>
      <q-card-section>
        <div class="row items-center">
          <q-icon name="info" color="blue" size="md" class="q-mr-md" />
          <div class="col">
            <div class="text-subtitle2 text-weight-bold">Sobre as informações</div>
            <div class="text-caption text-grey-7">
              Seus dados são salvos apenas no seu dispositivo e podem ser alterados a qualquer
              momento
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePregnancyStore } from 'src/stores/pregnancy'
import { useQuasar } from 'quasar'

const router = useRouter()
const store = usePregnancyStore()
const $q = useQuasar()

const saving = ref(false)

const form = ref({
  babyName: '',
  parent1Name: '',
  parent2Name: '',
  userRole: 'parceria',
})

const roleOptions = [
  {
    label: '👨 Papai',
    value: 'papai',
  },
  {
    label: '👩 Mamãe',
    value: 'mamae',
  },
  {
    label: '👥 Parceria',
    value: 'parceria',
  },
]

const isProfileComplete = ref(false)

onMounted(() => {
  // Carregar dados existentes
  form.value = { ...store.familyProfile }
  isProfileComplete.value = store.isProfileComplete
})

const getRoleIcon = (role) => {
  const icons = {
    papai: 'man',
    mamae: 'woman',
    parceria: 'diversity_3',
  }
  return icons[role] || 'person'
}

const getRoleLabel = (role) => {
  const labels = {
    papai: 'Papai',
    mamae: 'Mamãe',
    parceria: 'Parceria',
  }
  return labels[role] || 'Usuário'
}

const saveProfile = async () => {
  saving.value = true

  // Salvar no banco de dados
  await store.updateFamilyProfileAndSave(form.value)
  console.log('salvou')

  $q.notify({
    type: 'positive',
    message: 'Perfil salvo com sucesso!',
    icon: 'check_circle',
    position: 'top',
  })

  console.log('saving?', saving)

  saving.value = false
  console.log('new saving?', saving)

  // Voltar ou ir para home
  if (router.options.history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
}

.profile-card {
  max-width: 600px;
  margin: 0 auto;
}

.role-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.role-options :deep(.q-radio) {
  background: #f5f5f5;
  padding: 12px 20px;
  border-radius: 8px;
  transition: all 0.2s;
}

.role-options :deep(.q-radio:hover) {
  background: #e0e0e0;
}

.role-options :deep(.q-radio__label) {
  font-size: 1rem;
}

.info-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
