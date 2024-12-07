export type LoginInfo = {
  employeeCd: string;
  employeeName: string;
  email: string;
  authority: number;
};

export const useLoginInfo = () => {
  return useState<LoginInfo>('loginInfo', () => {
    return {
      employeeCd: 'U999',
      employeeName: 'yamada',
      email: 'nuxt-developer@mamezou.com',
      authority: 99,
    };
  });
};
