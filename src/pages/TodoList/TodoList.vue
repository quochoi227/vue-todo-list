<script setup>
import { ref, computed, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Filters from './Filters/Filters.vue'
import Todos from './Todos/Todos.vue'
import Operation from './Operation/Operation.vue'
import Typography from '@/components/Typography/Typography.vue'

// Filters
const searchValue = ref('')
const status = ref('todo')
const priority = ref(null)

// Handle
const todos = ref([])

const handleAddTodo = (todoName, selectedTag) => {
  if (todoName === '' || !selectedTag) return
  todos.value.push({
    id: uuidv4(),
    name: todoName,
    text: selectedTag.name,
    type: selectedTag.code,
    completed: false
  })
}

const filteredTodos = computed(() => {
  const priorityCondition = (todo) => {
    if (!priority.value) return true
    return todo.type === priority.value.code
  }
  if (searchValue.value === '') {
    return todos.value.filter((todo) => {
      return priorityCondition(todo)
    })
  } else {
    return todos.value.filter((todo) => {
      return todo.name.toLowerCase().includes(searchValue.value.toLowerCase()) && priorityCondition(todo)
    })
  }
})

const handleUpdate = (id) => {
  const targetIndex = todos.value.findIndex(todo => todo.id === id)
  todos.value.splice(targetIndex, 1)
}

const plans = ref(null)

onMounted(() => {
  setTimeout(() => {
    plans.value = 'data'
  }, 500)
})
</script>

<template>
  <div v-if="plans" class="wrapper border border-indigo-800 shadow-2xl">
    <Typography class="text-2xl text-indigo-600" variant="h1" align="center" weight="600">Todo App</Typography>
    <div class="body">
      <Filters v-model:searchValue="searchValue" v-model:status="status" v-model:priority="priority" />
      <Todos v-model="filteredTodos" :onUpdateTodo="handleUpdate" />
    </div>
    <Operation
      :onAddTodo="handleAddTodo"
    />
  </div>
  <div v-else class="w-full h-full flex items-center justify-center">
    <svg aria-hidden="true" class="w-[50px] h-[50px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  </div>
</template>

<style scoped>
  .wrapper {
    margin: 20px auto;
    position: relative;
    width: 400px;
    height: 600px;
    border-radius: 8px;
    background-color: var(--app-bg-color);
    padding: 6px;
    display: flex;
    flex-direction: column;
  }

  .body {
    flex: 1;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
</style>
