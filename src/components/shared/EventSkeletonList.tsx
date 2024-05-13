import { Skeleton } from '@components/ui/skeleton';

interface EventSkeletonListProps {
  cols?: number;
}

function EventSkeletonList({ cols = 4 }: EventSkeletonListProps) {
  return (
    <div
      className={`grid mobile:gap-2 grid-cols-${cols} gap-4`}
      data-cy='skeleton-list'
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className='h-[320px] cursor-pointer rounded-md border border-input bg-background transition-transform duration-300 hover:translate-y-[-5px] hover:drop-shadow tablet:h-[275px] mobile:h-[260px]'
        >
          <div className='relative h-[200px] overflow-hidden tablet:h-[180px]'>
            <Skeleton className='size-full' />
          </div>
          <div className='p-3'>
            <div className='mb-1 flex justify-between'>
              <Skeleton className='h-6 w-12 mobile:h-4' />
              <Skeleton className='h-6 w-[62px] mobile:h-4' />
            </div>
            <Skeleton className='h-6 w-56 tablet:w-full mobile:mt-2 mobile:h-5' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventSkeletonList;
