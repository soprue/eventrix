import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form';
import { Textarea } from '@components/ui/textarea';
import EventInputTitle from '../EventInputTitle';

import { EventFormValues } from '@/types/form';

interface EventDescriptionInputProps {
  form: UseFormReturn<EventFormValues>;
}

function EventDescriptionInput({ form }: EventDescriptionInputProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <EventInputTitle title='이벤트 소개' />

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder='이벤트 소개 내용을 마크다운 형식으로 입력해 주세요.'
                className='min-h-60 resize-none'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default EventDescriptionInput;
