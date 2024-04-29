import { Skeleton } from '@components/ui/skeleton';

function EventSkeletonList() {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className='h-[320px] cursor-pointer rounded-md border border-input bg-background transition-transform duration-300 hover:translate-y-[-5px] hover:drop-shadow'
        >
          <div className='relative h-[215px] overflow-hidden'>
            <Skeleton className='size-full' />
          </div>
          <div className='p-3'>
            <div className='mb-1 flex justify-between'>
              <Skeleton className='h-6 w-12' />
              <Skeleton className='h-6 w-[62px]' />
            </div>
            <Skeleton className='h-6 w-56' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventSkeletonList;
