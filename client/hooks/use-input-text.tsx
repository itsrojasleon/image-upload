import { useState } from 'react';

export const useInputText = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return { value, onChange };
};
