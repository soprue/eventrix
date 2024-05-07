interface EventInfoRowProps {
  size?: 'lg' | 'md' | 'sm';
  label: string;
  value: string;
}

function EventInfoRow({ size = 'lg', label, value }: EventInfoRowProps) {
  const fontSize =
    size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs';
  const fontWeight = size === 'lg' ? 'font-semibold' : 'font-medium';

  return (
    <div className={`${fontSize}`}>
      <span className='inline-block w-[70px]'>{label}</span>
      <span className={`${fontWeight}`}>{value}</span>
    </div>
  );
}

export default EventInfoRow;