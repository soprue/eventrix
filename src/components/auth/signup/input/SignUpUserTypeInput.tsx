import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@components/ui/form';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';

import { SignUpFormValues } from '@/types/form';

export interface SignUpInputProps {
  form: UseFormReturn<SignUpFormValues>;
}

function SignUpUserTypeInput({ form }: SignUpInputProps) {
  return (
    <FormField
      control={form.control}
      name='userType'
      render={({ field }) => (
        <FormItem className='flex justify-center space-y-3'>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex gap-6'
              name='userType'
            >
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='organizer' />
                </FormControl>
                <FormLabel className='font-normal'>주최자</FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='buyer' />
                </FormControl>
                <FormLabel className='font-normal'>참여자</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default React.memo(SignUpUserTypeInput);
