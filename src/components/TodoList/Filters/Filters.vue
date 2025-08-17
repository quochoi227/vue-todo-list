<script setup>
import { ref, watch } from 'vue'
import Select from '@/components/Select/Select.vue'
import Tag from '@/components/Tag/Tag.vue'

const props = defineProps(['searchValue', 'status', 'priority'])
const emit = defineEmits(['update:searchValue', 'update:status', 'update:priority'])

const searchValue = ref(props.searchValue)
const status = ref(props.status)
const priority = ref(props.priority)

const bindings = [
  { key: 'searchValue', prop: () => props.searchValue, ref: searchValue },
  { key: 'status', prop: () => props.status, ref: status },
  { key: 'priority', prop: () => props.priority, ref: priority }
]

bindings.forEach(({ key, prop, ref }) => {
  watch(prop, (val) => {
    if (val !== ref.value) {
      console.log('prop updated')
      ref.value = val
    }
  })
  watch(ref, (val) => {
    emit(`update:${key}`, val)
  })
})

const tags = ref([
  { name: 'High', code: 'high' },
  { name: 'Medium', code: 'medium' },
  { name: 'Low', code: 'low' }
])
</script>

<template>
  <div class="filters-wrapper">
    <div class="filters-search">
      <label for="search">Search</label>
      <input v-model="searchValue" id="search" placeholder="Enter search value" />
    </div>
    <!-- <div class="filters-status">
      <label>Status</label>
      <div>
        <input type="radio" id="todo" value="todo" v-model="status" />
        <label for="todo">Todo</label>
        <input type="radio" id="completed" value="tompleted" v-model="status" />
        <label for="completed">Completed</label>
      </div>
    </div> -->
    <div class="filters-priority">
      <label>Priority</label>
      <Select v-model="priority" :options="tags" position="bottom" approve-reset="true">
        <template #option="{ option }">
          <div class="custom-item">
            <Tag v-if="option" :type="option.code">{{ option.name }}</Tag>
            <div v-else>Select</div>
          </div>
        </template>
      </Select>
    </div>
  </div>
</template>

<style scoped>
  .filters-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filters-search {
    display: flex;
    flex-direction: column;
    gap: 4px;
    input {
      padding: 4px 6px;
      font-size: 1.1rem;
    }
  }

  .filters-status {
    display: flex;
    flex-direction: column;
    gap: 4px;
    div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  .filters-priority {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
</style>
