<script setup lang="ts">
type EmployeeList = {
  employee_cd: string;
  employee_name: string;
  kana: string;
  email: string;
  department_cd: string;
  post: string;
  authority: number;
  employment_status: number;
  incumbency_status: number;
  login_at: null | string;
  locked_at: null | string;
};

const { data: employeeList } = await useFetch<EmployeeList[]>('/api/employee');
</script>

<template>
  <div>
    <H1Title>社員一覧</H1Title>
    <div class="link_create">
      <NuxtLink to="/employee/create">
        <span class="link_item">
          <IconNewCreate color="#2929ff" />
          社員の追加
        </span>
      </NuxtLink>
    </div>
    <table class="list">
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

<style lang="scss" scoped>
.link_create {
  display: flex;
}

.link_item {
  display: flex;
  gap: 2px;
  margin-bottom: 8px;
}

.list {
  background-color: #fff;

  tr {
    &:hover {
      background-color: #fadede;
    }
  }

  th {
    font-weight: bold;
    background-color: #eee;
  }

  td,
  th {
    padding: 8px;
    border: 1px solid #aaa;
  }
}
</style>
