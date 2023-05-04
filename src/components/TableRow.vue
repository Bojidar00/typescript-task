<script setup lang="ts">
import { ref } from 'vue'
import type { Country } from '../countryInterface'
import { useCountriesStore } from '@/stores/countries'

const props = defineProps<{ countrie: Country }>()

const countriesStore = useCountriesStore()

let interval = ref<number>()

const emit = defineEmits(['hold'])

function mouseDown() {
  countriesStore.showToastDuration = 500
  interval.value = setInterval(showCountryInfo, 2000)
}

function mouseUp() {
  clearInterval(interval.value)
  countriesStore.showToastDuration = 0
}

function showCountryInfo() {
  countriesStore.showToastDuration = 0
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
