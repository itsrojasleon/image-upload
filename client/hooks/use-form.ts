import { useState, useReducer } from 'react';
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

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      // Let's handle input files
      dispatch({ [e.currentTarget.name]: e.currentTarget.files[0] });
    } else {
      // Let's handle regular inputs
      dispatch({ [e.currentTarget.name]: e.currentTarget.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values['imageUrl']) {
      setIsUploading(true);
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

      // Save a fragment of text to reference where the bucket is
      // Do not save the image directly within the database
      values['imageUrl'] = key;

      onSubmit({ ...values });
      setIsUploading(false);
    } else {
      onSubmit({ ...values });
    }
  };

  return { values, handleChange, handleSubmit, isUploading };
};
