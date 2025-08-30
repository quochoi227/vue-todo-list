<script setup>
import Select from '@/components/Select/Select.vue'
import Tag from '@/components/Tag/Tag.vue'
import { ref } from 'vue'
import Button from '@/components/Button/Button.vue'

const props = defineProps(['onAddTodo'])

const inputRef = ref(null)

defineExpose({
  inputRef
})

const todoName = ref('')
const tags = ref([
  { name: 'High', code: 'high' },
  { name: 'Medium', code: 'medium' },
  { name: 'Low', code: 'low' }
])
const selectedTag = ref({ name: 'High', code: 'high' })

const handleAddTodo = () => {
  props.onAddTodo(todoName.value, selectedTag.value)
  todoName.value = ''
  inputRef.value.focus()
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
  <div class="footer p-3">
    <input @keydown.enter="handleAddTodo" @keydown="handleKeyDown" ref="inputRef" class="focus:outline-2 focus:outline-indigo-300 z-10" v-model="todoName" type="text" placeholder="Enter new todo...">
    <Select v-model="selectedTag" :options="tags" position="top" disable-arrow="true">
      <template #option="{ option }">
        <Tag v-if="option" :type="option.code" small="true">{{ option.name }}</Tag>
        <span v-else>{{ Select }}</span>
        <!-- <span>{{ option.name }}</span> -->
      </template>
    </Select>

    <Button variant="contained" @click="handleAddTodo">Add</Button>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  input {
    border: 1px solid #2e2e2e;
    padding: 4px 6px;
    font-size: 1.2rem;
    flex: 1;
    min-width: 100px;
  }
}

.footer > * {
  border-radius: unset;
}

.footer > *:first-child {
  border-radius: 6px 0 0 6px;
  /* border-right: none; */
}

.footer > *:last-child {
  border-radius: 0 6px 6px 0;
  /* border-left: none; */
}
</style>
