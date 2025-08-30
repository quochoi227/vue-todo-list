<script setup>
import { computed, useAttrs } from 'vue'
const attrs = useAttrs()
const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (value) => ['contained', 'outlined', 'text'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium'].includes(value)
  }
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'contained':
      return 'text-white bg-blue-700 hover:bg-blue-800'
    case 'outlined':
      return 'text-blue-700 border border-blue-700 hover:border-blue-800'
    case 'text':
    default:
      return 'text-gray-700'
  }
})

</script>
<template>
  <button v-bind="attrs" type="button" :class="['font-medium rounded-lg text-sm focus:outline-none cursor-pointer', variantClass, {
    'px-5 py-2.5': props.size === 'medium',
    'px-3 py-1.5': props.size === 'small'
  }]">
    <slot />
  </button>
</template>
