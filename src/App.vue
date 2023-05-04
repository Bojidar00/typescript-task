<script setup lang="ts">
import { useCountriesStore } from '@/stores/countries'
import { RouterView } from 'vue-router'
import CountryInfo from './components/CountryInfo.vue'
import CountdownMessage from './components/CountdownMessage.vue'

const countriesStore = useCountriesStore()
</script>

<template>
  <RouterView />
  <CountryInfo v-if="Object.keys(countriesStore.selectedCountry).length" />
  <CountdownMessage v-if="countriesStore.showToastDuration" />
</template>

<style scoped></style>
