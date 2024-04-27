import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';

import { EventType } from '@/types/event';
import { deleteEvent } from '@services/eventService';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';
import { useMutation, useQueryClient } from 'react-query';
import usePrefetchEvent from '@/hooks/usePrefetchEvent';

interface EventTableProps {
  data: EventType[];
}

function EventTable({ data }: EventTableProps) {
  const queryClient = useQueryClient();
  const { openAlert } = useGlobalAlertStore();
  const prefetchEvent = usePrefetchEvent();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<EventType>[] = [
    {
      id: '썸네일',
      accessorKey: 'thumbnail',
      header: '',
      cell: ({ row }) => (
        <div className='h-[50px] w-[150px] overflow-hidden rounded-md'>
          <img
            src={row.original.thumbnail as string}
            alt='Thumbnail'
            className='size-full object-cover'
          />
        </div>
      ),
    },
    {
      id: '이벤트 이름',
      accessorKey: 'name',
      header: '이벤트 이름',
      cell: ({ row }) => {
        return (
          <div className='capitalize'>
            <Link
              to={`/event/${row.original.uid}`}
              onMouseEnter={() => prefetchEvent(row.original.uid!)}
            >
              {row.original.name}
            </Link>
          </div>
        );
      },
    },
    {
      id: '상태',
      header: '상태',
      cell: ({ row }) => (
        <div>
          <Badge variant='outline'>{row.original.status}</Badge>
        </div>
      ),
    },
    {
      id: '판매율',
      header: '판매율',
      cell: ({ row }) => {
        const totalTickets = row.original.ticketOptions.reduce(
          (sum, option) => sum + option.scheduledCount,
          0,
        );
        const soldTickets = row.original.ticketOptions.reduce(
          (sum, option) => sum + option.soldCount,
          0,
        );
        const salesRate = ((soldTickets / totalTickets) * 100).toFixed(2);
        return `${soldTickets}/${totalTickets} (${salesRate}%)`;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <Link
                  to={`/mypage/events/edit?id=${row.original.uid}`}
                  className='w-full'
                >
                  수정하기
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteEvent(row.original.uid as string)}
              >
                삭제하기
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const deleteEventMutation = useMutation(deleteEvent, {
    onSuccess: result => {
      if (result.success) {
        openAlert('이벤트가 삭제되었습니다.', '');
        queryClient.invalidateQueries('myEvents');
      } else {
        openAlert(
          '오류가 발생했습니다. 다시 시도해 주세요.',
          result.error as string,
        );
      }
    },
    onError: error => {
      openAlert('다시 시도해 주세요.', error as string);
    },
  });

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('이 이벤트를 삭제하시겠습니까?')) {
      deleteEventMutation.mutate(eventId);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='이름으로 검색'
          value={
            (table.getColumn('이벤트 이름')?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn('이벤트 이름')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              보기 <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  등록된 이벤트가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
    </div>
  );
}

export default EventTable;
