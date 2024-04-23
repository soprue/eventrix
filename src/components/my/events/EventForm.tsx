import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { Form } from '@components/ui/form';
import { Button } from '@components/ui/button';
import EventThumbnailInput from './input/EventThumbnailInput';
import EventNameInput from './input/EventNameInput';
import EventDateInput from './input/EventDateInput';
import EventCategoryInput from './input/EventCategoryInput';
import EventLocationInput from './input/EventLocationInput';
import EventRegistrationDateInput from './input/EventRegistrationDateInput';
import EventDescriptionInput from './input/EventDescriptionInput';
import EventTicketInput from './input/EventTicketInput';

import { EventFormValues } from '@/types/Form';
import { EventType } from '@/types/Event';
import useUser from '@hooks/useUser';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { createEvent, updateEvent } from '@services/eventService';
import transformEventDataToFormValues from '@utils/my/transformEventDataToFormValues';

interface EventFormProps {
  initialData?: EventType | null;
}

function EventForm({ initialData }: EventFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { openAlert } = useGlobalAlertStore();
  const user = useUser();

  const form = useForm<EventFormValues>({
    mode: 'onChange',
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      thumbnail: null,
      name: '',
      startDate: null,
      startTime: '',
      endDate: null,
      endTime: '',
      category: 'IT/Technology',
      location: '',
      registrationStartDate: null,
      registrationStartTime: '',
      registrationEndDate: null,
      registrationEndTime: '',
      description: '',
      tickets: [{ id: uuidv4(), name: '', price: 0, quantity: 0 }],
    },
  });

  // initialData가 변경될 때 폼을 업데이트
  useEffect(() => {
    if (initialData) {
      const formValues = transformEventDataToFormValues(initialData);
      form.reset(formValues);
      setThumbnailPreview(initialData.thumbnail as string);
    }
  }, [initialData, form]);

  const startDate = form.watch('startDate');
  const startTime = form.watch('startTime');
  const registrationStartDate = form.watch('registrationStartDate');
  const registrationStartTime = form.watch('registrationStartTime');
  const registrationEndDate = form.watch('registrationEndDate');
  const location = form.watch('location');
  const tickets = form.watch('tickets');

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState<boolean>(false);

  const togglePostcode = () => {
    setIsPostcodeOpen(prev => !prev);
  };

  const createMutation = useMutation(
    (newEventData: EventFormValues) => createEvent(newEventData),
    {
      onSuccess: result => {
        if (result.success) {
          queryClient.invalidateQueries(['myEvents', user?.uid]);
          openAlert('이벤트가 등록되었습니다.', '');
          navigate('/my/events');
        } else {
          openAlert(
            '오류가 발생했습니다. 다시 시도해 주세요.',
            result.error as string,
          );
        }
      },
      onError: error => {
        openAlert('오류가 발생했습니다. 다시 시도해 주세요.', error as string);
      },
    },
  );

  const updateMutation = useMutation(
    (editEventData: EventFormValues) => updateEvent(editEventData),
    {
      onSuccess: result => {
        if (result.success) {
          queryClient.invalidateQueries(['myEvents', user?.uid]);
          openAlert('이벤트가 수정되었습니다.', '');
          navigate('/my/events');
        } else {
          openAlert(
            '오류가 발생했습니다. 다시 시도해 주세요.',
            result.error as string,
          );
        }
      },
      onError: error => {
        openAlert('오류가 발생했습니다. 다시 시도해 주세요.', error as string);
      },
    },
  );

  function onSubmit(data: EventFormValues) {
    if (initialData) {
      const eventData: EventFormValues = {
        ...data,
        organizerUID: user?.uid as string,
        uid: initialData.uid,
        tickets,
      };

      updateMutation.mutate(eventData);
    } else {
      const eventData: EventFormValues = {
        ...data,
        organizerUID: user?.uid as string,
        tickets,
      };

      createMutation.mutate(eventData);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <EventThumbnailInput
            form={form}
            thumbnailPreview={thumbnailPreview}
            setThumbnailPreview={setThumbnailPreview}
          />

          <EventNameInput form={form} />

          <EventDateInput
            form={form}
            startDate={startDate}
            startTime={startTime}
            registrationEndDate={registrationEndDate}
          />

          <EventCategoryInput form={form} />

          <EventLocationInput
            form={form}
            location={location}
            isPostcodeOpen={isPostcodeOpen}
            togglePostcode={togglePostcode}
            setIsPostcodeOpen={setIsPostcodeOpen}
          />

          <EventRegistrationDateInput
            form={form}
            startDate={startDate}
            registrationStartDate={registrationStartDate}
            registrationStartTime={registrationStartTime}
          />

          <EventDescriptionInput form={form} />

          <EventTicketInput form={form} />

          <Button className='!mt-16 w-full'>등록하기</Button>
        </form>
      </Form>
    </div>
  );
}

export default EventForm;

const ticketSchema = z.object({
  name: z.string().nonempty({ message: '티켓 이름은 필수입니다.' }),
  price: z.number().positive({ message: '티켓 가격은 0보다 커야 합니다.' }),
  quantity: z.number().positive({ message: '판매 개수는 0보다 커야 합니다.' }),
});

const eventFormSchema = z.object({
  thumbnail: z
    .union([z.instanceof(Blob), z.string()])
    .refine(val => val !== '', {
      message: '썸네일은 필수입니다.',
    }),
  name: z.string().min(1, '이벤트 이름은 필수입니다.').trim(),
  startDate: z
    .date()
    .nullable()
    .or(z.string().transform(date => new Date(date)))
    .refine(date => date != null, { message: '시작 날짜는 필수입니다.' }),
  startTime: z.string().min(1, '시작 시간은 필수입니다.'),
  endDate: z
    .date()
    .nullable()
    .or(z.string().transform(date => new Date(date)))
    .refine(date => date != null, { message: '종료 날짜는 필수입니다.' }),
  endTime: z.string().min(1, '종료 시간은 필수입니다.'),
  category: z.string(),
  location: z.string().min(1, '이벤트 장소 입력은 필수입니다.'),
  registrationStartDate: z
    .date()
    .nullable()
    .or(z.string().transform(date => new Date(date)))
    .refine(date => date != null, { message: '모집 시작 날짜는 필수입니다.' }),
  registrationStartTime: z.string().min(1, '모집 시작 시간은 필수입니다.'),
  registrationEndDate: z
    .date()
    .nullable()
    .or(z.string().transform(date => new Date(date)))
    .refine(date => date != null, { message: '모집 종료 날짜는 필수입니다.' }),
  registrationEndTime: z.string().min(1, '모집 종료 시간은 필수입니다.'),
  description: z.string().min(1, '이벤트 소개는 필수입니다.'),
  tickets: z
    .array(ticketSchema)
    .refine(
      tickets =>
        tickets.every(
          ticket =>
            ticket.name !== '' && ticket.price > 0 && ticket.quantity > 0,
        ),
      {
        message: '모든 티켓은 이름, 가격, 수량을 정확히 입력해야 합니다.',
      },
    ),
});
