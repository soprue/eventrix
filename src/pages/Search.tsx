import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInfiniteQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { IoSearchOutline } from 'react-icons/io5';

import { Form, FormControl, FormField, FormItem } from '@components/ui/form';
import { Input } from '@components/ui/input';
import SortSelect from '@components/shared/SortSelect';
import Spinner from '@components/shared/Spinner';
import EventList from '@components/shared/EventList';
import ErrorBox from '@components/shared/ErrorBox';

import { SortFilterType } from '@/types/event';
import { searchEvents } from '@services/eventService';

function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  if (isError) return <ErrorBox />;

  const events = data?.pages.flatMap(page => page.events) || [];
  console.log(events);

  return (
    <>
      <div className='my-20 flex w-full flex-col items-center justify-center gap-4'>
        <div className='flex h-16 w-3/4 items-center gap-2 rounded-md border border-border px-8'>
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
                        className='w-3/4 border-none text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className='flex flex-col items-center gap-1 font-medium'>
          <p className='text-2xl'>
            '<span className='font-bold'>{keyword}</span>'에 대한 검색 결과
          </p>
        </div>
      </div>

      <div>
        <div className='mb-6 flex items-center justify-end'>
          <SortSelect sort={sort} setSort={setSort} />
        </div>
      </div>

      {isLoading ? (
        <div
          role='status'
          className='flex min-h-[calc(100dvh-550px)] w-full items-center justify-center'
        >
          <Spinner />
        </div>
      ) : (
        <>
          <EventList events={events} />
          <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
        </>
      )}
    </>
  );
}

export default Search;
