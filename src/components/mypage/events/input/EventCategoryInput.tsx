import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@components/ui/form';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import InputTitle from '@shared/InputTitle';

import { EventFormValues } from '@/types/form';
import { CATEGORIES } from '@constants/categories';

interface EventCategoryInputProps {
  form: UseFormReturn<EventFormValues>;
}

function EventCategoryInput({ form }: EventCategoryInputProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <InputTitle title='카테고리' />

      <FormField
        control={form.control}
        name='category'
        render={({ field }) => (
          <FormItem className='space-y-3'>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='flex flex-wrap gap-x-0 gap-y-3'
              >
                {Object.entries(CATEGORIES).map(([key, label]) => (
                  <FormItem
                    key={key}
                    className='flex w-1/5 items-center space-x-2'
                  >
                    <FormControl>
                      <RadioGroupItem value={key} />
                    </FormControl>
                    <FormLabel className='!my-0 font-normal'>{label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

export default EventCategoryInput;
