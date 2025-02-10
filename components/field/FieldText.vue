<template>
  <FieldForm
    v-bind="{
      label,
      helper,
      disabled,
      required,
    }"
    :error="r$.$errors.text[0]"
  >
    <template #default="{ id }">
      <div :class="['text-input-container', { disabled: disabled }]">
        <slot name="prefix" />
        <input
          :id
          v-model.trim="text"
          class="text-input"
          :type
          :disabled
          v-bind="$attrs"
          :autofocus
          @blur="r$.$touch()"
        />
        <slot name="suffix" />
      </div>
    </template>
    <template #extra>
      <slot name="extra" />
    </template>
  </FieldForm>
</template>

<script setup lang="ts">
import { required as requiredRule, email, url, applyIf } from '@regle/rules';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  helper: {
    type: String,
    required: false,
    default: undefined,
  },
  type: {
    type: String,
    required: false,
    default: 'text',
    validator: (value) =>
      ['text', 'email', 'url', 'search', 'password', 'tel'].includes(value),
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
  namespace: {
    type: String,
    required: false,
    default: undefined,
  },
});

const text = defineModel({
  type: [String, Number],
  required: false,
  default: '',
});

const rules = computed(() => ({
  ...(!props.disabled
    ? {
        text: {
          required: requiredRule,
          email: applyIf(() => props.type === 'email', email),
          url: applyIf(() => props.type === 'url', url),
        },
      }
    : undefined),
}));

const { r$ } = useScopedRegle({ text }, rules, { namespace: props.namespace });
</script>

<style lang="scss">
.text-input-container {
  --text-input-background-color: var(--primary-color-1);
  --text-input-border-color: var(--neutral-color-3);
  --text-input-border-color-hover: var(--neutral-color-4);
  --text-input-border-color-focus: var(--neutral-color-5);

  @each $color in $colors {
    .#{$color} & {
      --text-input-background-color: var(--#{$color}-color-1);
      --text-input-border-color: var(--#{$color}-color-3);
      --text-input-border-color-hover: var(--#{$color}-color-4);
      --text-input-border-color-focus: var(--#{$color}-color-5);
    }
  }

  display: inline-flex;
  align-items: center;
  vertical-align: top;
  column-gap: 0.5em;
  border: 1px solid var(--text-input-border-color);
  border-radius: var(--border-radius-2);
  padding: 0 var(--spacing-6);
  width: 100%;
  background-color: var(--text-input-background-color);
  color: var(--neutral-color-7);
  transition-duration: var(--transition-duration-1);
  transition-property: border-color, background-color;

  @media (hover: hover) {
    &:hover:not(.disabled):not(:focus-within),
    .label:hover + &:not(.disabled):not(:focus-within) {
      border-color: var(--text-input-border-color-hover);
    }
  }

  &:focus-within {
    background-color: var(--neutral-color-1);
    border-color: var(--text-input-border-color-focus);
  }

  .label:active + &:not(.disabled):not(:focus-within) {
    border-color: var(--text-input-border-color-focus);
  }

  &.disabled {
    opacity: var(--disabled-opacity);
    cursor: not-allowed;
  }

  > *:not(.text-input) {
    flex-shrink: 0;
  }
}

.text-input {
  padding: var(--spacing-5) 0;
  width: 100%;
  color: var(--neutral-color-900);
  text-overflow: ellipsis;

  &:disabled {
    cursor: not-allowed;
  }

  &:-webkit-autofill {
    box-shadow: inset 0 0 0 2em var(--primary-color-1);
    -webkit-text-fill-color: inherit;
  }

  &:autofill {
    box-shadow: inset 0 0 0 2em var(--primary-color-1);
    -webkit-text-fill-color: inherit;
  }

  &::placeholder {
    color: var(--neutral-color-5);
  }
}
</style>
