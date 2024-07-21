<script setup lang="ts">
type Props = {
  type?: 'text' | 'password' | 'date' | 'datetime-local' | 'number';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  disabled?: boolean;
};

type Emit = {
  'on-blur': [];
};

const props = withDefaults(defineProps<Props>(), { type: 'text' });
const emit = defineEmits<Emit>();
const model = defineModel();
</script>

<template>
  <input
    :type="props.type"
    :class="[{ g_disabled: props.disabled }, props.size]"
    v-model="model"
    :disabled="props.disabled"
    @blur="emit('on-blur')"
  />
</template>

<style lang="scss" scoped>
input[type='number'] {
  padding-right: 2px;
  text-align: right;
}

input[type='text'],
input[type='date'],
input[type='datetime-local'],
input[type='number'],
input[type='password'] {
  height: 32px;
  padding-left: 4px;
  border: 1px solid #ced4da;

  &:focus {
    border: 1px solid var(--primary);
    outline: none;
  }
}

.xs {
  width: 48px;
}

.s {
  width: 90px;
}

.m {
  width: 140px;
}

.l {
  width: 190px;
}

.xl {
  width: 240px;
}
</style>
