interface EventInfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

function EventInfoBox({ children, className = '' }: EventInfoBoxProps) {
  return (
    <div
      className={`${className} mobile:px-1 mobile:py-4 flex w-full flex-col gap-2 border-b border-t border-border px-2 py-6`}
    >
      {children}
    </div>
  );
}

export default EventInfoBox;
