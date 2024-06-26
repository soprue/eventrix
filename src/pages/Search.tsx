import { Suspense, lazy, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInfiniteQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { IoSearchOutline } from 'react-icons/io5';

const ErrorBox = lazy(() => import('@shared/ErrorBox'));
import { Form, FormControl, FormField, FormItem } from '@components/ui/form';
import { Input } from '@components/ui/input';
import SortSelect from '@shared/SortSelect';
import Spinner from '@shared/Spinner';
import EventList from '@shared/EventList';
import EventSkeletonList from '@shared/EventSkeletonList';

import { SortFilterType } from '@/types/event';
import { searchEvents } from '@services/eventService';
import useWindowSize from '@hooks/useWindowSize';

function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { width } = useWindowSize();

  const keyword = searchParams.get('q')!;
  const [sort, setSort] = useState<SortFilterType>('최신순');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['events', { sort }],
    ({ pageParam }) => searchEvents({ pageParam, sort, keyword }),
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

  const form = useForm({
    defaultValues: {
      search: keyword,
    },
  });

  const onSubmit = (data: string) => {
    if (data) navigate(`/search?q=${data}`);
  };

  if (isError)
    return (
      <Suspense>
        <ErrorBox />
      </Suspense>
    );

  const events = data?.pages.flatMap(page => page.events) || [];
  const columns = width < 768 ? 2 : 4;

  return (
    <>
      <div className='my-20 flex w-full flex-col items-center justify-center gap-4 tablet:my-16 mobile:my-12 mobile:gap-3'>
        <div className='flex h-16 w-3/4 items-center gap-2 rounded-md border border-border px-8 tablet:h-14 mobile:h-10 mobile:px-4'>
          <IoSearchOutline size={24} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(data =>
                onSubmit(data.search as string),
              )}
              className='w-full'
            >
              <FormField
                control={form.control}
                name='search'
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        defaultValue={keyword ?? ''}
                        {...form.register('search', {
                          setValueAs: value => value.trim(),
                        })}
                        type='text'
                        placeholder='검색'
                        className='h-full w-3/4 border-none text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 tablet:text-lg mobile:text-base'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className='flex flex-col items-center gap-1 font-medium'>
          <p className='table:text-[20px] text-2xl mobile:text-lg'>
            '<span className='font-bold mobile:font-semibold'>{keyword}</span>
            '에 대한 검색 결과
          </p>
        </div>
      </div>

      <div>
        <div className='mb-6 flex items-center justify-end'>
          {events.length !== 0 && <SortSelect sort={sort} setSort={setSort} />}
        </div>
      </div>

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

export default Search;
