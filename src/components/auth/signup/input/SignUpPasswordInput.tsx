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

function SignUpPasswordInput({ form }: SignUpInputProps) {
  return (
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
  );
}

export default React.memo(SignUpPasswordInput);
