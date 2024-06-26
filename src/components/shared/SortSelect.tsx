import React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import { SortFilterType } from '@/types/event';

interface SortSelectProps {
  sort: SortFilterType;
  setSort: (value: SortFilterType) => void;
}

function SortSelect({ sort, setSort }: SortSelectProps) {
  return (
    <div
      className='flex items-center gap-[11px] mobile:gap-2'
      data-cy='sort-button'
    >
      <span className='text-gray-600 mobile:text-sm'>정렬방식</span>
      <Select onValueChange={(value: SortFilterType) => setSort(value)}>
        <SelectTrigger
          className='h-[46px] w-[100px] rounded-full mobile:h-8 mobile:w-[80px] mobile:text-sm'
          aria-label='정렬 방식 선택'
        >
          <SelectValue placeholder={`${sort}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='최신순'>최신순</SelectItem>
            <SelectItem value='인기순' data-cy='sort-button-인기순'>
              인기순
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default React.memo(SortSelect);
