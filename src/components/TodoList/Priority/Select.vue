<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'

// Nhận giá trị từ v-model
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

// Emit sự kiện cập nhật
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedOption = ref(props.modelValue)
const optionsRef = useTemplateRef('options-ref')

// Đồng bộ khi modelValue thay đổi từ bên ngoài
watch(() => props.modelValue, (newVal) => {
  if (newVal !== selectedOption.value) {
    selectedOption.value = newVal
  }
})

// Toggle dropdown
const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

// Chọn option → chỉ emit, không cập nhật selectedOption trực tiếp
const selectOption = (option) => {
  emit('update:modelValue', option)
  isOpen.value = false
}

const useClickOutSide = (refEl, callback) => {
  const handler = (event) => {
    if (refEl.value && !refEl.value.contains(event.target)) {
      callback()
    }
  }

  onMounted(() => document.addEventListener('click', handler))
  onUnmounted(() => document.addEventListener('click', handler))
}

useClickOutSide(optionsRef, () => {
  isOpen.value = false
})

</script>

<template>
  <div ref="options-ref" class="priority-wrapper" @click="toggleOpen">
    <!-- Hiển thị option đã chọn -->
    <div class="selected">
      <slot name="selected" :selected="selectedOption" />
    </div>

    <!-- Danh sách option -->
    <transition name="fade">
      <div v-show="isOpen" class="options">
        <slot name="options" :select="selectOption" />
      </div>
    </transition>
  </div>
</template>


<style scoped>
  .priority-wrapper {
    position: relative;
    flex: 1;
    border: 1px solid #213547;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  .selected {
    cursor: pointer;
  }

  .options {
    position: absolute;
    bottom: calc(100% + 4px);
    width: 120px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #bababa;
    padding: 6px 0;
    gap: 4px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 -4px 20px 0 rgba(0, 0, 0, 0.2);
    transform-origin: bottom;
  }

  .options > * {
    display: flex;
    justify-content: center;
    padding: 4px 0;
    cursor: pointer;
  }

  .options > *:hover {
    background-color: #f2f2f2;
  }

  /* Transition classes */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translate(-50%) scaleY(0.8);
  }
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
    transform: translate(-50%) scaleY(1);
  }

</style>
