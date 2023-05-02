<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  maxVisibleButtons: number
  totalPages: number
  perPage: number
  currentPage: number
}>()

const startPage = computed((): number => {
  if (props.currentPage === 1) {
    return 1
  }

  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons
  }

  return props.currentPage - 1
})

const pages = computed(() => {
  const range = []

  for (
    let i = startPage.value;
    i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage
    })
  }

  return range
})

const isInFirstPage = computed((): boolean => {
  return props.currentPage === 1
})

const isInLastPage = computed((): boolean => {
  return props.currentPage === props.totalPages
})

const emit = defineEmits(['pagechanged'])

function onClickFirstPage(): void {
  emit('pagechanged', 1)
}

function onClickPreviousPage(): void {
  emit('pagechanged', props.currentPage - 1)
}

function onClickPage(page: number): void {
  emit('pagechanged', page)
}

function onClickNextPage(): void {
  emit('pagechanged', props.currentPage + 1)
}
function onClickLastPage(): void {
  emit('pagechanged', props.totalPages)
}
</script>

<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">First</button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">Previous</button>
    </li>

    <li v-for="page in pages" :key="page.name" class="pagination-item">
      <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled">
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">Next</button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">Last</button>
    </li>
  </ul>
</template>

<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
