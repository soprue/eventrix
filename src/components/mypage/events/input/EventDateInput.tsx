import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Select } from '@radix-ui/react-select';

import { Button } from '@components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Calendar } from '@components/ui/calendar';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import InputTitle from '@shared/InputTitle';

import { EventFormValues } from '@/types/form';
import { cn } from '@/lib/utils';
import RightArrow from '@assets/images/icons/RightArrow.svg';
import formatTimeTo12HourClock from '@utils/mypage/formatTimeTo12HourClock';

interface EventDateInputProps {
  form: UseFormReturn<EventFormValues>;
  startDate: Date | null;
  startTime: string;
  registrationEndDate: Date | null;
}

function EventDateInput({
  form,
  startDate,
  startTime,
  registrationEndDate,
}: EventDateInputProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <InputTitle title='이벤트 일시' />

      <div className='flex flex-wrap'>
        <div className='flex-grow basis-[22%]'>
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-grow flex-col'>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ko })
                        ) : (
                          <span>시작 날짜를 선택해 주세요.</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={date => {
                        const registrationEndDateValue = registrationEndDate
                          ? new Date(registrationEndDate)
                          : null;
                        return registrationEndDateValue
                          ? date <= registrationEndDateValue
                          : new Date() > date;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex-grow basis-[22%]'>
          <FormField
            control={form.control}
            rules={{ required: '시작 시간은 필수입니다.' }}
            name='startTime'
            render={({ field }) => (
              <FormItem className='flex flex-grow flex-col'>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          field.value
                            ? formatTimeTo12HourClock(field.value)
                            : `시작 시간을 선택해 주세요.`
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 48 }, (_, index) => {
                      const hour = Math.floor(index / 2);
                      const minute = (index % 2) * 30;
                      const timeString = `${hour
                        .toString()
                        .padStart(2, '0')}:${minute
                        .toString()
                        .padStart(2, '0')}`;
                      return (
                        <SelectItem key={timeString} value={timeString}>
                          {formatTimeTo12HourClock(timeString)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-grow basis-[5%] items-center justify-center'>
          <img src={RightArrow} alt='RightArrow' />
        </div>

        <div className='flex-grow basis-[22%]'>
          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='flex flex-grow flex-col'>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: ko })
                        ) : (
                          <span>종료 날짜를 선택해 주세요.</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={date =>
                        startDate
                          ? date < new Date(startDate)
                          : date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex-grow basis-[22%]'>
          <FormField
            control={form.control}
            rules={{ required: '종료 시간은 필수입니다.' }}
            name='endTime'
            render={({ field }) => (
              <FormItem className='flex flex-grow flex-col'>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!startDate || !startTime}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          field.value
                            ? formatTimeTo12HourClock(field.value)
                            : `종료 시간을 선택해 주세요.`
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 48 }, (_, index) => {
                      const hour = Math.floor(index / 2);
                      const minute = (index % 2) * 30;
                      const timeString = `${hour
                        .toString()
                        .padStart(2, '0')}:${minute
                        .toString()
                        .padStart(2, '0')}`;
                      return (
                        <SelectItem key={timeString} value={timeString}>
                          {formatTimeTo12HourClock(timeString)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(EventDateInput);
