export const useEmployee = () => {
  const FILE_NAME = 'employee.ts';

  const fetchList = async () => {
    const { data, error } = await useFetch('/api/employee');
    if (error.value) {
      console.log(error.value.data.message);
      console.log(`[FetchError][File]${FILE_NAME} [Method]fetchList`);
    }
    return data.value || [];
  };

  const fetchDetail = async (employeeCd: string) => {
    const { data, error } = await useFetch(`/api/employee/${employeeCd}`);
    if (error.value) {
      console.log(error.value.data.message);
      console.log(`[FetchError][File]${FILE_NAME} [Method]fetchDetail`);
    }
    return data.value && data.value.length > 0 ? data.value[0] : defaultEmployee;
  };

  return {
    fetchList,
    fetchDetail,
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
  createdEmployee: '',
  createdAt: '',
  updatedEmployee: '',
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