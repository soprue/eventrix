import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import InputTitle from '@shared/InputTitle';

import { ProfileFormValues } from '@/types/form';

interface ProfileNicknameInputProps {
  form: UseFormReturn<ProfileFormValues>;
}

function ProfileNicknameInput({ form }: ProfileNicknameInputProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <InputTitle title='닉네임' />

      <FormField
        name='nickname'
        render={() => (
          <FormItem>
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
    </div>
  );
}

export default React.memo(ProfileNicknameInput);
