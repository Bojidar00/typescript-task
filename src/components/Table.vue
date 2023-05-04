<script setup lang="ts">
import { ref } from 'vue'
import TableRow from './TableRow.vue'
import Pagination from './Pagination.vue'
import DropDownSearch from './DropDownSearch.vue'
import type { Country } from '../countryInterface'
import { tableHeaders } from '../constants'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()

let selectedPages = ref<Country[]>([])
let currentPage = ref<number>(1)
let totalPages = ref<number>(1)
let maxVisibleButtons: number = 3
let itemsPerPage: number = 10

function update(page: number): void {
  currentPage.value = page
  let index: number = (currentPage.value - 1) * itemsPerPage
  selectedPages.value = countriesStore.countries.slice(index, index + itemsPerPage)
}

function selectCountry(selectedCountry: Country): void {
  selectedPages.value = [selectedCountry]
}

function showInfo(country: Country): void {
  countriesStore.setSelectedCountry(country)
}

function restoreTable(): void {
  currentPage.value = 1
  loadData()
}

async function loadData(): Promise<void> {
  await countriesStore.fetchCountries()
  totalPages.value = countriesStore.countries.length / itemsPerPage
  selectedPages.value = countriesStore.countries.slice(
    (currentPage.value - 1) * itemsPerPage,
    itemsPerPage
  )
}
loadData()

function sort(property: string): void {
  switch (property) {
    case 'Country': {
      selectedPages.value?.sort((a, b) => {
        const nameA = a.name.common.toUpperCase()
        const nameB = b.name.common.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
      break
    }
    case 'Capital': {
      selectedPages.value?.sort((a, b) => {
        const nameA = a.capital[0] ? a.capital[0].toUpperCase() : ''
        const nameB = b.capital[0] ? b.capital[0].toUpperCase() : ''
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
      break
    }
  }
}
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
      <th v-for="header in tableHeaders" @click="sort(header)">{{ header }}</th>
    </tr>

    <TableRow v-for="c in selectedPages" :countrie="c" @hold="showInfo" />
  </table>
  <Pagination
    v-if="selectedPages.length > 1"
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
