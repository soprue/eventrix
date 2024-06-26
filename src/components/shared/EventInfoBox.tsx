interface EventInfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

function EventInfoBox({ children, className = '' }: EventInfoBoxProps) {
  return (
    <div
      className={`${className} flex w-full flex-col gap-2 border-b border-t border-border px-2 py-6 mobile:px-1 mobile:py-4`}
    >
      {children}
    </div>
  );
}

export default EventInfoBox;
