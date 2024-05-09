import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

import Spinner from '@shared/Spinner';
import ErrorBox from '@shared/ErrorBox';
import EventList from '@shared/EventList';
import SortSelect from '@shared/SortSelect';
import EventSkeletonList from '@shared/EventSkeletonList';
import EventFilterButton from '@components/main/EventFilterButton';
import ModalCategory from '@components/main/ModalCategory';
import ModalPrice from '@components/main/ModalPrice';

import { FilterType, PriceFilterType, SortFilterType } from '@/types/event';
import { getAllEvents } from '@services/eventService';

function Main() {
  const [sort, setSort] = useState<SortFilterType>('최신순');
  const [currentModal, setCurrentModal] = useState<null | FilterType>(null);
  const [category, setCategory] = useState<string[]>([]);
  const [price, setPrice] = useState<PriceFilterType>('전체');

  const onClose = () => setCurrentModal(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['events', { sort, category, price }],
    ({ pageParam }) => getAllEvents({ pageParam, sort, category, price }),
    {
      getNextPageParam: lastPage => lastPage.lastVisible || undefined,
    },
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isError) return <ErrorBox />;

  const events = data?.pages.flatMap(page => page.events) || [];

  return (
    <div className='pb-12'>
      <div className='flex flex-col gap-2 py-12'>
        <p className='text-3xl font-bold'>마음에 드는 이벤트를 찾아보세요.</p>
        <p className='text-xl font-medium'>
          희망 정보를 선택하여 나에게 맞는 이벤트를 찾아보세요!
        </p>
      </div>

      <div className='mb-6 flex items-center justify-between'>
        <div className='flex gap-6'>
          <div className='relative h-[46px]'>
            <EventFilterButton
              label={'카테고리'}
              onClick={() => setCurrentModal('카테고리')}
              selectedFilter={category}
            />
            {currentModal === '카테고리' && (
              <ModalCategory
                data={category}
                setData={setCategory}
                onClose={onClose}
              />
            )}
          </div>
          <div className='relative h-[46px]'>
            <EventFilterButton
              label={'가격'}
              onClick={() => setCurrentModal('가격')}
              selectedFilter={price}
            />
            {currentModal === '가격' && (
              <ModalPrice data={price} setData={setPrice} onClose={onClose} />
            )}
          </div>
        </div>

        <SortSelect sort={sort} setSort={setSort} />
      </div>

      {isLoading ? (
        <EventSkeletonList />
      ) : (
        <>
          <EventList events={events} />
          <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
        </>
      )}
    </div>
  );
}

export default Main;
