<script setup lang="ts">
export type BaseProps = {
  id?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'xs' | 's' | 'm' | 'l';
  disabled?: boolean;
};

type Emit = {
  'on-click': [];
};

const props = defineProps<BaseProps>();
const emit = defineEmits<Emit>();
</script>

<template>
  <button
    type="button"
    :id="props.id"
    class="base"
    :class="[`${props.variant}`, `size_${props.size}`, { disabled: props.disabled }]"
    :disabled="props.disabled"
    @click="emit('on-click')"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base {
  padding: 3px 16px 0;
  font-size: 14px;
  color: #fff;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
}

.primary {
  color: #fff;
  background-color: var(--primary);
}

.secondary {
  color: var(--primary);
  background-color: #fff;
  border: 1px solid var(--primary);
}

.tertiary {
  height: 36px;
  padding: 0;
  color: var(--primary);
  text-decoration: underline;
}

.size_xs {
  min-width: 72px;
  height: 28px;
}

.size_s {
  min-width: 88px;
  height: 36px;
}

.size_m {
  min-width: 96px;
  height: 48px;
}

.size_l {
  min-width: 136px;
  height: 56px;
}

.disabled {
  color: #dcdcdc;
  background-color: #808080;

  &:hover {
    opacity: unset;
  }
}
</style>
