<script setup lang="ts">
export type BaseProps = {
  width?: number;
  height?: number;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

const props = withDefaults(defineProps<BaseProps>(), {
  width: 16,
  height: 16,
  variant: 'primary',
});

const fillColor =
  props.variant === 'tertiary'
    ? 'var(--link)'
    : props.variant === 'primary'
      ? '#fff'
      : 'var(--primary)';
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.width"
    :height="props.height"
    viewBox="0 0 512 512"
    role="presentation"
  >
    <slot />
  </svg>
</template>

<style scoped>
svg {
  fill: v-bind(fillColor);
}
</style>
