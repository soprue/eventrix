import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { Badge } from '@components/ui/badge';
import DataTable from '@shared/mypage/DataTable';
import DataPagination from '@shared/mypage/DataPagination';
import DataDropdown from '@shared/mypage/DataDropdown';
import TicketStatusChanger from './TicketStatusChanger';

import { PurchaseTicketType } from '@/types/ticket';

interface TicketTableProps {
  data: PurchaseTicketType[];
}

function TicketTable({ data }: TicketTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<PurchaseTicketType>[] = [
    {
      id: '티켓 ID',
      accessorKey: 'id',
      header: '티켓 ID',
      cell: info => info.row.original.id,
    },
    {
      id: '참여자',
      accessorKey: 'buyerUID',
      header: '참여자',
      cell: ({ row }) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='cursor-pointer underline underline-offset-4'>
              {row.original.buyerNickname}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.original.buyerPhone}</p>
          </TooltipContent>
        </Tooltip>
      ),
    },
    {
      id: '티켓 옵션',
      accessorKey: 'ticketOptionName',
      header: '티켓 옵션',
      cell: info => info.row.original.ticketOptionName,
    },
    {
      id: '티켓 매수',
      accessorKey: 'quantity',
      header: '티켓 매수',
      cell: info => info.row.original.quantity,
    },
    {
      id: '상태',
      accessorKey: 'ticketStatus',
      header: '상태',
      cell: ({ row }) => (
        <>
          {row.original.ticketStatus === '현장 수령' ||
          row.original.ticketStatus === '취소' ? (
            <Badge
              variant='outline'
              className='flex h-8 w-fit cursor-default items-center justify-center rounded-md font-medium'
            >
              {row.original.ticketStatus}
            </Badge>
          ) : (
            <TicketStatusChanger
              id={row.original.id as string}
              status={row.original.ticketStatus}
            />
          )}
        </>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <TooltipProvider>
      <div className='w-full'>
        <div className='flex items-center py-4'>
          <Input
            placeholder='티켓 ID로 검색'
            value={
              (table.getColumn('티켓 ID')?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn('티켓 ID')?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
          <DataDropdown table={table} />
        </div>
        <DataTable table={table} columnsLength={columns.length} />
        <DataPagination table={table} />
      </div>
    </TooltipProvider>
  );
}

export default TicketTable;
