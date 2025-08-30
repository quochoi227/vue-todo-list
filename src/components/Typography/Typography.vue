<template>
  <component
    :is="variant"
    :style="customStyle"
    v-bind="attrs"
    class="typography"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { useAttrs } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'span',
    validator: value =>
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label', 'div'].includes(value),
  },
  style: {
    type: [Object, String],
    default: () => ({}),
  },
  color: {
    type: String,
    default: '',
  },
  align: {
    type: String,
    default: '',
    validator: value => ['', 'left', 'center', 'right', 'justify'].includes(value),
  },
  weight: {
    type: [String, Number],
    default: '',
  },
});

const attrs = useAttrs();

const customStyle = computed(() => ({
  ...typeof props.style === 'string' ? {} : props.style,
  color: props.color || undefined,
  textAlign: props.align || undefined,
  fontWeight: props.weight || undefined,
}));
</script>
