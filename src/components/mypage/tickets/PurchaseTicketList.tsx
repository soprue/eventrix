import { Dispatch, SetStateAction } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination';
import PurchaseTicketBox from './PurchaseTicketBox';

import { PurchaseTicketType } from '@/types/ticket';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';

interface PurchaseTicketListProps {
  events: PurchaseTicketType[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
}

function PurchaseTicketList({
  events,
  page,
  setPage,
  hasNextPage,
}: PurchaseTicketListProps) {
  const { openAlert } = useGlobalAlertStore();

  const handlePrevPage = () => {
    if (page > 0) setPage(prev => prev - 1);
    else openAlert('첫 페이지입니다.', '');
  };
  const handleNextPage = () => {
    if (hasNextPage) setPage(prev => prev + 1);
    else openAlert('마지막 페이지입니다.', '');
  };

  return (
    <div>
      <div className='mb-24 flex flex-col gap-6 tablet:mb-20 mobile:mb-14'>
        {events.map((event: PurchaseTicketType) => (
          <PurchaseTicketBox key={event.id} event={event} page={page} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{page + 1}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PurchaseTicketList;
