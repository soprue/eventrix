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

function SignUpNicknameInput({ form }: SignUpInputProps) {
  return (
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
  );
}

export default React.memo(SignUpNicknameInput);
