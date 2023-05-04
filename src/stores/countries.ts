import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import type { Country } from '../countryInterface'

interface State {
  countries: Country[]
  selectedCountry: Country
  showToastDuration: number
}

export const useCountriesStore = defineStore('countries', {
  state: (): State => ({
    countries: [],
    selectedCountry: <Country>{},
    showToastDuration: 0
  }),
  actions: {
    async fetchCountries() {
      this.countries = (
        await axios.get('https://restcountries.com/v3/all?fields=name,capital')
      ).data
    },

    setSelectedCountry(country: Country) {
      this.selectedCountry = country
    }
  }
})
