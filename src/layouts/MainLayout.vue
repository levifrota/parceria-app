<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Parceria ao Lado </q-toolbar-title>

        <q-btn flat round dense icon="account_circle" @click="goToProfile" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-weight-bold">
          {{ greetingMessage }}
          <span v-if="familyProfile.parent1Name">, {{ familyProfile.parent1Name }}!</span>
        </q-item-label>

        <q-item clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Início</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/labor">
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Parto</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/postpartum">
          <q-item-section avatar>
            <q-icon name="child_care" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pós-parto</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/contractions">
          <q-item-section avatar>
            <q-icon name="timer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Contrações</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable to="/about">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sobre o Projeto</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/profile">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Perfil da Família</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.q-layout {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

.q-page-container {
  padding-top: 50px;
}

.q-page {
  padding-bottom: 20px;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePregnancyStore } from 'src/stores/pregnancy'

const router = useRouter()
const store = usePregnancyStore()

const leftDrawerOpen = ref(false)

const familyProfile = computed(() => store.familyProfile)
const greetingMessage = computed(() => store.greetingMessage)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const goToProfile = () => {
  router.push('/profile')
}
</script>
