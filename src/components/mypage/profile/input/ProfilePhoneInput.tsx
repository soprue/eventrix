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

interface ProfilePhoneInputProps {
  form: UseFormReturn<ProfileFormValues>;
}

function ProfilePhoneInput({ form }: ProfilePhoneInputProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <InputTitle title='전화번호' />

      <FormField
        name='phone'
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder='-를 제외하고 입력해 주세요.'
                {...form.register('phone', {
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

export default ProfilePhoneInput;
