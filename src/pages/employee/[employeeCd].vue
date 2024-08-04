<script setup lang="ts">
import FormEmployee from './components/FormEmployee.vue';

const route = useRoute();
const { employeeCd } = route.params as { employeeCd: string };

const { fetchDetail } = useEmployee();

const detail = await fetchDetail(employeeCd);

export type Detail = typeof detail;
</script>

<template>
  <FormEmployee :isCreate="false" title="社員詳細" :detail="detail" />
</template>
