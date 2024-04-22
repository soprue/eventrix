import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import Status from '@components/my/events/Status';
import EventTable from '@components/my/events/EventTable';
import { Button } from '@components/ui/button';
import Spinner from '@components/shared/Spinner';

import { EventType } from '@/types/Event';
import useUser from '@hooks/useUser';
import { getMyEvents } from '@services/eventService';
import error from '@assets/images/error_illustration.svg';
import { calculateEventStatus } from '@utils/my/calculateEventStatus';
import { StatusMenuType } from '@constants/eventStatusMenus';

function MyEvents() {
  const user = useUser();
  const [status, setStatus] = useState<StatusMenuType | null>(null);

  const { data, isLoading, isError } = useQuery<EventType[]>(
    ['myEvents', user?.uid],
    async () => {
      if (!user?.uid) {
        return [];
      }
      const events = await getMyEvents(user.uid);
      return events.map(event => ({
        ...event,
        status: calculateEventStatus(event),
      })) as EventType[];
    },
    {
      enabled: !!user && !!user.uid,
      cacheTime: 1000 * 60 * 30,
    },
  );
  const filteredData = status
    ? data?.filter(event => event.status === status) || []
    : data || [];

  if (isLoading)
    return (
      <div
        role='status'
        className='flex min-h-[calc(100dvh-64px)] w-full items-center justify-center'
      >
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className='flex min-h-[calc(100dvh-64px)] w-full flex-col items-center justify-center'>
        <img src={error} alt='오류 이미지' className='mb-16 w-1/4' />
        <p className='text-center text-lg font-medium'>
          오류가 발생했습니다.
          <br />
          다시 시도해 주세요.
        </p>
      </div>
    );

  return (
    <>
      {/* <button onClick={addDummyEvents}>더미데이터 추가</button> */}
      <div className='mb-4 flex justify-end'>
        <Button>
          <Link to='/my/events/new'>등록하기</Link>
        </Button>
      </div>
      <div>
        <Status
          statuses={data?.map(event => event.status as string) || []}
          status={status}
          setStatus={setStatus}
        />
        <EventTable data={filteredData} />
      </div>
    </>
  );
}

export default MyEvents;
