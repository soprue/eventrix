import { Dispatch, SetStateAction } from 'react';

import StatusItem from './StatusItem';

import RightArrow from '@assets/images/icons/RightArrow.svg';
import { StatusMenuType, STATUS_MENU } from '@constants/eventStatusMenus';

interface StatusProps {
  statuses: string[];
  status: string | null;
  setStatus: Dispatch<SetStateAction<StatusMenuType | null>>;
}

function Status({ statuses, status, setStatus }: StatusProps) {
  const statusCounts = statuses.reduce(
    (counts, status) => {
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    },
    {} as Record<string, number>,
  );

  const handleStatusChange = (newStatus: StatusMenuType) => {
    if (status === newStatus) {
      setStatus(null);
    } else {
      setStatus(newStatus);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='border-line-normal bg-background-tertiary flex w-full justify-center rounded-lg border py-[22px]'>
        <ul className='flex gap-9'>
          {STATUS_MENU.map((menu, idx) => {
            return (
              <li key={menu} className='flex gap-9'>
                <StatusItem
                  text={menu}
                  count={statusCounts[menu] || 0}
                  active={status === menu}
                  onClick={() => handleStatusChange(menu)}
                />
                {idx != STATUS_MENU.length - 1 && (
                  <img src={RightArrow} alt='RightArrow' />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Status;
