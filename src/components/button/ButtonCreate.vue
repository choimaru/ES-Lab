<script setup lang="ts">
import type { BaseProps } from './ButtonBase.vue';

type Emit = {
  'on-create': [];
};

const props = defineProps<BaseProps>();
const emit = defineEmits<Emit>();
</script>

<template>
  <ButtonBase variant="primary" :size="props.size" :disabled="props.disabled" @on-click="emit('on-create')">
    <IconCreate variant="primary" />
    登録
  </ButtonBase>
</template>
