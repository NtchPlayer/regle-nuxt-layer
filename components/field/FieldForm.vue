<template>
  <div :class="['form-field-container', { disabled: disabled, danger: error }]">
    <LazyUILabel v-if="label" :for="id">{{
      `${label}${label && required ? ' *' : ''}`
    }}</LazyUILabel>
    <slot :id />
    <slot name="extra" />
    <LazyUIHelper v-if="error || helper" v-bind="{ error, helper }" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: false,
    default: undefined,
  },
  error: {
    type: [Boolean, String],
    required: false,
    default: false,
  },
  helper: {
    type: String,
    required: false,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const id = useId();
</script>

<style lang="scss">
.form-field-container {
  display: grid;
  gap: var(--text-spacing-2);
  position: relative;
  width: 100%;
}
</style>
