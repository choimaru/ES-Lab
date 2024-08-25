export type Message = {
  required: (fieldName: string) => string;
  format: (fieldName: string) => {
    email: string;
    tel: string;
    zipCode: string;
  };
};

export const messages: Message = {
  required: (fieldName: string) => `${fieldName}を入力してください。`,
  format: (fieldName: string) => ({
    email: `${fieldName}には、有効なメールアドレスを入力してください。（例：example@example.com）`,
    tel: `${fieldName}には、半角数字とハイフンのみで入力してください。`,
    zipCode: `${fieldName}には、正しい形式で入力してください。（例：123-4567 または1234567）`,
  }),
};
