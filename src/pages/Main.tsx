import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import Spinner from '@components/shared/Spinner';
import ErrorBox from '@components/shared/ErrorBox';
import EventList from '@components/shared/EventList';
import EventFilterButton from '@components/main/EventFilterButton';
import ModalCategory from '@components/main/ModalCategory';
import ModalPrice from '@components/main/ModalPrice';

import { FilterType, PriceFilterType } from '@/types/Event';
import { getAllEvents } from '@services/eventService';

function Main() {
  const [sort, setSort] = useState<'최신순' | '인기순'>('최신순');
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
        <div className='flex items-center gap-[11px]'>
          <span className='text-gray-600'>정렬방식</span>
          <Select
            onValueChange={(value: '최신순' | '인기순') => setSort(value)}
          >
            <SelectTrigger className='h-[46px] w-[100px] rounded-full'>
              <SelectValue placeholder={`${sort}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='최신순'>최신순</SelectItem>
                <SelectItem value='인기순'>인기순</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div
          role='status'
          className='flex min-h-[calc(100dvh-250px)] w-full items-center justify-center'
        >
          <Spinner />
        </div>
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
