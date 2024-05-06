import { Table as TanstackTable } from '@tanstack/react-table';

import { Button } from '@components/ui/button';

interface DataPaginationProps<T> {
  table: TanstackTable<T>;
}

function DataPagination<T>({ table }: DataPaginationProps<T>) {
  return (
    <div className='flex items-center justify-end space-x-2 py-4'>
      <div className='space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          이전
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default DataPagination;
