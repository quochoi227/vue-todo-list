<script setup>
import { useRoute } from 'vue-router'
import LoginForm from '@/pages/Auth/LoginForm.vue'
import RegisterForm from '@/pages/Auth/RegisterForm.vue'
import { watch } from 'vue'
import login_register_bg from '@/assets/auth/login-register-bg-resized.jpg'

let isLoginPage, isRegisterPage
const route = useRoute()
watch(() => route.path, () => {
  isLoginPage = route.path === '/login'
  isRegisterPage = route.path === '/register'
}, { immediate: true })

</script>
<template>
  <div
    :class="$style.wrapper"
    :style="{
      background: `url(${login_register_bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <RegisterForm v-if="isRegisterPage" />
    <LoginForm v-if="isLoginPage" />
  </div>
</template>
<style module>
.wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
