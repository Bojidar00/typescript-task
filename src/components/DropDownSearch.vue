<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Country } from '../countryInterface'

const props = defineProps<{
  options: Country[]
}>()
const maxElements: number = 10
const emit = defineEmits(['selected', 'closed'])

let searchFilter = ref<string>('')
let optionsShown = ref<boolean>(false)
let selected = ref<Country>()
let filteredOptions = ref<Country[]>()
let showCloseButton = ref(false)

watch(props, () => {
  filteredOptions.value = props.options.slice(0, maxElements)
})

function updateList() {
  filteredOptions.value = props.options.filter((country) =>
    country.name.common.startsWith(searchFilter.value)
  )
  filteredOptions.value = filteredOptions.value.slice(0, maxElements)
}

function showOptions() {
  searchFilter.value = ''
  optionsShown.value = true
}

function exit(): void {
  if (!selected.value) {
    selected.value = <Country>{}
  } else {
    searchFilter.value = selected.value.name.common
  }
  optionsShown.value = false
}

function close() {
  showCloseButton.value = false
  selected.value = <Country>{}
  searchFilter.value = ''
  emit('closed')
}

function keyMonitor(event: KeyboardEvent): void {
  if (event.key === 'Enter' && filteredOptions.value !== undefined) {
    selectOption(filteredOptions.value[0])
  } else {
    updateList()
  }
}

function selectOption(option: Country): void {
  selected.value = option
  optionsShown.value = false
  searchFilter.value = option.name.common
  showCloseButton.value = true
  emit('selected', option)
}
</script>

<template>
  <div class="dropdown" v-if="options">
    <input
      class="dropdown-input"
      autocomplete="off"
      name="name"
      @focus="showOptions()"
      @blur="exit()"
      @keyup="keyMonitor"
      v-model="searchFilter"
    />
    <button v-if="showCloseButton" @click="close">X</button>

    <div class="dropdown-content" v-show="optionsShown">
      <div
        class="dropdown-item"
        @mousedown="selectOption(option)"
        v-for="(option, index) in filteredOptions"
        :key="index"
      >
        {{ option.name.common }}
      </div>
    </div>
  </div>
</template>
