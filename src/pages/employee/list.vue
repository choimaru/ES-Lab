<script setup lang="ts">
const router = useRouter();

const { fetchEmployeeList } = useEmployee();
const employeeList = await fetchEmployeeList();
</script>

<template>
  <div>
    <H1Title>社員一覧</H1Title>
    <ButtonAddEmployee @on-add="router.push('/employee/create')" />
    <table class="g_list">
      <tbody>
        <tr>
          <th>社員コード</th>
          <th>社員名</th>
          <th>ふりがな</th>
          <th>メールアドレス</th>
          <th>所属組織</th>
          <th>役職</th>
          <th>権限</th>
          <th>雇用形態</th>
          <th>在職区分</th>
          <th>ログイン日時</th>
          <th>ロック日時</th>
        </tr>
        <tr v-for="employee in employeeList" :key="employee.employee_cd">
          <td>
            <NuxtLink :to="`/employee/${employee.employee_cd}`">{{ employee.employee_cd }}</NuxtLink>
          </td>
          <td>{{ employee.employee_name }}</td>
          <td>{{ employee.kana }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department_cd }}</td>
          <td>{{ employee.post }}</td>
          <td>{{ employee.authority }}</td>
          <td>{{ employee.employment_status }}</td>
          <td>{{ employee.incumbency_status }}</td>
          <td>{{ employee.login_at }}</td>
          <td>{{ employee.locked_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
