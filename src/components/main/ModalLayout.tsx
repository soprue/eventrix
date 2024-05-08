import { Children } from 'react';

interface ModalWrapProps {
  onApply: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalLayout({ onApply, children }: ModalWrapProps) {
  const [header, ...rest] = Children.toArray(children);

  return (
    <div className='border-line-normal absolute top-[calc(46px+16px)] z-[1] w-[600px] rounded-lg border bg-white shadow-[0_4px_8px_0_rgba(0,0,0,0.15)]'>
      {header}

      <div className='p-6'>
        {rest}
        <div className='border-line-normal flex w-full justify-end gap-2 border-t pt-6'>
          <button
            className='h-12 w-[140px] rounded-lg border border-primary bg-primary font-bold text-white'
            onClick={onApply}
            data-cy='apply-filter'
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalLayout;
