export const useEmployee = () => {
  const fetchEmployeeList = async () => {
    const { data } = await useFetch('/api/employee');
    return data.value || [];
  };

  const fetchEmployeeDetail = async (employeeCd: string) => {
    const { data } = await useFetch(`/api/employee/${employeeCd}`);
    return data.value || [];
  };

  const fetchGeneralCode = async (category: string) => {
    const { data } = await useFetch(`/api/general-code/${category}`);
    return data.value || [];
  };

  return {
    fetchEmployeeList,
    fetchEmployeeDetail,
    fetchGeneralCode,
  };
};

export default useEmployee;
