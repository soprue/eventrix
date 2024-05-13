import { DateRange } from 'react-day-picker';

import { FilterType } from '@/types/event';

interface EventFilterButtonProps {
  label: FilterType;
  onClick: () => void;
  selectedFilter: string | string[] | DateRange | undefined;
}

function EventFilterButton({
  label,
  onClick,
  selectedFilter,
}: EventFilterButtonProps) {
  const getFilterItems = (selectedFilter: string[], defaultText: string) => {
    if (selectedFilter.length === 0) return defaultText;
    else if (selectedFilter.length === 1) return selectedFilter[0];
    else return `${selectedFilter[0]} 외 ${selectedFilter.length - 1}`;
  };

  let selectedFilterLabel = '';
  if (label === '카테고리')
    selectedFilterLabel = getFilterItems(selectedFilter as string[], '전체');
  else if (label === '가격') selectedFilterLabel = selectedFilter as string;

  return (
    <button
      className='flex h-full items-center gap-3 rounded-full border px-4 py-3 text-sm mobile:gap-1.5 mobile:px-3 mobile:text-sm'
      onClick={onClick}
      data-cy={`filter-button-${label}`}
    >
      <span className='text-text-normal'>{label}</span>
      <span className='font-bold mobile:font-semibold'>
        {selectedFilterLabel}
      </span>
    </button>
  );
}

export default EventFilterButton;
