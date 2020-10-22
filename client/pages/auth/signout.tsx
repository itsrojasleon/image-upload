import Router from 'next/router';
import { useEffect } from 'react';
import { useRequest } from '../../hooks/use-request';

const Signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div>
      <h1>See ya! 👋</h1>
    </div>
  );
};

export default Signout;
