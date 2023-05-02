<script setup lang="ts">
import type { Country } from '../countrieType'
import { useCountriesStore } from '@/stores/countries'

const countriesStore = useCountriesStore()

function closeModal(): void {
  countriesStore.setSelectedCountry(<Country>{})
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <button @click="closeModal">X</button>
      <h3>Details view</h3>
      <table>
        <tr>
          <th>Country</th>
          <th>Capital</th>
        </tr>
        <tr>
          <td>{{ countriesStore.selectedCountry.name.common }}</td>
          <td>{{ countriesStore.selectedCountry.capital[0] }}</td>
        </tr>
      </table>
    </div>
  </div>
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

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  min-width: 300px;
}

th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-weight: bold;
}
</style>
