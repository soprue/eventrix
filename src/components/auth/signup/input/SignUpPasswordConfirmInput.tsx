import React from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';

import { SignUpInputProps } from './SignUpUserTypeInput';

function SignUpPasswordConfirmInput({ form }: SignUpInputProps) {
  return (
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
  );
}

export default React.memo(SignUpPasswordConfirmInput);
