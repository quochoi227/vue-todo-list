<script setup>
const props = defineProps(['label', 'modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <div class="relative">
    <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)"  type="text" class="block p-3.5 w-full text-sm text-gray-900 bg-transparent rounded-sm border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label class="pointer-events-none absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-1/2 z-10 left-1 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 top-0 peer-focus:top-0 scale-75 peer-focus:scale-75 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100">
      {{ label }}
    </label>
  </div>
</template>
