import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { TiDelete } from 'react-icons/ti';
import { GoPlus } from 'react-icons/go';
import { v4 as uuidv4 } from 'uuid';

import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';

import { EventFormValues } from '@/types/Form';

interface EventTicketInputProps {
  form: UseFormReturn<EventFormValues>;
}

function EventTicketInput({ form }: EventTicketInputProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tickets',
  });

  return (
    <div className='flex flex-col gap-2 '>
      {fields.map((field, index) => (
        <div key={field.id} className='flex gap-2'>
          <Input
            type='hidden'
            {...form.register(`tickets.${index}.id`)}
            defaultValue={field.id || uuidv4()}
          />
          <div className='flex basis-[32%] items-center gap-2'>
            <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              티켓 이름
            </p>
            <Input
              {...form.register(`tickets.${index}.name`)}
              placeholder='일반 티켓'
              className='w-[70%]'
            />
          </div>
          <div className='flex basis-[32%] items-center gap-2'>
            <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              티켓 가격
            </p>
            <Input
              {...form.register(`tickets.${index}.price`, {
                setValueAs: value => parseInt(value, 10) || 0,
              })}
              placeholder='20000'
              type='number'
              className='w-[70%]'
            />
          </div>
          <div className='flex basis-[32%] items-center gap-2'>
            <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              판매 개수
            </p>
            <Input
              {...form.register(`tickets.${index}.quantity`, {
                setValueAs: value => parseInt(value, 10) || 0,
              })}
              placeholder='1000'
              type='number'
              className='w-[70%]'
            />
          </div>
          <div className='flex basis-[5%] justify-end'>
            {fields.length > 1 && (
              <button type='button' onClick={() => remove(index)}>
                <TiDelete size='20' />
              </button>
            )}
          </div>
        </div>
      ))}
      <div>
        {form.formState.errors.tickets?.root && (
          <p className='text-sm text-red-500'>
            {form.formState.errors.tickets.root.message}
          </p>
        )}
      </div>
      <div className='flex justify-end'>
        {fields.length < 5 && (
          <Button
            type='button'
            variant='outline'
            onClick={() =>
              append({
                id: uuidv4(),
                name: '',
                price: 0,
                quantity: 0,
              })
            }
            className='h-fit gap-1 text-xs'
          >
            <GoPlus />
            티켓 추가
          </Button>
        )}
      </div>
    </div>
  );
}

export default EventTicketInput;
