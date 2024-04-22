import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { TiDelete } from 'react-icons/ti';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Textarea } from '@components/ui/textarea';

import { cn } from '@/lib/utils';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import RightArrow from '@assets/images/icons/RightArrow.svg';
import { CATEGORIES } from '@constants/categories';
import DaumPostcodeEmbed from 'react-daum-postcode';

interface Ticket {
  name: string;
  price: number;
  quantity: number;
}

interface PostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

function EventForm() {
  const { openAlert } = useGlobalAlertStore();
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      thumbnail: null,
      name: '',
      startDate: new Date(),
      startTime: '',
      endDate: new Date(),
      endTime: '',
      category: 'IT/Technology',
      location: '',
      registrationStartDate: new Date(),
      registrationStartTime: '',
      registrationEndDate: new Date(),
      registrationEndTime: '',
      description: '',
    },
  });
  const startDate = form.watch('startDate');
  const startTime = form.watch('startTime');
  const registrationStartDate = form.watch('registrationStartDate');
  const registrationStartTime = form.watch('registrationStartTime');
  const location = form.watch('location');

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([
    { name: '', price: 0, quantity: 0 },
  ]);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);

  const calculateEndTimeOptions = (startDate: Date, startTime: string) => {
    const options = [];
    for (let i = 0; i < 48; i++) {
      const hour = Math.floor(i / 2);
      const minute = (i % 2) * 30;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const ampm = hour < 12 ? '오전' : '오후';
      const formattedTime = `${ampm} ${displayHour}시 ${minute.toString().padStart(2, '0')}분`;

      const currentDate = new Date();
      currentDate.setHours(hour, minute, 0);
      const selectedDateTime = new Date(startDate);
      selectedDateTime.setHours(
        parseInt(startTime.split(':')[0]),
        parseInt(startTime.split(':')[1]),
        0,
      );

      if (currentDate >= selectedDateTime) {
        options.push({ value: timeString, label: formattedTime });
      }
    }
    return options;
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setThumbnailPreview(imageUrl);
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleAddTicket = () => {
    if (tickets.length < 5) {
      setTickets([...tickets, { name: '', price: 0, quantity: 0 }]);
    } else {
      openAlert('최대 5개까지만 추가할 수 있습니다.', '');
    }
  };

  const handleRemoveTicket = (index: number) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter((_, idx) => idx !== index));
    } else {
      openAlert('최소 1개의 티켓은 입력해야 합니다.', '');
    }
  };

  const handleTicketChange = <K extends keyof Ticket>(
    index: number,
    field: K,
    value: Ticket[K],
  ) => {
    const newTickets = [...tickets];
    newTickets[index][field] = value;
    setTickets(newTickets);
  };

  const handlePostcodeComplete = (data: PostcodeData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    form.setValue('location', fullAddress);
    setIsPostcodeOpen(false);
  };

  const togglePostcode = () => {
    setIsPostcodeOpen(prev => !prev);
  };

  function onSubmit() {}

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div>
            <FormField
              name='thumbnail'
              render={() => (
                <FormItem>
                  <FormLabel>썸네일</FormLabel>
                  <FormControl>
                    <Input
                      id='picture'
                      type='file'
                      accept='image/*'
                      {...form.register('thumbnail')}
                      onChange={handleThumbnailChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {thumbnailPreview ? (
              <div className='flex h-[320px] w-full items-center justify-center overflow-hidden rounded-md border border-input'>
                <img
                  src={thumbnailPreview}
                  alt='Thumbnail Preview'
                  className='size-full h-full w-full object-cover'
                />
              </div>
            ) : (
              <div className='flex h-[320px] w-full items-center justify-center overflow-hidden rounded-md border border-input'>
                <p className='text-center text-sm text-gray-500'>
                  썸네일 미리보기
                </p>
              </div>
            )}
          </div>

          <FormField
            name='name'
            render={() => (
              <FormItem>
                <FormLabel>이벤트 이름</FormLabel>
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

          <div className='flex flex-col space-y-2'>
            <p className='py-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              이벤트 일시
            </p>
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
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date()}
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
                  name='startTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-grow flex-col'>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='시작 시간을 선택해 주세요.' />
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
                            const displayHour =
                              hour % 12 === 0 ? 12 : hour % 12;
                            const ampm = hour < 12 ? '오전' : '오후';
                            return (
                              <SelectItem key={timeString} value={timeString}>
                                {`${ampm} ${displayHour}시 ${minute
                                  .toString()
                                  .padStart(2, '0')}분`}
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
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date(startDate)}
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
                  name='endTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-grow flex-col'>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='종료 시간을 선택해 주세요.' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {calculateEndTimeOptions(startDate, startTime).map(
                            option => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>카테고리</FormLabel>
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
                        <FormLabel className='!my-0 font-normal'>
                          {label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex flex-col space-y-2'>
            <p className='py-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              이벤트 장소
            </p>
            <div
              className='w-full cursor-pointer overflow-hidden rounded-md border border-input px-3 py-2 text-sm'
              onClick={togglePostcode}
            >
              {location ? location : '주소를 검색해 주세요.'}
            </div>
            {isPostcodeOpen && (
              <div>
                <DaumPostcodeEmbed
                  onComplete={handlePostcodeComplete}
                  autoClose
                  className='z-10 h-[450px] w-full'
                />
              </div>
            )}
          </div>

          <div className='flex flex-col space-y-2'>
            <p className='py-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              모집 기간
            </p>
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
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date()}
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
                  name='registrationStartTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-grow flex-col'>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='시작 시간을 선택해 주세요.' />
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
                            const displayHour =
                              hour % 12 === 0 ? 12 : hour % 12;
                            const ampm = hour < 12 ? '오전' : '오후';
                            return (
                              <SelectItem key={timeString} value={timeString}>
                                {`${ampm} ${displayHour}시 ${minute
                                  .toString()
                                  .padStart(2, '0')}분`}
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
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date =>
                              date < new Date(registrationStartDate)
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
                  name='registrationEndTime'
                  render={({ field }) => (
                    <FormItem className='flex flex-grow flex-col'>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='종료 시간을 선택해 주세요.' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {calculateEndTimeOptions(
                            registrationStartDate,
                            registrationStartTime,
                          ).map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>이벤트 소개</FormLabel>
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

          <div className='flex flex-col gap-2 '>
            {tickets.map((ticket, index) => (
              <div key={index} className='flex gap-2'>
                <div className='flex basis-[32%] items-center justify-between'>
                  <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    티켓 이름
                  </p>
                  <Input
                    placeholder='일반 티켓'
                    value={ticket.name}
                    onChange={e =>
                      handleTicketChange(index, 'name', e.target.value)
                    }
                    className='w-[70%]'
                  />
                </div>
                <div className='flex basis-[32%] items-center justify-between'>
                  <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    티켓 가격
                  </p>
                  <Input
                    placeholder='20000'
                    value={ticket.price}
                    onChange={e =>
                      handleTicketChange(index, 'price', Number(e.target.value))
                    }
                    className='w-[70%]'
                  />
                </div>
                <div className='flex basis-[32%] items-center justify-between'>
                  <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                    판매 개수
                  </p>
                  <Input
                    placeholder='1000'
                    value={ticket.quantity}
                    onChange={e =>
                      handleTicketChange(
                        index,
                        'quantity',
                        Number(e.target.value),
                      )
                    }
                    className='w-[70%]'
                  />
                </div>
                <div className='flex basis-[5%] justify-end'>
                  <button onClick={() => handleRemoveTicket(index)}>
                    <TiDelete size='20' />
                  </button>
                </div>
              </div>
            ))}
            <div className='flex justify-end'>
              <Button
                variant='outline'
                onClick={handleAddTicket}
                className='h-fit text-xs'
              >
                티켓 추가
              </Button>
            </div>
          </div>

          <Button className='!mt-16 w-full'>등록하기</Button>
        </form>
      </Form>
    </div>
  );
}

export default EventForm;
