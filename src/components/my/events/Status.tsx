import { useState } from 'react';

import RightArrow from '@assets/images/icons/RightArrow.svg';
import StatusItem from './StatusItem';

const statusMenus = [
  '모집 준비',
  '모집 진행',
  '모집 마감',
  '행사 진행',
  '행사 종료',
];

function Status() {
  const [status, setStatus] = useState(statusMenus[0]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-center rounded-lg border border-line-normal bg-background-tertiary py-[22px]">
        <ul className="flex gap-9">
          {statusMenus.map((menu, idx) => {
            return (
              <>
                {idx > 0 && idx < statusMenus.length && (
                  <img src={RightArrow} alt="RightArrow" />
                )}
                <StatusItem
                  key={menu}
                  text={menu}
                  count={0}
                  active={status === menu}
                  onClick={() => handleStatusChange(menu)}
                />
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Status;
