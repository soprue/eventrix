export interface UserType {
  uid: string | null;
  nickname: string | null;
  userType: string | null;
  loginType: string | null;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
  likedEvents?: string[];
  token?: string;
}
