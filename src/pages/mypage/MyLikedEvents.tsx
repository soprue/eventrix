import { useInfiniteQuery } from 'react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import SpinnerBox from '@components/shared/SpinnerBox';
import Spinner from '@components/shared/Spinner';
import EventList from '@components/shared/EventList';
import ErrorBox from '@components/shared/ErrorBox';

import useUser from '@hooks/useUser';
import { getUserLikesScrollList } from '@services/eventService';

function MyLikedEvents() {
  const user = useUser();
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['userLikesScrollList', user?.uid],
    ({ pageParam }) => getUserLikesScrollList(pageParam, user?.uid as string),
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      enabled: !!user?.uid,
    },
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isError) return <ErrorBox />;

  const events = data?.pages.flatMap(page => page.events) || [];

  return (
    <>
      {isLoading ? (
        <SpinnerBox className='min-h-[calc(100dvh-550px)]' />
      ) : (
        <>
          <EventList events={events} />
          <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
        </>
      )}
    </>
  );
}

export default MyLikedEvents;
