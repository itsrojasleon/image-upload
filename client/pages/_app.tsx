import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query';
import { fetcher } from '../api/fetcher';
import Header from '../components/header';

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
  const { isLoading, error, data } = useQuery('user', async () => {
    const user = await fetcher('api/users/currentuser');
    return user;
  });

  if (isLoading) return 'Loading';
  if (error) return 'An error has occurred: ' + error;

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Header currentUser={data.data.user} />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
