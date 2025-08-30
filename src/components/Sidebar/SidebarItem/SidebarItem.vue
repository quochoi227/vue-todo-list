<script setup>
const props = defineProps(['class'])
</script>
<template>
  <li>
    <div :class="[props.class, 'flex mb-2 items-center p-2 rounded-lg hover:bg-gray-200 first:text-lg gap-2.5']">
      <slot />
    </div>
  </li>
</template>
