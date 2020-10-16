import { useEffect } from 'react';
import { useRequest } from '../../hooks/use-request';

const Signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post'
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div>
      <div>See you then! 👋</div>
    </div>
  );
};

export default Signout;
