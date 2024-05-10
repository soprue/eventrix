import { commaizeNumber } from '@toss/utils';

import { RadioGroupItem } from '@components/ui/radio-group';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import { TicketOptionType } from '@/types/event';

interface TicketOptionBoxProps {
  option: TicketOptionType;
  setTicketQuantity: (value: string) => void;
}

function TicketOptionBox({ option, setTicketQuantity }: TicketOptionBoxProps) {
  const handleQuantityChange = (value: string) => {
    setTicketQuantity(value);
  };

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-8'>
        <RadioGroupItem
          value={option.id}
          id={option.id}
          data-cy='ticket-option-input'
        />
        <Label htmlFor={option.id} className='!font-normal'>
          <p className='text-sm'>₩ {commaizeNumber(option.price)}</p>
          <p className='mobile:text-base text-lg'>{option.optionName}</p>
        </Label>
      </div>
      <div>
        <Select defaultValue='1' onValueChange={handleQuantityChange}>
          <SelectTrigger
            className='mobile:w-[80px] w-[100px]'
            data-cy='ticket-quantity-trigger'
          >
            <SelectValue placeholder='1' data-cy='ticket-quantity-display' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='1' data-cy='ticket-quantity-item'>
                1
              </SelectItem>
              <SelectItem value='2'>2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default TicketOptionBox;
