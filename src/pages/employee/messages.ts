export type Message = {
  required: {
    employeeCd: string;
    employeeName: string;
    kana: string;
    email: string;
    password: string;
  };
};

export const messages: Message = {
  required: {
    employeeCd: '社員コードを入力してください。',
    employeeName: '社員名を入力してください。',
    kana: 'ふりがなを入力してください。',
    email: 'メールアドレスを入力してください。',
    password: 'パスワードを入力してください。',
  },
};
