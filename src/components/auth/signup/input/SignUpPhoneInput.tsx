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

function SignUpPhoneInput({ form }: SignUpInputProps) {
  return (
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
          </FormControl>
          <FormMessage data-cy='phone-helper-text' />
        </FormItem>
      )}
    />
  );
}

export default React.memo(SignUpPhoneInput);
