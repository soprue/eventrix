import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

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
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import EventInputTitle from '../EventInputTitle';

import { EventFormValues } from '@/types/form';
import { cn } from '@/lib/utils';
import RightArrow from '@assets/images/icons/RightArrow.svg';
import formatTimeTo12HourClock from '@/utils/my/formatTimeTo12HourClock';

interface EventRegistrationDateInputProps {
  form: UseFormReturn<EventFormValues>;
  startDate: Date | null;
  registrationStartDate: Date | null;
  registrationStartTime: string;
}

function EventRegistrationDateInput({
  form,
  startDate,
  registrationStartDate,
  registrationStartTime,
}: EventRegistrationDateInputProps) {
  return (
    <div className='flex flex-col space-y-2'>
      <EventInputTitle
        title={
          <>
            모집 기간{' '}
            <span className='text-xs font-normal text-gray-500'>
              (이벤트 일시를 먼저 선택해 주세요.)
            </span>
          </>
        }
      />
      <div className='flex flex-wrap'>
        <div className='flex-grow basis-[22%]'>
          <FormField
            control={form.control}
            name='registrationStartDate'
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
                        const startDateValue = startDate
                          ? new Date(startDate)
                          : new Date();
                        return date < new Date() || date >= startDateValue;
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
            name='registrationStartTime'
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
            name='registrationEndDate'
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
                      disabled={date => {
                        const registrationStartDateValue = registrationStartDate
                          ? new Date(registrationStartDate)
                          : new Date();
                        const eventStartDateValue = startDate
                          ? new Date(startDate)
                          : new Date();
                        return (
                          date < registrationStartDateValue ||
                          date >= eventStartDateValue
                        ); // 모집 시작 날짜 이후이면서 이벤트 시작 날짜 이전 날짜만 선택 가능
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
            rules={{ required: '종료 시간은 필수입니다.' }}
            name='registrationEndTime'
            render={({ field }) => (
              <FormItem className='flex flex-grow flex-col'>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!registrationStartDate || !registrationStartTime}
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

export default EventRegistrationDateInput;
