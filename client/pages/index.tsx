import { useQuery } from 'react-query';
import Link from 'next/link';
import {
  Card,
  CardImage,
  CardBody,
  CardText,
  CardTitle
} from '../components/card';
import Title from '../components/title';
import { fetcher } from '../api/fetcher';

const Home = () => {
  const { isLoading, error, data } = useQuery(
    'posts',
    async () => await fetcher('/api/posts')
  );

  if (isLoading) return 'Loading';
  if (error) return 'An error has occurred: ' + error;

  return (
    <div className="container">
      <Title>Posts</Title>
      <div className="row justify-content-md-center">
        {data.data.map((post) => (
          <div key={post.id} className="col col-lg-6">
            <Card>
              <CardImage
                src={`https://upload-123.s3.us-east-2.amazonaws.com/${post.imageUrl}`}
                alt={post.title}
              />
              <CardBody>
                <CardTitle>{post.title}</CardTitle>
                <CardText>{post.description}</CardText>
                <Link
                  href="/users/[userId]"
                  as={`/users/${post.user.username}`}>
                  <a>{post.user.username}</a>
                </Link>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
