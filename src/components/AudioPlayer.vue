<template>
  <div class="audio-player">
    <!-- Waveform / visual header -->
    <div class="audio-player__header">
      <div class="audio-player__icon">
        <q-icon name="headphones" size="1.8rem" color="white" />
      </div>
      <div class="audio-player__meta">
        <slot name="title">
          <span class="audio-player__label">Podcast</span>
        </slot>
        <span class="audio-player__time-display">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </span>
      </div>
    </div>

    <!-- Progress bar -->
    <div
      class="audio-player__progress"
      ref="progressBar"
      @click="seekFromBar"
      @mousemove="onProgressHover"
      @mouseleave="hoverTime = null"
    >
      <div class="audio-player__track">
        <div class="audio-player__buffer" :style="{ width: bufferedPercent + '%' }" />
        <div class="audio-player__fill" :style="{ width: progressPercent + '%' }" />
        <div class="audio-player__thumb" :style="{ left: progressPercent + '%' }" />
      </div>
      <div
        v-if="hoverTime !== null"
        class="audio-player__hover-time"
        :style="{ left: hoverTimeX + 'px' }"
      >
        {{ formatTime(hoverTime) }}
      </div>
    </div>

    <!-- Controls row -->
    <div class="audio-player__controls">
      <!-- Left: speed -->
      <q-btn-dropdown
        flat
        dense
        size="sm"
        :label="speedLabel"
        no-icon-animation
        class="audio-player__speed-btn"
      >
        <q-list dense>
          <q-item
            v-for="s in speeds"
            :key="s"
            clickable
            v-close-popup
            :active="speed === s"
            @click="setSpeed(s)"
          >
            <q-item-section>{{ s === 1 ? 'Normal' : s + 'x' }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <!-- Center: skip back + play + skip forward -->
      <div class="audio-player__center">
        <q-btn flat round dense icon="replay_10" size="sm" @click="skip(-10)" />
        <q-btn
          round
          :icon="paused ? 'play_arrow' : 'pause'"
          class="audio-player__play-btn"
          color="primary"
          size="md"
          @click="togglePlay"
        />
        <q-btn flat round dense icon="forward_30" size="sm" @click="skip(30)" />
      </div>

      <!-- Right: volume + mute -->
      <div class="audio-player__right">
        <q-btn flat round dense size="sm" :icon="muteIcon" @click="toggleMute" />
        <input
          type="range"
          class="audio-player__volume-slider"
          min="0"
          max="1"
          step="0.02"
          :value="volume"
          @input="setVolume"
        />
      </div>
    </div>

    <audio
      ref="audioEl"
      :src="src"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onMetadata"
      @ended="onEnded"
      @waiting="buffering = true"
      @canplay="buffering = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

defineProps({
  src: { type: String, required: true },
})

const audioEl = ref(null)
const progressBar = ref(null)

const paused = ref(true)
const buffering = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const bufferedPercent = ref(0)
const volume = ref(1)
const muted = ref(false)
const speed = ref(1)
const hoverTime = ref(null)
const hoverTimeX = ref(0)

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

const progressPercent = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0,
)

const speedLabel = computed(() => speed.value + 'x')

const muteIcon = computed(() => {
  if (muted.value || volume.value === 0) return 'volume_off'
  if (volume.value < 0.5) return 'volume_down'
  return 'volume_up'
})

function togglePlay() {
  const a = audioEl.value
  if (!a) return
  if (a.paused) {
    a.play()
    paused.value = false
  } else {
    a.pause()
    paused.value = true
  }
}

function skip(seconds) {
  if (audioEl.value) {
    audioEl.value.currentTime = Math.min(
      Math.max(audioEl.value.currentTime + seconds, 0),
      duration.value,
    )
  }
}

function onTimeUpdate() {
  const a = audioEl.value
  if (!a) return
  currentTime.value = a.currentTime
  if (a.buffered.length) {
    bufferedPercent.value = (a.buffered.end(a.buffered.length - 1) / a.duration) * 100
  }
}

function onMetadata() {
  duration.value = audioEl.value?.duration || 0
}

function onEnded() {
  paused.value = true
  currentTime.value = 0
}

function seekFromBar(e) {
  const rect = progressBar.value.getBoundingClientRect()
  const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
  if (audioEl.value) {
    audioEl.value.currentTime = ratio * duration.value
    currentTime.value = audioEl.value.currentTime
  }
}

function onProgressHover(e) {
  const rect = progressBar.value.getBoundingClientRect()
  const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
  hoverTime.value = ratio * duration.value
  hoverTimeX.value = e.clientX - rect.left
}

function toggleMute() {
  muted.value = !muted.value
  if (audioEl.value) audioEl.value.muted = muted.value
}

function setVolume(e) {
  volume.value = parseFloat(e.target.value)
  if (audioEl.value) {
    audioEl.value.volume = volume.value
    muted.value = volume.value === 0
  }
}

function setSpeed(s) {
  speed.value = s
  if (audioEl.value) audioEl.value.playbackRate = s
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, '0')
  return `${m}:${sec}`
}

onBeforeUnmount(() => {
  audioEl.value?.pause?.()
})
</script>

<style lang="scss" scoped>
@use 'src/css/quasar.variables.scss' as *;

.audio-player {
  border-radius: var(--radius);
  overflow: hidden;
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));

  // ── Header ─────────────────────────────────────
  &__header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 16px 12px;
    background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(265deg 80% 45%) 100%);
  }

  &__icon {
    width: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__label {
    font-size: 13px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  &__time-display {
    font-size: 14px;
    color: #fff;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  // ── Progress ───────────────────────────────────
  &__progress {
    position: relative;
    padding: 10px 16px 4px;
    cursor: pointer;

    &:hover .audio-player__thumb {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
    &:hover .audio-player__track {
      height: 6px;
    }
  }

  &__track {
    position: relative;
    height: 4px;
    background: hsl(var(--muted));
    border-radius: 2px;
    transition: height 0.15s;
  }

  &__buffer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: hsl(var(--border));
    border-radius: 2px;
    transition: width 0.3s linear;
  }

  &__fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: hsl(var(--primary));
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  &__thumb {
    position: absolute;
    top: 50%;
    width: 14px;
    height: 14px;
    background: hsl(var(--primary));
    border-radius: 50%;
    transform: translateX(-50%) scale(0);
    transition:
      transform 0.15s,
      opacity 0.15s;
    opacity: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    pointer-events: none;
  }

  &__hover-time {
    position: absolute;
    bottom: 22px;
    background: hsl(var(--popover));
    color: hsl(var(--popover-foreground));
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
    transform: translateX(-50%);
    white-space: nowrap;
    pointer-events: none;
    border: 1px solid hsl(var(--border));
  }

  // ── Controls row ───────────────────────────────
  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 12px 12px;
  }

  &__center {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__play-btn {
    box-shadow: $shadow-sm;
    transition:
      transform 0.15s,
      box-shadow 0.15s;

    &:hover {
      transform: scale(1.06);
      box-shadow: $shadow-md;
    }

    &:active {
      transform: scale(0.96);
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__speed-btn {
    font-size: 11px;
    font-weight: 600;
    min-width: 40px;
  }

  // ── Volume slider ──────────────────────────────
  &__volume-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 60px;
    height: 3px;
    border-radius: 2px;
    background: hsl(var(--muted));
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: hsl(var(--primary));
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
