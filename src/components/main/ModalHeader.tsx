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
    <div className='flex justify-between border-b border-border px-6 py-4'>
      <div
        className='flex cursor-pointer items-center justify-center gap-2'
        onClick={onReset}
      >
        <GrPowerReset />
        <span className='text-[13px] font-medium'>초기화</span>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-text-normal tablet:text-lg text-[20px] font-medium'>
          {title}
        </p>
        {number && (
          <span className='tablet:size-6 mobile:font-semibold flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white'>
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
