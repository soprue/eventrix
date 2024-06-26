import { Category } from '@constants/categories';

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

export interface EventFormValues {
  uid?: string;
  organizerUID?: string;
  thumbnail: File | string | null;
  smallThumbnail: File | string | null;
  name: string;
  startDate: Date | null;
  startTime: string;
  endDate: Date | null;
  endTime: string;
  category: Category;
  location: string;
  registrationStartDate: Date | null;
  registrationStartTime: string;
  registrationEndDate: Date | null;
  registrationEndTime: string;
  description: string;
  tickets: TicketValues[];
}

export interface TicketValues {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentFormValues {
  deliveryMethod: '현장 수령' | '배송';
  deliveryAddress: string;
  deliveryDetailAddress: string;
  deliveryMessage: string;
}

export interface ProfileFormValues {
  profileImage: File | string;
  nickname: string;
  phone: string;
}
