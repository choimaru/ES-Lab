<script setup lang="ts">
import type { BaseProps } from './IconSvgBase.vue';

const props = defineProps<BaseProps>();
</script>

<template>
  <IconSvgBase :variant="props.variant">
    <g>
      <polygon
        points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 289.878,367.055 512,144.945"
      ></polygon>
    </g>
  </IconSvgBase>
</template>
