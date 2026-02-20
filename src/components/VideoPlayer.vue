<template>
  <div
    class="video-player"
    :class="{ 'controls-visible': controlsVisible || paused }"
    @mousemove="showControls"
    @touchstart="toggleControlsOnTouch"
    @click.self="togglePlay"
  >
    <!-- Video element -->
    <video
      ref="videoEl"
      class="video-player__video"
      playsinline
      :src="src"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onMetadata"
      @ended="onEnded"
      @waiting="buffering = true"
      @canplay="buffering = false"
      @click="togglePlay"
    />

    <!-- Buffering spinner -->
    <div v-if="buffering && !paused" class="video-player__buffering">
      <q-spinner color="white" size="2.5em" />
    </div>

    <!-- Big play button overlay -->
    <transition name="fade">
      <div v-if="paused && !buffering" class="video-player__big-play" @click="togglePlay">
        <q-icon name="play_arrow" size="4rem" color="white" />
      </div>
    </transition>

    <!-- Controls bar -->
    <div class="video-player__controls" @click.stop>
      <!-- Progress bar -->
      <div
        class="video-player__progress"
        @click="seekFromBar"
        @mousemove="onProgressHover"
        @mouseleave="hoverTime = null"
        ref="progressBar"
      >
        <div class="video-player__progress-track">
          <div class="video-player__progress-buffer" :style="{ width: bufferedPercent + '%' }" />
          <div class="video-player__progress-fill" :style="{ width: progressPercent + '%' }" />
          <div class="video-player__progress-thumb" :style="{ left: progressPercent + '%' }" />
        </div>
        <!-- Hover time tooltip -->
        <div
          v-if="hoverTime !== null"
          class="video-player__hover-time"
          :style="{ left: hoverTimeX + 'px' }"
        >
          {{ formatTime(hoverTime) }}
        </div>
      </div>

      <!-- Bottom row -->
      <div class="video-player__bottom">
        <!-- Left controls -->
        <div class="video-player__left">
          <!-- Play/Pause -->
          <q-btn
            flat
            round
            dense
            size="sm"
            :icon="paused ? 'play_arrow' : 'pause'"
            color="white"
            @click="togglePlay"
          />

          <!-- Volume -->
          <q-btn
            flat
            round
            dense
            size="sm"
            :icon="muteIcon"
            color="white"
            @click="toggleVolumeBar"
          />
          <div class="video-player__volume-wrap" :class="{ 'volume-visible': volumeBarVisible }">
            <input
              type="range"
              class="video-player__volume-slider"
              min="0"
              max="1"
              step="0.02"
              :value="volume"
              @input="setVolume"
            />
          </div>

          <!-- Time -->
          <span class="video-player__time"
            >{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span
          >
        </div>

        <!-- Right controls -->
        <div class="video-player__right">
          <!-- Speed -->
          <q-btn-dropdown flat dense size="sm" color="white" :label="speedLabel" no-icon-animation>
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

          <!-- Fullscreen -->
          <q-btn
            flat
            round
            dense
            size="sm"
            :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            color="white"
            @click="toggleFullscreen"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'

defineProps({
  src: { type: String, required: true },
})

const videoEl = ref(null)
const progressBar = ref(null)

const paused = ref(true)
const buffering = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const bufferedPercent = ref(0)
const volume = ref(1)
const muted = ref(false)
const speed = ref(1)
const isFullscreen = ref(false)
const controlsVisible = ref(true)
const volumeBarVisible = ref(false)
const hoverTime = ref(null)
const hoverTimeX = ref(0)

let hideTimer = null

const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]

const progressPercent = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0,
)

const speedLabel = computed(() => (speed.value === 1 ? '1x' : speed.value + 'x'))

const muteIcon = computed(() => {
  if (muted.value || volume.value === 0) return 'volume_off'
  if (volume.value < 0.5) return 'volume_down'
  return 'volume_up'
})

function togglePlay() {
  const v = videoEl.value
  if (!v) return
  if (v.paused) {
    v.play()
    paused.value = false
  } else {
    v.pause()
    paused.value = true
  }
}

function onTimeUpdate() {
  const v = videoEl.value
  if (!v) return
  currentTime.value = v.currentTime
  if (v.buffered.length) {
    bufferedPercent.value = (v.buffered.end(v.buffered.length - 1) / v.duration) * 100
  }
}

function onMetadata() {
  duration.value = videoEl.value?.duration || 0
}

function onEnded() {
  paused.value = true
  currentTime.value = 0
}

function seekFromBar(e) {
  const rect = progressBar.value.getBoundingClientRect()
  const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
  if (videoEl.value) {
    videoEl.value.currentTime = ratio * duration.value
    currentTime.value = videoEl.value.currentTime
  }
}

function onProgressHover(e) {
  const rect = progressBar.value.getBoundingClientRect()
  const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
  hoverTime.value = ratio * duration.value
  hoverTimeX.value = e.clientX - rect.left
}

function toggleVolumeBar() {
  volumeBarVisible.value = !volumeBarVisible.value
  if (volumeBarVisible.value) {
    // auto-hide bar after 4s of no interaction
    clearTimeout(hideTimer)
  }
}

function setVolume(e) {
  volume.value = parseFloat(e.target.value)
  if (videoEl.value) {
    videoEl.value.volume = volume.value
    muted.value = volume.value === 0
  }
}

function setSpeed(s) {
  speed.value = s
  if (videoEl.value) videoEl.value.playbackRate = s
}

function toggleFullscreen() {
  const el = videoEl.value?.closest?.('.video-player') || videoEl.value
  if (!document.fullscreenElement) {
    el?.requestFullscreen?.()
    isFullscreen.value = true
  } else {
    document.exitFullscreen?.()
    isFullscreen.value = false
  }
}

function showControls() {
  controlsVisible.value = true
  clearTimeout(hideTimer)
  if (!paused.value) {
    hideTimer = setTimeout(() => {
      controlsVisible.value = false
    }, 3000)
  }
}

function toggleControlsOnTouch() {
  controlsVisible.value = !controlsVisible.value
  if (controlsVisible.value && !paused.value) {
    clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
      controlsVisible.value = false
    }, 3000)
  }
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
  clearTimeout(hideTimer)
  videoEl.value?.pause?.()
})
</script>

<style lang="scss" scoped>
@use 'src/css/quasar.variables.scss' as *;

.video-player {
  position: relative;
  width: 100%;
  background: #000;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 16 / 9;
  cursor: pointer;
  user-select: none;

  &__video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  // ── Buffering ──────────────────────────────────
  &__buffering {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.35);
    pointer-events: none;
  }

  // ── Big play overlay ───────────────────────────
  &__big-play {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.45);
    }

    .q-icon {
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));
      transition: transform 0.15s;
    }

    &:hover .q-icon {
      transform: scale(1.1);
    }
  }

  // ── Controls bar ───────────────────────────────
  &__controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 8px 6px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
    pointer-events: none;
  }

  &.controls-visible .video-player__controls {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }

  // ── Progress bar ───────────────────────────────
  &__progress {
    position: relative;
    padding: 8px 0 4px;
    cursor: pointer;

    &:hover .video-player__progress-thumb {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }

  &__progress-track {
    position: relative;
    height: 4px;
    background: rgba(255, 255, 255, 0.25);
    border-radius: 2px;
    transition: height 0.15s;

    .video-player__progress:hover & {
      height: 6px;
    }
  }

  &__progress-buffer {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 2px;
    transition: width 0.3s linear;
  }

  &__progress-fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: hsl(var(--primary));
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  &__progress-thumb {
    position: absolute;
    top: 50%;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    transform: translateX(-50%) scale(0);
    transition:
      transform 0.15s,
      opacity 0.15s;
    opacity: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }

  &__hover-time {
    position: absolute;
    bottom: 22px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
    transform: translateX(-50%);
    white-space: nowrap;
    pointer-events: none;
  }

  // ── Bottom row ─────────────────────────────────
  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  &__time {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
    margin-left: 4px;
    font-variant-numeric: tabular-nums;
  }

  // ── Volume slider ──────────────────────────────
  &__volume-wrap {
    width: 0;
    overflow: hidden;
    transition: width 0.2s ease;

    &.volume-visible {
      width: 70px;
    }
  }

  &__volume-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 66px;
    height: 3px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
  }
}

// ── Fade transition ────────────────────────────
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
