import { Dispatch, SetStateAction, useState } from 'react';

import ModalLayout from './ModalLayout';
import ModalHeader from './ModalHeader';
import ModalLabel from './ModalLabel';

import { CATEGORIES } from '@constants/categories';
import { useGlobalAlertStore } from '@store/useGlobalAlertStore';

const categories = ['전체', ...Object.keys(CATEGORIES)];

interface ModalProps {
  data: string[];
  setData: Dispatch<SetStateAction<string[]>>;
  onClose: () => void;
}

function ModalCategory({ data, setData, onClose }: ModalProps) {
  const { openAlert } = useGlobalAlertStore();
  const [tempData, setTempData] = useState(data);

  const onReset = () => {
    setTempData([]);
  };

  const onApply = () => {
    setData(tempData);
    onClose();
  };

  const onClick = (value: string) => {
    if (value === '전체') {
      setTempData([]);
    } else {
      setTempData(prevData => {
        if (prevData.includes(value)) {
          return prevData.filter(item => item !== value);
        }
        if (prevData.length === 5) {
          openAlert('카테고리는 최대 5개까지 선택할 수 있습니다.', '');
          return prevData;
        }
        return [...prevData, value];
      });
    }
  };

  return (
    <ModalLayout onApply={onApply} onClose={onClose}>
      <ModalHeader
        title='카테고리'
        number={tempData.length === 0 ? 1 : tempData.length}
        onClose={onClose}
        onReset={onReset}
      />
      <div
        className='mobile:gap-1 flex flex-wrap gap-3'
        data-cy={`filter-modal-카테고리`}
      >
        {categories.map(category => (
          <ModalLabel
            key={category}
            value={category}
            label={category}
            active={
              tempData.length === 0
                ? category === '전체'
                : tempData.includes(category)
            }
            onClick={onClick}
          />
        ))}
      </div>
      <p className='mb-3 mt-4 text-xs font-medium text-gray-500 '>
        카테고리는 최대 5개까지 선택하실 수 있어요.
      </p>
    </ModalLayout>
  );
}

export default ModalCategory;
