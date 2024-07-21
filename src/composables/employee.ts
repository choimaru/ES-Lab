export type EmployeeList = {
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

export type GeneralCode = {
  code: string;
  name: string;
};

export const useEmployee = () => {
  const fetchEmployeeList = async () => {
    const { data } = await useFetch<EmployeeList[]>('/api/employee');
    return data.value || [];
  };

  const fetchGeneralCode = async (category: string) => {
    const { data } = await useFetch<GeneralCode[]>('/api/general-code/' + category);
    return data.value || [];
  };

  const initialCreateData = async () => {
    const [postList, authorityList, employmentStatusList, incumbencyStatusList, retirementStatusList] =
      await Promise.all([
        fetchGeneralCode('post'),
        fetchGeneralCode('authority'),
        fetchGeneralCode('employment_status'),
        fetchGeneralCode('incumbency_status'),
        fetchGeneralCode('retirement_status'),
      ]);

    return {
      postList,
      authorityList,
      employmentStatusList,
      incumbencyStatusList,
      retirementStatusList,
    };
  };

  return {
    fetchEmployeeList,
    initialCreateData,
  };
};

export default useEmployee;
