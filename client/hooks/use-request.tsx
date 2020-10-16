import axios from 'axios';
import { useState } from 'react';
import { fetcher } from '../api/fetcher';

interface Props {
  url: string;
  method: string;
  body?: any;
  onSuccess?: () => void;
}

export const useRequest = ({ url, method, body, onSuccess }: Props) => {
  const [errors, setErrors] = useState<null | JSX.Element>(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      const response = await fetcher[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess();
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
