<script setup lang="ts">
type Props = {
  list: { id: string; name: string }[];
  idPrefix?: string;
  disabled?: boolean;
};

const props = defineProps<Props>();
const pickedId = defineModel('pickedId');
</script>

<template>
  <div class="box_radio">
    <span v-for="item in props.list">
      <input
        type="radio"
        :id="props.idPrefix + item.id"
        :name="props.idPrefix + 'radio'"
        :value="item.id"
        v-model="pickedId"
        :disabled="props.disabled"
      />
      <label :for="props.idPrefix + item.id" :class="{ g_disabled: props.disabled }">{{ item.name }}</label>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.box_radio {
  display: flex;
  gap: 24px;
}

label {
  position: relative;
  padding-left: 20px;
}

input[type='radio'] + label::before {
  position: absolute;
  top: 2px;
  left: 0;
  display: block;
  width: 16px;
  height: 16px;
  content: '';
  background: #fff;
  border: 1px solid var(--primary);
  border-radius: 50%;
}

input[type='radio'] + label::after {
  position: absolute;
  top: 6px;
  left: 4px;
  display: block;
  width: 8px;
  height: 8px;
  content: '';
  background: var(--primary);
  border-radius: 50%;
  opacity: 0;
  transition: 0.3s;
}

input[type='radio']:checked + label::after {
  opacity: 1;
}

.g_disabled {
  cursor: default;
  background-color: #fff;
}

input[type='radio']:checked + label {
  color: #000;
}
</style>
