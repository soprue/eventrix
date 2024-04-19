export interface SignUpFormValues {
  userType: 'organizer' | 'buyer';
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  phone: string;
}
