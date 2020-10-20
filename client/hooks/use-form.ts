import { useReducer } from 'react';

const reducer = (state, newState) => ({ ...state, ...newState });

export const useForm = ({
  initialValues,
  onSubmit
}: {
  initialValues: { [key: string]: string };
  onSubmit: (...params) => void | Promise<void>;
}) => {
  const [values, dispatch] = useReducer(reducer, initialValues);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...values });
  };

  return { values, handleChange, handleSubmit };
};
