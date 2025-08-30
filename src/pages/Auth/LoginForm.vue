<script setup>
import TextField from '@/components/TextField/TextField.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const password = ref('')

const handleSubmit = () => {
  console.log('email', email.value)
  console.log('password', password.value)
  router.push('/plans')
}
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div :class="[$style.form, 'w-[380px] bg-white rounded-sm']">
      <div class="pt-4">
        <h2 class="text-center font-bold text-gray-600 text-3xl">LOG IN</h2>
        <h5 class="text-center text-gray-400">Author: quochoi227</h5>
      </div>
      <div class="p-4">
        <div class="mb-4">
          <TextField v-model="email" label="Enter Email..." />
        </div>
        <div>
          <TextField v-model="password" label="Enter Password..." />
        </div>
      </div>
      <div class="px-4">
        <button type="submit" class="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log in</button>
      </div>
      <div class="px-4 py-2.5 text-center">
        <span class="text-blue-600 hover:text-amber-300 text-md">
          <RouterLink to="/register">Create an account</RouterLink>
        </span>
      </div>
    </div>
  </form>
</template>
<style module>
.form {
  animation: appear 0.2s ease-in-out;
}

@keyframes appear {
  from {
    transform: scale(0.75);
  }

  to {
    transform: scale(1);
  }
}
</style>
