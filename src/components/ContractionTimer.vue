<template>
  <q-card class="contraction-timer">
    <q-card-section>
      <div class="text-h6">Contador de Contrações</div>
      <div class="text-subtitle2 text-grey-7">
        Registre suas contrações para monitorar o trabalho de parto
      </div>
    </q-card-section>

    <q-card-section>
      <div v-if="shouldGoToHospital" class="alert-hospital q-mb-md">
        <q-banner class="bg-red text-white" rounded>
          <template v-slot:avatar>
            <q-icon name="local_hospital" size="lg" />
          </template>
          <div class="text-h6">É hora de ir para a maternidade!</div>
          <div>Suas contrações estão regulares e próximas.</div>
        </q-banner>
      </div>

      <div class="timer-display text-center q-mb-md">
        <div class="text-h3 text-primary">{{ formattedTime }}</div>
        <div class="text-caption text-grey-7">Tempo da contração atual</div>
      </div>

      <div class="w">
        <q-btn
          v-if="!isTimerRunning"
          @click="startContraction"
          color="primary"
          size="lg"
          class="full-width"
          icon="play_arrow"
          label="Iniciar Contração"
        />
        <q-btn
          v-else
          @click="stopContraction"
          color="negative"
          size="lg"
          class="full-width"
          icon="stop"
          label="Finalizar Contração"
        />
      </div>

      <div v-if="contractionFrequency" class="q-mt-md text-center">
        <div class="text-body1">
          Frequência média:
          <strong
            >{{ contractionFrequency }} minuto{{ contractionFrequency > 1 ? 's' : '' }}</strong
          >
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row items-center justify-between q-mb-sm">
        <div class="text-subtitle1">Histórico</div>
        <q-btn
          v-if="contractions.length > 0"
          @click="clearHistory"
          flat
          dense
          color="negative"
          icon="delete"
          label="Limpar"
        />
      </div>

      <q-list v-if="contractions.length > 0" bordered separator>
        <q-item v-for="contraction in recentContractions" :key="contraction.id">
          <q-item-section>
            <q-item-label>{{ formatDate(contraction.timestamp) }}</q-item-label>
            <q-item-label caption>
              Duração: {{ formatDuration(contraction.duration) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div v-else class="text-center text-grey-7 q-pa-md">Nenhuma contração registrada ainda</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePregnancyStore } from 'src/stores/pregnancy'
import { date } from 'quasar'

const store = usePregnancyStore()

const isTimerRunning = ref(false)
const currentContractionId = ref(null)
const startTime = ref(null)
const elapsedTime = ref(0)
let intervalId = null

const contractions = computed(() => store.contractions)
const recentContractions = computed(() => [...store.contractions].reverse().slice(0, 10))
const contractionFrequency = computed(() => store.contractionFrequency)
const shouldGoToHospital = computed(() => store.shouldGoToHospital)

const formattedTime = computed(() => {
  const seconds = Math.floor(elapsedTime.value / 1000)
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

const startContraction = () => {
  isTimerRunning.value = true
  startTime.value = Date.now()
  currentContractionId.value = Date.now()
  store.addContractionAndSave(startTime.value)

  intervalId = setInterval(() => {
    elapsedTime.value = Date.now() - startTime.value
  }, 100)
}

const stopContraction = async () => {
  isTimerRunning.value = false
  clearInterval(intervalId)

  await store.endContractionAndSave(currentContractionId.value, elapsedTime.value)

  elapsedTime.value = 0
  startTime.value = null
  currentContractionId.value = null
}

const clearHistory = async () => {
  await store.clearContractionsAndDatabase()
}

const formatDate = (timestamp) => {
  return date.formatDate(timestamp, 'DD/MM/YYYY HH:mm:ss')
}

const formatDuration = (duration) => {
  if (!duration) return 'N/A'
  const seconds = Math.floor(duration / 1000)
  return `${seconds}s`
}
</script>

<style scoped>
.contraction-timer {
  max-width: 600px;
  margin: 0 auto;
}

.timer-display {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.alert-hospital {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}
</style>
