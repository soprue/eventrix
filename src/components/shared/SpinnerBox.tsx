import Spinner from './Spinner';

interface SpinnerBoxProps {
  className?: string;
}

function SpinnerBox({
  className = ' mobile:min-h-[calc(100dvh-56px)] min-h-[calc(100dvh-64px)]',
}: SpinnerBoxProps) {
  return (
    <div
      role='status'
      className={`${className} flex w-full items-center justify-center`}
    >
      <Spinner />
    </div>
  );
}

export default SpinnerBox;
