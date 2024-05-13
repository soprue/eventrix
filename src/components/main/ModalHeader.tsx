import { GrPowerReset } from 'react-icons/gr';
import { IoMdClose } from 'react-icons/io';

interface ModalHeaderProps {
  title: string;
  number?: number;
  onClose: () => void;
  onReset: () => void;
}

function ModalHeader({ title, number, onClose, onReset }: ModalHeaderProps) {
  return (
    <div className='flex justify-between border-b border-border px-6 py-4 mobile:px-4'>
      <div
        className='flex cursor-pointer items-center justify-center gap-2 mobile:gap-1'
        onClick={onReset}
      >
        <GrPowerReset />
        <span className='text-[13px] font-medium'>초기화</span>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-[20px] font-medium tablet:text-lg mobile:text-base'>
          {title}
        </p>
        {number && (
          <span className='flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white tablet:size-6 mobile:size-4 mobile:text-xs mobile:font-semibold'>
            {number}
          </span>
        )}
      </div>
      <div className='flex cursor-pointer items-center'>
        <IoMdClose onClick={onClose} size={20} />
      </div>
    </div>
  );
}

export default ModalHeader;
