<script setup>
defineProps(['type', 'small'])


</script>

<template>
  <div @click="$emit('clicked')" :class="['tag', type, { small }]">
    <slot />
  </div>
</template>

<style>
  .tag {
    border: 1px solid;
    border-radius: 4px;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tag.small {
    font-size: 0.8rem;
  }

  .tag.high {
    background-color: rgb(250, 230, 230);
    border-color: rgb(255, 126, 126);
    color: rgb(255, 126, 126);
  }

  .tag.medium {
    background-color: rgb(230, 230, 255);
    border-color: rgb(123, 123, 255);
    color: rgb(123, 123, 255);
  }

  .tag.low {
    background-color: #e5e5e5;
  }
</style>
