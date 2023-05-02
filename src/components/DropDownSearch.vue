<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Country } from '../countrieType'

const props = defineProps<{
  options: any[]
}>()

let searchFilter = ref()
let optionsShown = ref(false)
let selected = ref()
let filteredOptions = ref<Country[]>()
let showCloseButton = ref(false)

watch(props, () => {
  filteredOptions.value = props.options.slice(0, 10)
})

function updateList() {
  console.log('update')
  filteredOptions.value = props.options.filter((country) =>
    country.name.common.startsWith(searchFilter.value)
  )
  filteredOptions.value = filteredOptions.value.slice(0, 10)
}

function showOptions() {
  console.log('focus')

  searchFilter.value = ''
  optionsShown.value = true
}
const emit = defineEmits(['selected', 'closed'])

function exit() {
  if (!selected.value) {
    selected.value = {}
  } else {
    searchFilter.value = selected.value;
  }
  optionsShown.value = false;
}

function close() {
  showCloseButton.value = false;
  selected.value = {};
  searchFilter.value = '';
  emit('closed');
}

function keyMonitor(event: KeyboardEvent) {
  if (event.key === 'Enter' && filteredOptions.value !== undefined) {
    selectOption(filteredOptions.value[0])
  } else {
    updateList();
  }
}

function selectOption(option: any) {
  selected.value = option.name.common
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
