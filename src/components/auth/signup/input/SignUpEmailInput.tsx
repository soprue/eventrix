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

function SignUpEmailInput({ form }: SignUpInputProps) {
  return (
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
  );
}

export default React.memo(SignUpEmailInput);
