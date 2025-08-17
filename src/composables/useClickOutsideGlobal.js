// composables/useClickOutsideGlobal.js
import { onMounted, onUnmounted } from 'vue'

const listeners = new Map()

const globalHandler = (event) => {
  listeners.forEach((callback, refEl) => {
    if (refEl.value && !refEl.value.contains(event.target)) {
      callback()
    }
  })
}

export function useClickOutsideGlobal(refEl, callback) {
  onMounted(() => {
    listeners.set(refEl, callback)
    if (listeners.size === 1) {
      document.addEventListener('click', globalHandler)
    }
  })

  onUnmounted(() => {
    listeners.delete(refEl)
    if (listeners.size === 0) {
      document.removeEventListener('click', globalHandler)
    }
  })
}
