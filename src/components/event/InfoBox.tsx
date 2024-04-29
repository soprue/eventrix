interface InfoBoxProps {
  children: React.ReactNode;
  className?: string;
}

function InfoBox({ children, className = '' }: InfoBoxProps) {
  return (
    <div
      className={`${className} flex w-full flex-col gap-2 border-b border-t border-border px-2 py-6`}
    >
      {children}
    </div>
  );
}

export default InfoBox;
