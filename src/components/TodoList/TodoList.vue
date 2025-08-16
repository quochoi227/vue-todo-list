<script setup>
import { ref, useTemplateRef } from 'vue'
// import Select from './Priority/Select.vue'
import Select from '../Select/Select.vue'
import Tag from '../Tag/Tag.vue'
import Filters from './Filters/Filters.vue'

const inputRef = useTemplateRef('input-ref')
const todos = ref([])
const priority = ref({ type: 'high', text: 'High' })
const todoName = ref('')

// const handleChangePriority = (newPriority) => {
//   priority.value = newPriority
// }

//---------------------
const selectedTag = ref(null)

const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])

const tags = ref([
  { name: 'High', code: 'high' },
  { name: 'Medium', code: 'medium' },
  { name: 'Low', code: 'low' }
])
//---------------------

const handleAddTodo = () => {
  if (todoName.value === '' || !selectedTag.value) return
  todos.value.push({
    id: Math.random(),
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

</script>

<template>
  <div class="wrapper">
    <h1 class="heading" style="display: flex; align-items: center; justify-content: center;">
      <img width="40px" src="/src/assets/vue-svgrepo-com.svg" />
      Todo List App
    </h1>
    <div class="body">
      <!-- <Select v-model="selectedTag" :options="tags">
        <template #option="{ option }">
          <div class="custom-item">
            <i class="pi pi-flag"></i>
            <strong>{{ option.code }}</strong> - {{ option.name }}
          </div>
          <Tag v-if="option" :type="option.code">{{ option.name }}</Tag>
          <div v-else>Select</div>
        </template>
      </Select> -->
      <Filters />
      <transition-group name="fade" tag="ul">
        <li v-for="todo in todos" :key="todo.id" :style="{ textDecoration: todo.completed ? 'line-through' : '' }">
          <input style="cursor: pointer;" type="checkbox" @change="handleUpdate(todo.id)" />
          <input class="todo-name" v-model="todo.name" />
          <Tag :type="todo.type">{{ todo.text }}</Tag>
        </li>
      </transition-group>
    </div>
    <div class="footer">
      <input ref="input-ref" v-model="todoName" type="text" placeholder="Enter new todo...">
      <!-- <Select v-model="priority">
        <template #selected="{ selected }">
          <Tag :type="selected.type">{{ selected.text }}</Tag>
        </template>

        <template #options="{ select }">
          <div @click.stop="select({ type: 'high', text: 'High' })">
            <Tag type="high">High</Tag>
          </div>
          <div @click.stop="select({ type: 'medium', text: 'Medium' })">
            <Tag type="medium">Medium</Tag>
          </div>
          <div @click.stop="select({ type: 'low', text: 'Low' })">
            <Tag type="low">Low</Tag>
          </div>
        </template>
      </Select> -->
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
