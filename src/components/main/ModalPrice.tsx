import { Dispatch, SetStateAction, useState } from 'react';

import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Label } from '@components/ui/label';
import ModalLayout from './ModalLayout';
import ModalHeader from './ModalHeader';

import { PriceFilterType } from '@/types/Event';

interface ModalProps {
  data: PriceFilterType;
  setData: Dispatch<SetStateAction<PriceFilterType>>;
  onClose: () => void;
}

function ModalPrice({ data, setData, onClose }: ModalProps) {
  const [tempData, setTempData] = useState<PriceFilterType>(data);

  const onReset = () => {
    setTempData('전체');
  };

  const onApply = () => {
    setData(tempData);
    onClose();
  };

  const handleChange = (value: PriceFilterType) => {
    setTempData(value);
  };

  return (
    <ModalLayout onApply={onApply} onClose={onClose}>
      <ModalHeader title='가격' onClose={onClose} onReset={onReset} />
      <div className='flex flex-wrap gap-3 pb-6'>
        <RadioGroup defaultValue='전체' className='flex gap-10'>
          {['전체', '유료', '무료'].map(item => (
            <div key={item} className='flex items-center space-x-2'>
              <RadioGroupItem
                value={item}
                id={`radio-${item}`}
                checked={tempData === item}
                onClick={() => handleChange(item as PriceFilterType)}
              />
              <Label htmlFor={`radio-${item}`} className='cursor-pointer'>
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </ModalLayout>
  );
}

export default ModalPrice;
