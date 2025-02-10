<template>
  <component
    :is="component"
    :class="[
      'button',
      `variant-${variant}`,
      `color-${color}`,
      size,
      { 'full-width': fullWidth, loading: loading },
    ]"
    :to="to ? to : href ? href : null"
    :type="to || href ? null : type"
    :aria-disabled="disabled"
    :disabled="loading || disabled"
    :target="href ? '_blank' : null"
    :rel="href ? 'noopener noreferrer' : null"
  >
    <SvgIcon
      v-if="iconStart || loading"
      :class="['button-icon', { loading: loading }]"
      :icon="loading ? 'loader' : iconStart"
    />
    <span class="button-text">
      <slot />
    </span>
    <SvgIcon v-if="iconEnd" class="button-icon" :icon="iconEnd" />
  </component>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    required: false,
    default: 'primary',
    validator: (value) =>
      ['primary', 'secondary', 'tertiary', 'action', 'tiptap'].includes(value),
  },
  color: {
    type: String,
    required: false,
    default: 'primary',
    validator: (value) =>
      [
        'primary',
        'secondary',
        'neutral',
        'danger',
        'success',
        'warning',
      ].includes(value),
  },
  size: {
    type: String,
    required: false,
    default: undefined,
    validator: (value) => ['big'].includes(value),
  },
  fullWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
  iconStart: {
    type: String,
    required: false,
    default: undefined,
  },
  iconEnd: {
    type: String,
    required: false,
    default: undefined,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: 'button',
  },
  to: {
    type: [Object, String],
    required: false,
    default: undefined,
  },
  href: {
    type: String,
    required: false,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const component = computed(() => {
  return props.disabled && (props.to || props.href)
    ? 'span'
    : props.to || props.href
    ? resolveComponent('NuxtLink')
    : 'button';
});
</script>

<style lang="scss">
.button {
  flex-shrink: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  column-gap: var(--spacing-3);
  vertical-align: top;
  position: relative;
  border: 1px solid transparent;
  border-radius: var(--border-radius-2);
  padding: var(--spacing-5) var(--spacing-8);
  font-weight: var(--font-weight-semi-bold);
  transition-property: background-color, color;
  transition-duration: var(--transition-duration-1);

  &:focus-visible {
    outline: var(--focus-outline);
  }

  &:disabled,
  &[aria-disabled='true'] {
    opacity: var(--disabled-opacity);
    cursor: not-allowed;
  }

  &.loading {
    cursor: wait;
  }

  &.full-width {
    width: 100%;
  }

  &.big {
    display: grid;
    align-content: center;
    gap: var(--spacing-5);
    padding: var(--spacing-12) 0;
    text-align: center;
  }
}

.button.variant-primary {
  @each $color in $colors {
    &.color-#{$color} {
      --button-background-color: var(--#{$color}-color-4);
      --button-background-color-hover: var(--#{$color}-color-5);
      --button-background-color-active: var(--#{$color}-color-6);
    }
  }

  &.color-secondary {
    color: var(--primary-color-4);
  }

  background-color: var(--button-background-color);
  color: var(--neutral-color-1);

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: var(--button-background-color-hover);
    }
  }

  &:active:not(:disabled) {
    background-color: var(--button-background-color-active);
  }
}

.button.variant-secondary {
  @each $color in $colors {
    &.color-#{$color} {
      --button-background-color: var(--#{$color}-color-1);
      --button-background-color-hover: var(--#{$color}-color-2);
      --button-text-color: var(--#{$color}-color-4);
      --button-text-color-hover: var(--#{$color}-color-5);
      --button-text-color-active: var(--#{$color}-color-6);
    }
  }

  &.color-neutral {
    --button-background-color-hover: var(--primary-color-2);
    --button-text-color: var(--primary-color-4);
    --button-text-color-hover: var(--primary-color-5);
    --button-text-color-active: var(--primary-color-6);
  }

  border-color: var(--neutral-color-3);
  background-color: var(--button-background-color);
  color: var(--button-text-color);

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: var(--button-background-color-hover);
      color: var(--button-text-color-hover);
    }
  }

  &:active:not(:disabled) {
    background-color: var(--button-background-color);
    color: var(--button-text-color-active);
  }
}

.button.variant-tertiary {
  @each $color in $colors {
    &.color-#{$color} {
      --button-color: var(--#{$color}-color-4);
      --button-color-hover: var(--#{$color}-color-5);
      --button-color-active: var(--#{$color}-color-6);
    }
  }

  color: var(--button-color);

  @media (hover: hover) {
    &:hover:not(:disabled) {
      color: var(--button-color-hover);
    }
  }

  &:active:not(:disabled) {
    color: var(--button-color-active);
  }
}

.button.variant-action {
  padding: var(--spacing-4);

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: var(--primary-color-1);
      color: var(--primary-color-4);
    }
  }

  &:active:not(:disabled) {
    background-color: var(--primary-color-2);
    color: var(--primary-color-5);
  }
}

.button.variant-tiptap {
  border-radius: var(--border-radius-2);
  padding: var(--spacing-2);
  color: var(--primary-color-4);
  transition-property: background-color, color;
  transition-duration: var(--transition-duration-1);

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: var(--primary-color-2);
      color: var(--primary-color-5);
    }
  }

  &:active:not(:disabled) {
    background-color: var(--primary-color-3);
    color: var(--primary-color-6);
  }

  &[aria-selected='true'] {
    background-color: var(--primary-color-2);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px var(--primary-color-2);
  }

  &:disabled {
    cursor: not-allowed;
  }
}

.button-icon {
  flex-shrink: 0;

  &.loading {
    animation: spin 1s linear infinite;
  }

  .big & {
    margin: 0 auto;
    font-size: 2.5rem;
  }
}
</style>
