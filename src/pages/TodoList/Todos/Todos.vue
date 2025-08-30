<script setup>
import Tag from '@/components/Tag/Tag.vue'

const props = defineProps(['modelValue', 'onUpdateTodo'])

const handleUpdate = (todoId) => {
  props.onUpdateTodo(todoId)
}

</script>

<template>
  <transition-group name="fade" tag="ul" class="todos-wrapper">
    <li v-for="todo in modelValue" :key="todo.id" class="pl-2 flex items-center">
      <input style="cursor: pointer;" type="checkbox" class="w-4 h-4" @change="handleUpdate(todo.id)" />
      <input class="todo-name w-[200px] border-none hover:ring hover:ring-indigo-300" v-model="todo.name" />

      <Tag :type="todo.type || 'medium'">{{ todo.text || 'Medium' }}</Tag>
    </li>
  </transition-group>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.todos-wrapper {
  height: 300px;
  overflow-y: auto;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  padding: 2px 4px;
}
</style>
