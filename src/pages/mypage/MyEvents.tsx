import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';

const SpinnerBox = lazy(() => import('@shared/SpinnerBox'));
const ErrorBox = lazy(() => import('@shared/ErrorBox'));
import { Button } from '@components/ui/button';
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

  if (isLoading)
    return (
      <Suspense>
        <SpinnerBox />
      </Suspense>
    );
  if (isError)
    return (
      <Suspense>
        <ErrorBox data-cy='error-box' />
      </Suspense>
    );

  return (
    <>
      {/* <button onClick={addDummyEvents}>더미데이터 추가</button> */}
      <div className='mb-4 flex justify-end'>
        <Button className='mobile:font-normal'>
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
