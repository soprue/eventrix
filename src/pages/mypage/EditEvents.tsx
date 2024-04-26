import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import EventForm from '@components/mypage/events/EventForm';

import { EventType } from '@/types/event';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { getEvent } from '@services/eventService';

function MyEditEvent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const { openAlert } = useGlobalAlertStore();

  const [initialData, setInitialData] = useState<EventType | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      await getEvent(eventId!)
        .then(res => {
          if (res) {
            setInitialData(res);
          } else {
            navigate('/404');
          }
        })
        .catch(error => {
          openAlert('오류가 발생했습니다.', error as string);
        });
    };

    fetchEventData();
  }, []);

  return <EventForm initialData={initialData} />;
}

export default MyEditEvent;
