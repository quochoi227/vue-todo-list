import { watch, ref } from 'vue'

// Usage
// const { searchValue, status, priority } = useSyncModel(props, emit, [
//   'searchValue',
//   'status',
//   'priority'
// ])

export function useSyncModel(props, emit, keys) {
  const state = {}

  keys.forEach((key) => {
    const localRef = ref(props[key])
    state[key] = localRef

    watch(() => props[key], (val) => {
      localRef.value = val
    })

    watch(localRef, (val) => {
      emit(`update:${key}`, val)
    })
  })

  return state
}
