import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import EventInputTitle from '../EventInputTitle';

import { EventFormValues } from '@/types/Form';

interface EventNameInputProps {
  form: UseFormReturn<EventFormValues>;
}

function EventNameInput({ form }: EventNameInputProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <EventInputTitle title='이벤트 이름' />

      <FormField
        name='name'
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                placeholder='이벤트 이름을 입력해 주세요.'
                {...form.register('name', {
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

export default EventNameInput;
