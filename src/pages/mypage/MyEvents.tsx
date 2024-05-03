import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Button } from '@components/ui/button';
import SpinnerBox from '@shared/SpinnerBox';
import ErrorBox from '@shared/ErrorBox';
import Status from '@components/mypage/events/Status';
import EventTable from '@components/mypage/events/EventTable';

import { EventType } from '@/types/event';
import useUser from '@hooks/useUser';
import { getMyEvents } from '@services/eventService';
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
      return await getMyEvents(user.uid);
    },
    {
      enabled: !!user && !!user.uid,
      cacheTime: 1000 * 60 * 30,
    },
  );

  const filteredData = status
    ? data?.filter(event => event.status === status) || []
    : data || [];

  if (isLoading) return <SpinnerBox />;

  if (isError) return <ErrorBox />;

  return (
    <>
      {/* <button onClick={addDummyEvents}>더미데이터 추가</button> */}
      <div className='mb-4 flex justify-end'>
        <Button>
          <Link to='/mypage/events/new'>등록하기</Link>
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
