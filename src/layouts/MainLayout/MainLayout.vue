<script setup>
import Sidebar from '@/components/Sidebar/Sidebar.vue'
</script>
<template>
  <div :class="$style.wrapper">
    <Sidebar />
    <div :class="$style.content">
      <RouterView />
    </div>
  </div>  
</template>
<style module>
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
}

.content {
  flex: 1;
  padding: 8px;
}
</style>
