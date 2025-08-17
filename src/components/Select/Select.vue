<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'

const props = defineProps(['modelValue', 'options', 'position', 'disableArrow', 'approveReset'])
const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)
const selectedOption = ref(props.modelValue)

const selectRef = useTemplateRef('select-ref')

watch(() => props.modelValue, (newVal) => {
  if (newVal !== selectedOption.value) {
    selectedOption.value = newVal
  }
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const useClickOutSide = (refEl, callback) => {
  const handler = (event) => {
    if (refEl.value && !refEl.value.contains(event.target)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

useClickOutSide(selectRef, () => {
  isOpen.value = false
})

const handleSelect = (option) => {
  emit('update:modelValue', option)
}

</script>

<template>
  <div ref="select-ref" class="select-wrapper" @click="toggleOpen">
    <div class="option-selected">
      <slot name="option" :option="selectedOption">
        {{ selectedOption?.name || 'Select' }}
      </slot>
      <i v-if="!disableArrow" class="pi pi-angle-down"></i>
    </div>
    <transition name="fade">
      <div v-show="isOpen" class="select-options" :class="{ [position]: position }">
        <ul>
          <li v-if="approveReset" @click="handleSelect(null)" class="select-option" style="text-align: center;">No priority filter</li>
          <li @click="handleSelect(item)" class="select-option" :class="{ 'selected': item.name === selectedOption?.name }" v-for="item in options" :key="item.code">
            <slot name="option" :option="item">
              {{ item.name }}
            </slot>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.select-wrapper {
  border: 1px solid #213547;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  user-select: none;
}

.option-selected {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
}

.select-options {
  position: absolute;
  min-width: 100%;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 4px;
  border-radius: 6px;
  left: 50%;
  transform: translateX(-50%);
}

.select-options.top {
  bottom: calc(100% + 2px);
  transform-origin: center bottom;
}

.select-options.bottom {
  top: calc(100% + 2px);
  transform-origin: center top;
}

.select-options > ul {
  list-style: none;
}

.select-option {
  font-size: 0.9rem;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: #eaeaeaaa;
  }
}

.select-option.selected {
  background-color: #213547;
  color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) scaleY(0.8);
}

.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateX(-50%) scaleY(1);
}
</style>
