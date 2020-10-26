import 'bootstrap/dist/css/bootstrap.min.css';
import { fetcher } from '../api/fetcher';
import Header from '../components/header';

function MyApp({ Component, pageProps, user }) {
  return (
    <>
      <Header currentUser={user} />
      <div className="container">
        <Component {...pageProps} currentUser={user} />
      </div>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  if (typeof window === 'undefined') {
    const { data } = await fetcher.get('/api/users/currentuser', {
      headers: appContext.ctx.req.headers
    });

    return { user: data.user };
  } else {
    const { data } = await fetcher.get('/api/users/currentuser');
    return { user: data.user };
  }
};

export default MyApp;
