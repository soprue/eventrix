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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FormValues {
  userType: 'organizer' | 'buyer';
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  phone: string;
}

const formSchema = z
  .object({
    userType: z.enum(['organizer', 'buyer']),
    email: z.string().email('유효하지 않은 이메일 주소입니다.'),
    name: z.string().min(1, '이름을 입력해 주세요.'),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .refine(
        (val) =>
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
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

function SignUpForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      userType: 'buyer',
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      phone: '',
    },
  });

  const userType = form.watch('userType');
  const email = form.watch('email');
  const name = form.watch('name');
  const password = form.watch('password');
  const passwordConfirm = form.watch('passwordConfirm');
  const phone = form.watch('phone');
  const 모두입력되었는지 =
    !userType || !email || !name || !password || !passwordConfirm || !phone;

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-3 flex justify-center">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-6"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="organizer" />
                    </FormControl>
                    <FormLabel className="font-normal">주최자</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="buyer" />
                    </FormControl>
                    <FormLabel className="font-normal">참여자</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={() => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="이메일을 입력해 주세요."
                  {...form.register('email')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input
                  placeholder="이름을 입력해 주세요."
                  {...form.register('name')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={() => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="8자 이상의 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 문자 조합을 사용해 주세요."
                  {...form.register('password')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="passwordConfirm"
          render={() => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 다시 입력해 주세요."
                  {...form.register('passwordConfirm')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          render={() => (
            <FormItem>
              <FormLabel>전화번호</FormLabel>
              <FormControl>
                <Input
                  placeholder="-를 제외하고 입력해 주세요."
                  {...form.register('phone')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={모두입력되었는지}>
          회원가입
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
