<script setup lang="ts">
const employeeList = [
  { id: 'U001', name: 'U001：一般社員', authority: 0 },
  { id: 'U004', name: 'U004：人事社員', authority: 3 },
  { id: 'U999', name: 'U999：管理者', authority: 99 },
];

const employeeCd = ref('U001');

const onLogin = () => {
  const loginEmployee = employeeList.find((employee) => employee.id === employeeCd.value);
  const loginInfo = useLoginInfo();

  if (loginEmployee) {
    loginInfo.value.employeeCd = loginEmployee.id;
    loginInfo.value.employeeName = loginEmployee.name;
    loginInfo.value.authority = loginEmployee.authority;
  }

  navigateTo('/');
};
</script>

<template>
  <form>
    <RadioList :list="employeeList" id-prefix="employee_" v-model:pickedId="employeeCd" />
    <br />
    <ButtonLogin size="s" @on-login="onLogin" />
  </form>
</template>
