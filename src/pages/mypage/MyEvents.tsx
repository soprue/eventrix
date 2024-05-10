import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@components/ui/button';
import SpinnerBox from '@shared/SpinnerBox';
import ErrorBox from '@shared/ErrorBox';
import Status from '@components/mypage/events/Status';
import EventTable from '@components/mypage/events/EventTable';

import { StatusMenuType } from '@constants/eventStatusMenus';
import useMyEvents from '@/hooks/useMyEvents';

function MyEvents() {
  const [status, setStatus] = useState<StatusMenuType | null>(null);

  const { data, isLoading, isError } = useMyEvents();

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
      <div className='overflow-x-auto'>
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
