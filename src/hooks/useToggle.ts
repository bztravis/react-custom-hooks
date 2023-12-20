import { useState } from 'react';

export default function useToggle(defaultValue: boolean) {
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggleValue = (newValue?: boolean) => {
    setValue((prevValue) => newValue ?? !prevValue);
  };

  return [value, toggleValue] as const;
  // adding as const changes the return type of the hook from an array of union type to a readonly tuple of literal types
}
