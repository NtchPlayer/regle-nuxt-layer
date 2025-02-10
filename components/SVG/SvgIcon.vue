<template>
  <SvgUse :href="`icons/${icon}`" aria-hidden="true" class="svg-icon">
    <slot />
  </SvgUse>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss">
.svg-icon {
  width: 1.125em;
  height: 1.125em;
  fill: currentColor;
}
</style>
