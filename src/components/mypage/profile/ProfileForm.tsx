import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form } from '@components/ui/form';
import { Button } from '@components/ui/button';
import ProfileUserTypeInput from '@components/mypage/profile/input/ProfileUserTypeInput';
import ProfileNicknameInput from '@components/mypage/profile/input/ProfileNicknameInput';
import ProfilePhoneInput from '@components/mypage/profile/input/ProfilePhoneInput';
import ProfileEmailInput from '@components/mypage/profile/input/ProfileEmailInput';
import ProfilePasswordInput from '@components/mypage/profile/input/ProfilePasswordInput';
import ProfileImageInput from '@components/mypage/profile/input/ProfileImageInput';

import { ProfileFormValues } from '@/types/form';
import useUser from '@hooks/useUser';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { useUserStore } from '@store/useUserStore';
import { updateProfile } from '@services/userService';

function ProfileForm() {
  const user = useUser();
  const { setUser } = useUserStore();
  const { openAlert } = useGlobalAlertStore();
  const [imagePreview, setImagePreview] = useState<string>(
    user?.profileImage as string,
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      profileImage: user?.profileImage,
      nickname: user?.nickname as string,
      phone: user?.phone,
    },
  });

  const onSubmit = useCallback(
    (values: ProfileFormValues) => {
      updateProfile(user?.uid as string, values)
        .then(result => {
          if (result.success) {
            openAlert('프로필이 수정되었습니다.', '');
            setUser(result.user!);
          } else {
            openAlert('오류가 발생했습니다.', result.error as string);
          }
        })
        .catch(error => {
          openAlert('오류가 발생했습니다.', error);
        });
    },
    [user?.uid, setUser, openAlert],
  );

  return (
    <div className='mx-auto w-[440px] mobile:w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 tablet:space-y-6 mobile:space-y-3'
        >
          <ProfileUserTypeInput userType={user?.userType as string} />
          <ProfileImageInput
            nickname={user?.nickname as string}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            form={form}
          />
          <ProfileEmailInput
            loginType={user?.loginType as string}
            email={user?.email}
          />
          <ProfileNicknameInput form={form} />
          <ProfilePhoneInput form={form} />
          {user?.loginType === 'email' && <ProfilePasswordInput user={user} />}

          <div className='flex w-full justify-center'>
            <Button type='submit' className='mt-8'>
              수정하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ProfileForm;

const formSchema = z.object({
  profileImage: z
    .union([z.instanceof(Blob), z.string()])
    .refine(val => val !== '', {
      message: '프로필 사진을 설정해 주세요.',
    }),
  nickname: z.string().min(1, '닉네임을 입력해 주세요.'),
  phone: z
    .string()
    .min(1, '전화번호를 입력해 주세요.')
    .regex(/^\d+$/, '전화번호는 숫자만 포함해야 합니다.')
    .min(10, '전화번호는 최소 10자 이상이어야 합니다.'),
});
