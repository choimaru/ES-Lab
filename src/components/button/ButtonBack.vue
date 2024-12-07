<script setup lang="ts">
import type { BaseProps } from './ButtonBase.vue';

type Emit = {
  'on-back': [];
};

const props = defineProps<BaseProps>();
const emit = defineEmits<Emit>();
</script>

<template>
  <ButtonBase variant="tertiary" :size="props.size" :disabled="props.disabled" @on-click="emit('on-back')">
    <IconUTurn variant="tertiary" />
    戻る
  </ButtonBase>
</template>
