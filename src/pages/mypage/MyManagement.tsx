import { useState } from 'react';
import { useQuery } from 'react-query';

import ErrorBox from '@shared/ErrorBox';
import SpinnerBox from '@shared/SpinnerBox';
import EventSelector from '@components/mypage/management/EventSelector';
import TicketTable from '@components/mypage/management/TicketTable';

import { PurchaseTicketType } from '@/types/ticket';
import { getEventTickets } from '@services/eventService';

function MyManagement() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<PurchaseTicketType[]>(
    ['tickets', selectedEvent],
    () => getEventTickets(selectedEvent!),
    { enabled: !!selectedEvent },
  );

  if (isError) return <ErrorBox />;

  return (
    <>
      <div className='mb-8 flex w-full justify-between'>
        <EventSelector setSelectedEvent={setSelectedEvent} />
      </div>
      <div className='overflow-x-auto'>
        {isLoading ? (
          <SpinnerBox className=' min-h-[calc(100dvh-200px)]' />
        ) : (
          <TicketTable data={data || []} />
        )}
      </div>
    </>
  );
}

export default MyManagement;
