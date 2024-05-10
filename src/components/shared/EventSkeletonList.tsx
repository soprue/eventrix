import { Skeleton } from '@components/ui/skeleton';

interface EventSkeletonListProps {
  cols?: number;
}

function EventSkeletonList({ cols = 4 }: EventSkeletonListProps) {
  return (
    <div
      className={`mobile:gap-2 grid grid-cols-${cols} gap-4`}
      data-cy='skeleton-list'
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className='tablet:h-[275px] mobile:h-[260px] h-[320px] cursor-pointer rounded-md border border-input bg-background transition-transform duration-300 hover:translate-y-[-5px] hover:drop-shadow'
        >
          <div className='tablet:h-[180px] relative h-[200px] overflow-hidden'>
            <Skeleton className='size-full' />
          </div>
          <div className='p-3'>
            <div className='mb-1 flex justify-between'>
              <Skeleton className='mobile:h-4 h-6 w-12' />
              <Skeleton className='mobile:h-4 h-6 w-[62px]' />
            </div>
            <Skeleton className='tablet:w-full mobile:h-5 mobile:mt-2 h-6 w-56' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventSkeletonList;
