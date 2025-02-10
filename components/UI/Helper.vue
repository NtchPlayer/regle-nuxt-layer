<template>
  <div
    :class="[
      'helper-container',
      { warning: warning, danger: error, success: success },
    ]"
  >
    <p class="helper">
      <template v-if="error || success || warning || helper">
        <SvgIcon
          class="helper-icon"
          :icon="
            error
              ? 'cross-circle'
              : warning
              ? 'warning'
              : success
              ? 'check-circle'
              : 'information-circle'
          "
        />
        <span>{{ error || success || warning || helper }}</span>
      </template>
    </p>
    <p v-if="limit" class="helper-character-counter">
      {{ `${text.length}/${limit}` }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  success: {
    type: String,
    required: false,
    default: undefined,
  },
  error: {
    type: [Boolean, String],
    required: false,
    default: false,
  },
  warning: {
    type: String,
    required: false,
    default: undefined,
  },
  helper: {
    type: String,
    required: false,
    default: undefined,
  },
  limit: {
    type: Number,
    required: false,
    default: undefined,
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style lang="scss">
.helper-container {
  display: flex;
  justify-content: space-between;
  column-gap: 0.375em;
  font-size: 0.875rem;
  color: var(--neutral-color-6);
  white-space: pre-wrap;

  .disabled & {
    opacity: var(--disabled-opacity);
    cursor: not-allowed;
  }

  @each $color in $colors {
    &.#{$color} {
      color: var(--#{$color}-color-4);
    }
  }
}

.helper {
  display: flex;
  column-gap: 0.375em;
}

.helper-icon {
  flex-shrink: 0;
  position: relative;
  top: 0.0625em;
}

.helper-character-counter {
  font-feature-settings: 'lnum', 'tnum';
  font-variant-numeric: lining-nums tabular-nums;
}
</style>
