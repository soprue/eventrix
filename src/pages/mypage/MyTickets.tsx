import { Suspense, lazy, useState } from 'react';
import { useQuery } from 'react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore/lite';

const SpinnerBox = lazy(() => import('@shared/SpinnerBox'));
const ErrorBox = lazy(() => import('@shared/ErrorBox'));
import NoData from '@shared/NoData';
import PurchaseTicketList from '@components/mypage/tickets/PurchaseTicketList';

import useUser from '@hooks/useUser';
import { getMyTickets } from '@services/eventService';

function MyTickets() {
  const user = useUser();
  const [page, setPage] = useState(0);
  const [lastDoc, setLastDoc] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData> | null | undefined
  >(null);

  const { data, isLoading, isError } = useQuery(
    ['tickets', user?.uid, page],
    () => getMyTickets(lastDoc, user?.uid as string),
    {
      keepPreviousData: true,
      enabled: !!user?.uid,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      onSuccess: newData => {
        setLastDoc(newData.lastVisible || null);
      },
    },
  );

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
      {data?.events.length === 0 ? (
        <NoData />
      ) : (
        <PurchaseTicketList
          events={data?.events ?? []}
          page={page}
          setPage={setPage}
          hasNextPage={data?.hasNextPage as boolean}
        />
      )}
    </>
  );
}

export default MyTickets;
