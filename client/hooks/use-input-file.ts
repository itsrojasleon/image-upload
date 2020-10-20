import { useState } from 'react';

export const useInputFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files[0]);
  };

  return { file, onChange };
};
