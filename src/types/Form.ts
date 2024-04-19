export interface SignUpFormValues {
  userType: 'organizer' | 'buyer';
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  phone: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}
