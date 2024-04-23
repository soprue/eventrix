import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

import Spinner from '@components/shared/Spinner';
import ErrorBox from '@components/shared/ErrorBox';
import EventList from '@components/shared/EventList';

import { getAllEvents } from '@services/eventService';

function Main() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery('events', getAllEvents, {
    getNextPageParam: lastPage => lastPage.lastVisible || undefined,
  });

  console.log(data);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading)
    return (
      <div
        role='status'
        className='flex min-h-[calc(100dvh-64px)] w-full items-center justify-center'
      >
        <Spinner />
      </div>
    );

  if (isError) return <ErrorBox />;

  const events = data?.pages.flatMap(page => page.events) || [];

  return (
    <div className='pb-10'>
      <div className='flex flex-col gap-2 py-10'>
        <p className='text-3xl font-bold'>마음에 드는 이벤트를 찾아보세요.</p>
        <p className='text-xl font-medium'>
          희망 정보를 선택하여 나에게 맞는 이벤트를 찾아보세요!
        </p>
      </div>

      <EventList events={events} />

      <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
    </div>
  );
}

export default Main;
