interface InputTitleProps {
  title: React.ReactNode;
}

function InputTitle({ title }: InputTitleProps) {
  return (
    <p className='py-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
      {title}
    </p>
  );
}

export default InputTitle;
