<script setup>
import { useTheme } from '@/composables/useTheme'

defineProps(['style'])
const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme" :style>
    <i v-if="theme === 'light'" class="pi pi-sun"></i>
    <i v-else-if="theme === 'dark'" class="pi pi-moon"></i>
  </button>
</template>
