interface EventInfoRowProps {
  size?: 'md' | 'sm';
  label: string;
  value: string;
}

function EventInfoRow({ size = 'md', label, value }: EventInfoRowProps) {
  const fontSize = size === 'md' ? 'text-base' : 'text-sm';

  return (
    <div className={`${fontSize} `}>
      <span className='inline-block w-[50px]'>{label}</span>
      <span className='font-semibold'>{value}</span>
    </div>
  );
}

export default EventInfoRow;
