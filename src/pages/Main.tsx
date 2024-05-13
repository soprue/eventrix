import { Suspense, lazy, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

const ErrorBox = lazy(() => import('@shared/ErrorBox'));
const ModalCategory = lazy(() => import('@components/main/ModalCategory'));
const ModalPrice = lazy(() => import('@components/main/ModalPrice'));
import Spinner from '@shared/Spinner';
import EventList from '@shared/EventList';
import SortSelect from '@shared/SortSelect';
import EventSkeletonList from '@shared/EventSkeletonList';
import EventFilterButton from '@components/main/EventFilterButton';

import { FilterType, PriceFilterType, SortFilterType } from '@/types/event';
import { getAllEvents } from '@services/eventService';
import useWindowSize from '@hooks/useWindowSize';

function Main() {
  const { width } = useWindowSize();

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

  if (isError)
    return (
      <Suspense>
        <ErrorBox />
      </Suspense>
    );

  const events = data?.pages.flatMap(page => page.events) || [];
  const columns = width < 768 ? 2 : 4;

  return (
    <div className='pb-12'>
      <div className='flex flex-col gap-2 py-12 tablet:gap-1 mobile:py-10'>
        <p className='text-3xl font-bold tablet:text-[26px] mobile:text-xl mobile:font-semibold'>
          마음에 드는 이벤트를 찾아보세요.
        </p>
        <p className='text-xl font-medium tablet:text-lg mobile:text-base'>
          희망 정보를 선택하여 나에게 맞는 이벤트를 찾아보세요!
        </p>
      </div>

      <div className='mb-6 flex items-center justify-between'>
        <div className='flex gap-6 mobile:gap-2'>
          <div className='relative h-[46px] mobile:h-8'>
            <EventFilterButton
              label={'카테고리'}
              onClick={() => setCurrentModal('카테고리')}
              selectedFilter={category}
            />
            {currentModal === '카테고리' && (
              <Suspense
                fallback={
                  <div className='border-line-normal absolute top-[calc(46px+16px)] z-[1] flex size-full h-[250px] w-[600px] items-center justify-center rounded-lg border bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.15)] tablet:w-[500px] mobile:w-[250px]'>
                    <Spinner />
                  </div>
                }
              >
                <ModalCategory
                  data={category}
                  setData={setCategory}
                  onClose={onClose}
                />
              </Suspense>
            )}
          </div>
          <div className='relative h-[46px] mobile:h-8'>
            <EventFilterButton
              label={'가격'}
              onClick={() => setCurrentModal('가격')}
              selectedFilter={price}
            />
            {currentModal === '가격' && (
              <Suspense
                fallback={
                  <div className='border-line-normal absolute top-[calc(46px+16px)] z-[1] flex size-full h-[250px] w-[600px] items-center justify-center rounded-lg border bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.15)] tablet:w-[500px] mobile:w-[250px]'>
                    <Spinner />
                  </div>
                }
              >
                <ModalPrice data={price} setData={setPrice} onClose={onClose} />
              </Suspense>
            )}
          </div>
        </div>

        <SortSelect sort={sort} setSort={setSort} />
      </div>

      {isLoading ? (
        <EventSkeletonList cols={columns} />
      ) : (
        <>
          <EventList events={events} cols={columns} />
          <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
        </>
      )}
    </div>
  );
}

export default Main;
