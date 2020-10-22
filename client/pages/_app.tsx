import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, QueryCache, ReactQueryCacheProvider } from 'react-query';
import { fetcher } from '../api/fetcher';
import Header from '../components/header';
import Spinner from '../components/spinner';

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {
  const { isLoading, error, data } = useQuery(
    'user',
    async () => await fetcher('api/users/currentuser')
  );

  if (isLoading) return <Spinner />;
  if (error) return 'An error has occurred: ' + error;

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Header currentUser={data.data.user} />
      <div className="container">
        <Component {...pageProps} currentUser={data.data.user} />
      </div>
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
