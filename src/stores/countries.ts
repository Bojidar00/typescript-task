import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import type { Country } from '../countrieType'

type State = {
  countries: Country[]
  selectedCountry: Country
  showToast: boolean
}

export const useCountriesStore = defineStore('countries', {
  state: (): State => ({
    countries: [],
    selectedCountry: <Country>{},
    showToast: false
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
