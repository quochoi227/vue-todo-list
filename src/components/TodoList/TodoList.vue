<script setup>
import { computed, ref } from 'vue'
import { useClickOutsideGlobal } from '@/composables/useClickOutsideGlobal'
import { v4 as uuidv4 } from 'uuid'
// import Select from './Priority/Select.vue'
import Select from '../Select/Select.vue'
import Tag from '../Tag/Tag.vue'
import Filters from './Filters/Filters.vue'

// Filters
const searchValue = ref('')
const status = ref('todo')
const priority = ref(null)

// Handle
const inputRef = ref(null)
const todoName = ref('')
const todos = ref([])

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

//---------------------
const selectedTag = ref({ name: 'High', code: 'high' })

const tags = ref([
  { name: 'High', code: 'high' },
  { name: 'Medium', code: 'medium' },
  { name: 'Low', code: 'low' }
])
//---------------------

const handleAddTodo = () => {
  if (todoName.value === '' || !selectedTag.value) return
  todos.value.push({
    id: uuidv4(),
    name: todoName.value,
    text: selectedTag.value.name,
    type: selectedTag.value.code,
    completed: false
  })
  todoName.value = ''
  inputRef.value.focus()
}

const handleUpdate = (id) => {
  const targetIndex = todos.value.findIndex(todo => todo.id === id)
  todos.value.splice(targetIndex, 1)
}

const handleKeyDown = (event) => {
  // if (event.key >= '1' && event.key <= tags.value.length.toString()) {
  //   selectedTag.value = tags.value[event.key-1]
  // }
  if (event.key === 'ArrowUp') {
    let currentIndex = tags.value.findIndex((tag) => tag.code === selectedTag.value.code)
    if (currentIndex === 0) {
      currentIndex = tags.value.length - 1
    } else {
      currentIndex--
    }
    selectedTag.value = tags.value[currentIndex]
  } else if (event.key === 'ArrowDown') {
    let currentIndex = tags.value.findIndex((tag) => tag.code === selectedTag.value.code)
    if (currentIndex === tags.value.length - 1) {
      currentIndex = 0
    } else {
      currentIndex++
    }
    selectedTag.value = tags.value[currentIndex]
  }
}

</script>

<template>
  <div class="wrapper">
    <h1 class="heading" style="display: flex; align-items: center; justify-content: center;">
      <img width="40px" src="/src/assets/vue-svgrepo-com.svg" />
      Todo List App
    </h1>
    <div class="body">
      <Filters v-model:searchValue="searchValue" v-model:status="status" v-model:priority="priority" />
      <transition-group name="fade" tag="ul">
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input style="cursor: pointer;" type="checkbox" @change="handleUpdate(todo.id)" />
          <input class="todo-name" v-model="todo.name" />
          <Tag :type="todo.type">{{ todo.text }}</Tag>
        </li>
      </transition-group>
    </div>
    <div class="footer">
      <input @keydown.enter="handleAddTodo" @keydown="handleKeyDown" ref="inputRef" v-model="todoName" type="text" placeholder="Enter new todo...">
      <Select v-model="selectedTag" :options="tags" position="top" disable-arrow="true">
        <template #option="{ option }">
          <div class="custom-item">
            <Tag v-if="option" :type="option.code">{{ option.name }}</Tag>
            <div v-else>Select</div>
          </div>
        </template>
      </Select>

      <button @click="handleAddTodo">Add</button>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    width: 400px;
    height: 600px;
    border: 3px solid #213547;
    border-radius: 8px;
    background-color: white;
    padding: 6px;
    display: flex;
    flex-direction: column;
  }

  .heading {
    text-align: center;
  }

  .body {
    flex: 1;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: 330px;
      overflow-x: hidden;
      overflow-y: auto;
    }

    li {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .todo-name {
      font-size: 1.1rem;
      border: none;
      padding: 2px 4px;
    }
  }

  .footer {
    display: flex;
    input {
      padding: 4px 6px;
      font-size: 1.2rem;
      flex: 1;
      min-width: 100px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease;
  }
  .fade-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

</style>
