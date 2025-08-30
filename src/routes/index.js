import { createWebHistory, createRouter } from 'vue-router'
import MainLayout from '@/layouts/MainLayout/MainLayout.vue'
import TodoList from '@/pages/TodoList/TodoList.vue'
import Auth from '@/pages/Auth/Auth.vue'
import NotFound from '@/pages/404/NotFound.vue'
import Settings from '@/pages/Settings/Settings.vue'

const routes = [
  { path: '/', redirect: '/plans', alias: '/home' },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'plans/:usersId?', component: TodoList },
      { path: 'settings', component: Settings }
    ]
  },
  { path: '/login', component: Auth },
  { path: '/register', component: Auth },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

export const router = createRouter({
  // linkActiveClass: 'bg-indigo-700',
  // linkExactActiveClass: 'bg-indigo-700',
  history: createWebHistory(),
  routes
})
