<template>
  <Component :is="tag" class="label" v-bind="$attrs">
    <slot />
  </Component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    required: false,
    default: 'label',
    validator: (value) => ['label', 'legend', 'p'].includes(value),
  },
});
</script>

<style lang="scss">
.label {
  font-size: 0.875em;
  font-weight: var(--font-weight-semi-bold);
  color: var(--neutral-color-7);

  .disabled &,
  [aria-disabled='true'] & {
    opacity: var(--disabled-opacity);
    cursor: not-allowed;
  }
}
</style>
