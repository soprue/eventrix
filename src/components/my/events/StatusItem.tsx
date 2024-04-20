interface StatusItemProps {
  text: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

function StatusItem({ text, count, active, onClick }: StatusItemProps) {
  return (
    <li
      className="flex cursor-pointer flex-col items-center justify-center gap-3"
      onClick={onClick}
    >
      <span className={`leading-4 ${active ? 'text-black' : 'text-gray-300'}`}>
        {text}
      </span>
      <span
        className={`text-title font-bold leading-7  ${
          active ? 'text-black' : 'text-gray-300'
        }`}
      >
        {count}
      </span>
    </li>
  );
}

export default StatusItem;
