<template>
  <q-page padding>
    <div class="page-header q-mb-lg">
      <q-btn flat round dense icon="arrow_back" @click="$router.back()" />
      <h1 class="text-h4 text-weight-bold q-ml-md">Contador de Contrações</h1>
    </div>

    <ContractionTimer />
  </q-page>
</template>

<script setup>
import ContractionTimer from 'src/components/ContractionTimer.vue'
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
}
</style>
