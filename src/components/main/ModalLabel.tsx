interface ModalCategoryProps {
  value: string;
  label: string;
  active?: boolean;
  onClick: (categoryValue: string) => void;
}

function ModalLabel({ value, label, active, onClick }: ModalCategoryProps) {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <button
      className={`tablet:py-2 tablet:px-3 flex items-center justify-center gap-1.5 rounded-full border border-border px-4 py-3 text-sm font-medium ${
        active
          ? 'border-primary bg-primary text-white'
          : 'bg-white text-gray-500'
      }`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default ModalLabel;
