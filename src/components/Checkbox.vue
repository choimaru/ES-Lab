<script setup lang="ts">
type Props = {
  id?: string;
  disabled?: boolean;
};

type Emit = {
  'on-change': [];
};

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const model = defineModel();
</script>

<template>
  <div class="appearance">
    <input
      type="checkbox"
      :id="props.id"
      class="base"
      :class="[{ g_disabled: props.disabled }]"
      v-model="model"
      :disabled="props.disabled"
      @change="emit('on-change')"
    />
  </div>
</template>

<style lang="scss" scoped>
.appearance {
  display: flex;
  align-items: center;
}

.base {
  width: 20px;
  height: 20px;
  appearance: none;
  cursor: pointer;
  border: 1px solid #ced4da;
}

.base:checked {
  background-color: var(--primary);
  border: 1px solid #ced4da;
}

.base:checked::before {
  position: relative;
  top: 2px;
  left: 6px;
  display: block;
  width: 6px;
  height: 10px;
  content: '';
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.base:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
</style>
