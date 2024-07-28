<script setup lang="ts">
const router = useRouter();

const { fetchEmployeeList } = useEmployee();
const employeeList = await fetchEmployeeList();
const { sort, sortTableData } = useSortTable(employeeList, 'employeeCd');
</script>

<template>
  <div>
    <H1Title>社員一覧</H1Title>
    <ButtonAddEmployee @on-add="router.push('/employee/create')" />
    <table class="g_list">
      <tbody>
        <tr>
          <th id="employeeCd" class="sort_indicator asc" @click="sort('employeeCd')">社員コード</th>
          <th>社員名</th>
          <th id="kana" class="sort_indicator" @click="sort('kana')">ふりがな</th>
          <th>メールアドレス</th>
          <th id="departmentCd" class="sort_indicator" @click="sort('departmentCd')">所属組織</th>
          <th>役職</th>
          <th>権限</th>
          <th>雇用形態</th>
          <th>在職区分</th>
          <th id="loginAt" class="sort_indicator" @click="sort('loginAt')">ログイン日時</th>
          <th>ロック日時</th>
        </tr>
        <tr v-for="employee in sortTableData" :key="employee.employeeCd">
          <td>
            <NuxtLink :to="`/employee/${employee.employeeCd}`">{{ employee.employeeCd }}</NuxtLink>
          </td>
          <td>{{ employee.employeeName }}</td>
          <td>{{ employee.kana }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.departmentCd }}</td>
          <td>{{ employee.post }}</td>
          <td>{{ employee.authority }}</td>
          <td>{{ employee.employmentStatus }}</td>
          <td>{{ employee.incumbencyStatus }}</td>
          <td>{{ employee.loginAt }}</td>
          <td>{{ employee.lockedAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
