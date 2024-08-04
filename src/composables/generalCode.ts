export const useGeneralCode = () => {
  const FILE_NAME = 'generalCode.ts';

  const fetchCategory = async (category: string) => {
    const { data, error } = await useFetch(`/api/general-code/${category}`);
    if (error.value) {
      console.log(error.value.data.message);
      console.log(`[FetchError][File]${FILE_NAME} [Method]fetchCategory`);
    }
    return data.value || [];
  };

  return {
    fetchCategory,
  };
};

export default useGeneralCode;
