interface EventInfoRowProps {
  size?: 'lg' | 'md' | 'sm';
  label: string;
  value: string;
}

function EventInfoRow({ size = 'lg', label, value }: EventInfoRowProps) {
  const fontSize =
    size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs';
  const fontWeight = size === 'lg' ? 'font-semibold' : 'font-medium';

  const tabletFontSize = size === 'lg' ? 'tablet:text-base' : fontSize;
  // const tabletFontWeight = size === 'lg' ? 'tablet:font-medium' : fontWeight;

  return (
    <div className={`${fontSize} ${tabletFontSize} mobile:text-sm flex`}>
      <span className='mobile:w-[50px] inline-block w-[70px]'>{label}</span>
      <span className={`${fontWeight} break-keep`}>{value}</span>
    </div>
  );
}

export default EventInfoRow;
