<script setup lang="ts">
type Props = {
  required?: boolean;
};

const props = defineProps<Props>();
</script>

<template>
  <label class="label">
    <span><slot /></span>
    <span class="required" v-if="required">必須</span>
  </label>
</template>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
}

.required {
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  color: #ff5b5b;
  border: 1px solid #ff5b5b;
  border-radius: 6px;
}
</style>
