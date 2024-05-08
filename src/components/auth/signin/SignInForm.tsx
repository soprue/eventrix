import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';

import { signInWithEmail } from '@services/userService';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';

interface FormValues {
  email: string;
  password: string;
}

function SignInForm() {
  const { openAlert } = useGlobalAlertStore();
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const email = form.watch('email');
  const password = form.watch('password');
  const 모두입력되었는지 = !email || !password;

  function onSubmit(values: FormValues) {
    signInWithEmail(values)
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
      <p className='mb-12 text-center text-3xl font-bold'>로그인</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder='이메일을 입력해 주세요.' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='비밀번호를 입력해 주세요.'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full'
            disabled={모두입력되었는지}
            data-cy='signin-button'
          >
            로그인
          </Button>
        </form>
      </Form>
    </>
  );
}

export default SignInForm;
