interface PopoverProps {
  id: string;
  title: string;
  message: string;
  isArrow?: boolean;
  isVisible?: boolean;
}

export function Popover({
  id,
  title,
  message,
  isArrow = false,
  isVisible = false,
}: PopoverProps): JSX.Element {
  return isVisible ? (
    <div
      className="absolute z-10 min-w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white shadow rounded-3xl"
      id={id}
      role="tooltip"
    >
      <div className="px-3 py-2 bg-gray-100 rounded-t-lg">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="px-3 py-2">
        <p>{message}</p>
      </div>
      {isArrow && <div data-popper-arrow></div>}
    </div>
  ) : (
    <div></div>
  );
}
