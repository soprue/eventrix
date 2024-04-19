import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('유효하지 않은 이메일 주소입니다.'),
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
});

function SignUp() {
  return <div>SignUp</div>;
}

export default SignUp;
