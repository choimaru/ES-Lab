export type LoginInfo = {
  employeeId: string;
  employeeName: string;
  authority: number;
};

export const useLoginInfo = () => {
  return useState<LoginInfo>('loginInfo', () => {
    return {
      employeeId: 'U999',
      employeeName: 'yamada',
      authority: 99,
    };
  });
};

export const useLoginUser = () =>
  useState<{ id: string; name: string; mail: string }>('login-user', () => {
    console.log('retrieving user info...');
    return {
      id: '012345',
      name: 'mamezou',
      mail: 'nuxt-developer@mamezou.com',
    };
  });
