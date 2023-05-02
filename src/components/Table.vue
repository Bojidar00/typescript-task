<script setup lang="ts">
import type { Country } from '../countrieType'

import { useCountriesStore } from '@/stores/countries'
import TableRow from './TableRow.vue'
import Pagination from './Pagination.vue'
import { ref } from 'vue'
import DropDownSearch from './DropDownSearch.vue'

const countriesStore = useCountriesStore()

let selectedPages = ref<Country[]>()
let currentPage = ref(1)
let totalPages = ref(1)
let maxVisibleButtons = 3
let itemsPerPage = 10

function update(page: number) {
  currentPage.value = page
  let index = (currentPage.value - 1) * itemsPerPage
  selectedPages.value = countriesStore.countries.slice(index, index + itemsPerPage)
}

function selectCountry(selectedCountry: Country) {
  console.log(selectedCountry)
  selectedPages.value = [selectedCountry]
}

function showInfo(a: Country) {
  console.log('showInfo')
  countriesStore.setSelectedCountry(a)
}

function restoreTable() {
  currentPage.value = 1
  loadData()
}

async function loadData() {
  await countriesStore.fetchCountries()
  totalPages.value = countriesStore.countries.length / itemsPerPage
  selectedPages.value = countriesStore.countries.slice(
    (currentPage.value - 1) * itemsPerPage,
    itemsPerPage
  )
}
loadData()
</script>

<template>
  <div class="about">
    <h1>Table</h1>
  </div>

  <DropDownSearch
    :options="countriesStore.countries"
    @selected="selectCountry"
    @closed="restoreTable"
  />

  <table>
    <tr>
      <th>Country</th>
      <th>Capital</th>
    </tr>

    <TableRow v-for="c in selectedPages" :countrie="c" @hold="showInfo" />
  </table>
  <Pagination
    :maxVisibleButtons="maxVisibleButtons"
    :totalPages="totalPages"
    :perPage="itemsPerPage"
    :currentPage="currentPage"
    @pagechanged="update"
  />
</template>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
