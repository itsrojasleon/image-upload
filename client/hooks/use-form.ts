import { useReducer } from 'react';

interface Params {
  initialValues: { [key: string]: string };
  onSubmit?: (params: { [key: string]: string }) => void | Promise<void>;
}

export const useForm = ({ initialValues, onSubmit }: Params) => {
  const [values, dispatch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialValues
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit({ ...values });
    }
  };

  return { values, handleChange, handleSubmit };
};
