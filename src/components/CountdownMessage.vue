<script setup lang="ts">
import { ref } from 'vue'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()

let milliSeconds = ref(countriesStore.showToastDuration)

function millisToSeconds(millis: number): string {
  return (millis / 1000).toPrecision(2)
}

;(async function countDown(): Promise<void> {
  while (milliSeconds.value !== 0) {
    await new Promise((r) => setTimeout(r, 1))
    milliSeconds.value--
  }
  countriesStore.showToastDuration = 0
})()
</script>

<template>
  <div class="modal">Hold for {{ millisToSeconds(milliSeconds) }} seconds to open modal.</div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  margin: 30px;
}
</style>
