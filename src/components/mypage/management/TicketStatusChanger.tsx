import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import { changeTicketStatus } from '@services/eventService';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';

interface TicketStatusChangerProps {
  id: string;
  status: string;
}

function TicketStatusChanger({ id, status }: TicketStatusChangerProps) {
  const { openAlert } = useGlobalAlertStore();

  const handleStatusChange = (value: string) => {
    changeTicketStatus(id, value)
      .then(result => {
        if (result.success) {
          openAlert('티켓 상태가 변경되었습니다.', '');
        } else {
          openAlert('오류가 발생했습니다.', result.error as string);
        }
      })
      .catch(error => {
        openAlert('오류가 발생했습니다.', error);
      });
  };

  return (
    <Select
      defaultValue={status}
      onValueChange={value => handleStatusChange(value)}
    >
      <SelectTrigger className='h-8 w-[100px] !text-xs font-medium'>
        <SelectValue placeholder={status} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className='text-xs' value='배송 준비'>
            배송 준비
          </SelectItem>
          <SelectItem className='text-xs' value='배송 중'>
            배송 중
          </SelectItem>
          <SelectItem className='text-xs' value='배송 완료'>
            배송 완료
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default TicketStatusChanger;
