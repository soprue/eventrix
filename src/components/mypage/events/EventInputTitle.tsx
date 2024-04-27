interface EventInputTitleProps {
  title: React.ReactNode;
}

function EventInputTitle({ title }: EventInputTitleProps) {
  return (
    <p className='py-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
      {title}
    </p>
  );
}

export default EventInputTitle;
