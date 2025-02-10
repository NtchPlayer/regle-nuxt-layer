<template>
  <svg aria-hidden="true">
    <use :href="`#${href}`" />
  </svg>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
});
</script>
