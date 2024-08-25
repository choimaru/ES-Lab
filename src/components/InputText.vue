<script setup lang="ts">
type Props = {
  type?: 'text' | 'password' | 'date' | 'datetime-local' | 'number' | 'tel';
  name?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  isError?: boolean;
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
    :name="props.name"
    class="base"
    :class="[{ g_disabled: props.disabled }, { error: props.isError }, props.size]"
    v-model="model"
    :disabled="props.disabled"
    @blur="emit('on-blur')"
  />
</template>

<style lang="scss" scoped>
.base {
  height: 32px;
  padding-left: 4px;
  border: 1px solid #ced4da;

  &:focus {
    border: 1px solid var(--primary);
    outline: none;
  }
}

input[type='number'] {
  padding-right: 4px;
  text-align: right;
}

.error {
  border: 2px solid var(--error);
  outline: none;
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
