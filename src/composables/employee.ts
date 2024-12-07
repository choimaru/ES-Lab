import type { Detail } from '~/pages/employee/[employeeCd].vue';

export const useEmployee = () => {
  const FILE_NAME = 'employee.ts';

  async function fetchList() {
    const { data, error } = await useFetch('/api/employee');
    if (error.value) {
      console.log(error.value.data.message);
      console.log(`[FetchError][File]${FILE_NAME} [Method]fetchList`);
    }
    return data.value || [];
  }

  async function fetchDetail(employeeCd: string) {
    const { data, error } = await useFetch(`/api/employee/${employeeCd}`);
    if (error.value) {
      console.log(error.value.data.message);
      console.log(`[FetchError][File]${FILE_NAME} [Method]fetchDetail`);
    }
    return data.value && data.value.length > 0 ? data.value[0] : defaultEmployee;
  }

  async function register(detail: Detail) {
    const response = await $fetch(`/api/employee`, {
      method: 'POST',
      body: detail,
    });
  }

  async function del(employeeCd: string) {
    const response = await $fetch(`/api/employee`, {
      method: 'DELETE',
      body: { employeeCd },
    });
  }

  return {
    fetchList,
    fetchDetail,
    register,
    del,
  };
};

export const defaultEmployee = {
  employeeCd: '',
  employeeName: '',
  kana: '',
  email: '',
  password: '',
  tel: null,
  departmentCd: null,
  post: null,
  authority: null,
  employmentStatus: '0',
  incumbencyStatus: '0',
  loginAt: '',
  failureCount: 0,
  lockedAt: '',
  createdEmployeeCd: '',
  createdEmployeeName: '',
  createdAt: '',
  updatedEmployeeCd: '',
  updatedEmployeeName: '',
  updatedAt: '',
  gender: 0,
  birthday: '',
  zipCode: '',
  prefecture: '',
  address: '',
  building: '',
  emailPersonal: '',
  telPersonal: '',
  emergencyTel: '',
  entryDate: '',
  retirementDate: '',
  retirementStatus: null,
};
