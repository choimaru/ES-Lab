<script setup lang="ts">
import type { BaseProps } from './ButtonBase.vue';

type Emit = {
  'on-clear': [];
};

const props = defineProps<BaseProps>();
const emit = defineEmits<Emit>();
</script>

<template>
  <ButtonBase
    variant="secondary"
    :size="props.size"
    :disabled="props.disabled"
    @on-click="emit('on-clear')"
  >
    <IconClear variant="secondary" />
    クリア
  </ButtonBase>
</template>
