<script setup lang="ts">
import IconTrash from '../icon/IconTrash.vue';
import type { BaseProps } from './ButtonBase.vue';

type Emit = {
  'on-delete': [];
};

const props = defineProps<BaseProps>();
const emit = defineEmits<Emit>();
</script>

<template>
  <ButtonBase
    :variant="props.variant"
    :size="props.size"
    :disabled="props.disabled"
    @on-click="emit('on-delete')"
  >
    <IconTrash :variant="props.variant" />
    削除
  </ButtonBase>
</template>
