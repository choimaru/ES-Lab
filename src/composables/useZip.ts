export const useZip = () => {
  type Info = {
    results: [{ address1: string; address2: string; address3: string }];
  };

  const search = async (zip: string | null): Promise<Info | null> => {
    const postcode = zip?.replace(/[^0-9]/g, '');

    if (!postcode || postcode.length < 7) return null;

    const data = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postcode}`);
    const info = data.json();

    return info;
  };

  return {
    search,
  };
};
