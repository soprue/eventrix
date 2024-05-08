import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { SignUpFormValues } from '@/types/form';
import { signUpWithEmail } from '@services/userService';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';

function SignUpForm() {
  const { openAlert } = useGlobalAlertStore();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      userType: 'buyer',
      email: '',
      nickname: '',
      password: '',
      passwordConfirm: '',
      phone: '',
    },
  });

  const userType = form.watch('userType');
  const email = form.watch('email');
  const name = form.watch('nickname');
  const password = form.watch('password');
  const passwordConfirm = form.watch('passwordConfirm');
  const phone = form.watch('phone');
  const 모두입력되었는지 =
    !userType || !email || !name || !password || !passwordConfirm || !phone;

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
      <p className='mb-12 text-center text-3xl font-bold'>회원가입</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='userType'
            render={({ field }) => (
              <FormItem className='flex justify-center space-y-3'>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex gap-6'
                    name='userType'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='organizer' />
                      </FormControl>
                      <FormLabel className='font-normal'>주최자</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='buyer' />
                      </FormControl>
                      <FormLabel className='font-normal'>참여자</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name='email'
            render={() => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder='이메일을 입력해 주세요.'
                    {...form.register('email', {
                      setValueAs: value => value.trim(),
                    })}
                  />
                </FormControl>
                <FormMessage data-cy='email-helper-text' />
              </FormItem>
            )}
          />
          <FormField
            name='name'
            render={() => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input
                    placeholder='닉네임을 입력해 주세요.'
                    {...form.register('nickname', {
                      setValueAs: value => value.trim(),
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='password'
            render={() => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='8자 이상의 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 문자 조합을 사용해 주세요.'
                    {...form.register('password')}
                  />
                </FormControl>{' '}
                <FormMessage data-cy='password-helper-text' />
              </FormItem>
            )}
          />
          <FormField
            name='passwordConfirm'
            render={() => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='비밀번호를 다시 입력해 주세요.'
                    {...form.register('passwordConfirm')}
                  />
                </FormControl>{' '}
                <FormMessage data-cy='password-confirm-helper-text' />
              </FormItem>
            )}
          />
          <FormField
            name='phone'
            render={() => (
              <FormItem>
                <FormLabel>전화번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder='-를 제외하고 입력해 주세요.'
                    {...form.register('phone', {
                      setValueAs: value => value.trim(),
                    })}
                  />
                </FormControl>{' '}
                <FormMessage data-cy='phone-helper-text' />
              </FormItem>
            )}
          />{' '}
          <Button
            type='submit'
            className='w-full'
            disabled={모두입력되었는지}
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
