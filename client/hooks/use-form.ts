import { useReducer } from 'react';
import { fetcher } from '../api/fetcher';

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
    if (e.currentTarget.files?.length) {
      // Let's handle input files
      dispatch({ [e.currentTarget.name]: e.currentTarget.files[0] });
    } else {
      // Let's handle regular inputs
      dispatch({ [e.currentTarget.name]: e.currentTarget.value });
    }
  };
  // console.log(values);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values['imageUrl']) {
      const {
        data: { url, key }
      } = await fetcher.get('/api/upload');

      // Save image on the aws s3 bucket
      await fetcher.put(url, values['imageUrl'], {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': values['imageUrl'].type
        }
      });

      values['imageUrl'] = key;

      onSubmit({ ...values });
    } else {
      onSubmit({ ...values });
    }
  };

  return { values, handleChange, handleSubmit };
};
