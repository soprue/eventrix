import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import EventForm from '@components/my/events/EventForm';

import { EventType } from '@/types/Event';
import { getEvent } from '@services/eventService';

function MyEditEvent() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');

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
        .catch(error => console.error('Error fetching event data: ', error));
    };

    fetchEventData();
  }, []);

  return <EventForm initialData={initialData} />;
}

export default MyEditEvent;
