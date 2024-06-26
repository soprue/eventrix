import { useInfiniteQuery } from 'react-query';
import { Suspense, lazy, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const ErrorBox = lazy(() => import('@shared/ErrorBox'));
import Spinner from '@shared/Spinner';
import EventList from '@shared/EventList';
import EventSkeletonList from '@shared/EventSkeletonList';

import useUser from '@hooks/useUser';
import useWindowSize from '@hooks/useWindowSize';
import { getUserLikesWithPagination } from '@services/eventService';

function MyLikedEvents() {
  const user = useUser();
  const { ref, inView } = useInView();
  const { width } = useWindowSize();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['userLikesScrollList', user?.uid],
    ({ pageParam }) =>
      getUserLikesWithPagination(pageParam, user?.uid as string),
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

  if (isError)
    return (
      <Suspense>
        <ErrorBox data-cy='error-box' />
      </Suspense>
    );

  const events = data?.pages.flatMap(page => page.events) || [];
  const columns = width > 768 ? 4 : width < 768 ? 2 : 3;

  return (
    <>
      {isLoading ? (
        <EventSkeletonList cols={columns} />
      ) : (
        <>
          <EventList events={events} cols={columns} />
          <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
        </>
      )}
    </>
  );
}

export default MyLikedEvents;
