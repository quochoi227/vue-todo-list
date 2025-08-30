<script setup>
import { ref } from 'vue'
import SidebarItem from './SidebarItem/SidebarItem.vue'
import Button from '@/components/Button/Button.vue'

const isOpen = ref(true)

</script>
<template>
  <aside class="w-64 h-full">
    <div class="relative h-full bg-gray-50 overflow-y-auto px-3 py-4">
      <ul class="font-medium space-y-2">
        <RouterLink to="/plans" v-slot="{ isActive }">
          <SidebarItem :class="isActive ? 'bg-gray-200' : ''">
            <i class="pi pi-home"></i>
            <span v-show="isOpen">Plans</span>
          </SidebarItem>
        </RouterLink>
        <RouterLink to="/settings" v-slot="{ isActive }">
          <SidebarItem :class="isActive ? 'bg-gray-200' : ''">
            <i class="pi pi-cog"></i>
            <span v-show="isOpen">Settings</span>
          </SidebarItem>
        </RouterLink>
      </ul>
      <div class="absolute right-3 bottom-3">
        <RouterLink to="/login">
          <Button size="small" variant="outlined" class="rounded-sm">Sign out</Button>
        </RouterLink>
      </div>
    </div>
  </aside>
</template>
