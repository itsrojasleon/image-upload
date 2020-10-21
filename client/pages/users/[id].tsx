import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { fetcher } from '../../api/fetcher';

const User = () => {
  const router = useRouter();
  const id = router.query.id || [];

  const { isLoading, error, data } = useQuery('user', async () =>
    fetcher.get(`/api/posts/${id}`)
  );

  if (isLoading) return 'Loading';
  if (error) return 'An error has occurred: ' + error;

  return <div>{id}</div>;
};

export default User;
