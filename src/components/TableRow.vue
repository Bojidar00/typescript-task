<script setup lang="ts">
import { ref } from 'vue'
import type { Country } from '../countrieType'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()
const props = defineProps<{
  countrie: Country
}>()

let interval = ref<number>()

const emit = defineEmits(['hold'])

function mouseDown() {
  console.log('a')
  countriesStore.showToast = true
  interval.value = setInterval(test, 2000)
}

function mouseUp() {
  console.log('clear')
  clearInterval(interval.value)
  countriesStore.showToast = false
}

function test() {
  countriesStore.showToast = false
  console.log('test')
  emit('hold', props.countrie)
  clearInterval(interval.value)
}
</script>

<template>
  <tr @mousedown="mouseDown" @mouseup="mouseUp">
    <td>{{ countrie.name.common }}</td>
    <td>{{ countrie.capital[0] }}</td>
  </tr>
</template>

<style></style>
