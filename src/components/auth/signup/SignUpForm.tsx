import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@components/ui/form';
import { Button } from '@components/ui/button';
import SignUpUserTypeInput from './input/SignUpUserTypeInput';
import SignUpEmailInput from './input/SignUpEmailInput';
import SignUpNicknameInput from './input/SignUpNicknameInput';
import SignUpPasswordInput from './input/SignUpPasswordInput';
import SignUpPasswordConfirmInput from './input/SignUpPasswordConfirmInput';
import SignUpPhoneInput from './input/SignUpPhoneInput';

import { SignUpFormValues } from '@/types/form';
import { signUpWithEmail } from '@services/userService';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';

function SignUpForm() {
  const { openAlert } = useGlobalAlertStore();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      userType: 'buyer',
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      phone: '',
    },
  });

  function onSubmit(values: SignUpFormValues) {
    signUpWithEmail(values)
      .then(result => {
        if (result.success) {
          openAlert(
            '환영합니다!',
            '로그인이 완료되었습니다. 바로 마음에 드는 이벤트를 찾아보세요.',
          );
        } else {
          openAlert('다시 시도해 주세요.', result.error as string);
        }
      })
      .catch(error => {
        openAlert('다시 시도해 주세요.', error);
      });
  }

  return (
    <>
      <p className='mobile:text-2xl mobile:mb-8 mobile:font-semibold mb-12 text-center text-3xl font-bold'>
        회원가입
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='tablet:space-y-6 mobile:space-y-4 space-y-8'
        >
          <SignUpUserTypeInput form={form} />
          <SignUpEmailInput form={form} />
          <SignUpNicknameInput form={form} />
          <SignUpPasswordInput form={form} />
          <SignUpPasswordConfirmInput form={form} />
          <SignUpPhoneInput form={form} />
          <Button
            type='submit'
            className='mobile:font-normal w-full'
            data-cy='signup-button'
          >
            회원가입
          </Button>
        </form>
      </Form>
    </>
  );
}

export default SignUpForm;

const formSchema = z
  .object({
    userType: z.enum(['organizer', 'buyer']),
    email: z.string().email('유효하지 않은 이메일 주소입니다.'),
    nickname: z.string().min(1, '닉네임을 입력해 주세요.'),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .refine(
        val =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            val,
          ) ||
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val) ||
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&]{8,}$/.test(
            val,
          ) ||
          /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/.test(val),
        {
          message:
            '비밀번호는 대문자, 소문자, 숫자, 특수문자 중 3종류를 포함해야 합니다.',
        },
      ),
    passwordConfirm: z.string(),
    phone: z
      .string()
      .regex(/^\d+$/, '전화번호는 숫자만 포함해야 합니다.')
      .min(10, '전화번호는 최소 10자 이상이어야 합니다.'),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });
