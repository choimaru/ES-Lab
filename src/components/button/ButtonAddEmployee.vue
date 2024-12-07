<script setup lang="ts">
import IconNewCreate from '../icon/IconNewCreate.vue';
import type { BaseProps } from './ButtonBase.vue';

type Emit = {
  'on-add': [];
};

const props = defineProps<BaseProps>();
const emit = defineEmits<Emit>();
</script>

<template>
  <ButtonBase variant="tertiary" :size="props.size" :disabled="props.disabled" @on-click="emit('on-add')">
    <IconNewCreate variant="tertiary" />
    社員の追加
  </ButtonBase>
</template>
