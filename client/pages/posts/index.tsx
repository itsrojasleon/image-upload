import { useQuery } from 'react-query';
import {
  Card,
  CardImage,
  CardBody,
  CardTitle,
  CardText
} from '../../components/card';
import Title from '../../components/title';
import { fetcher } from '../../api/fetcher';

const Posts = () => {
  const { isLoading, error, data } = useQuery(
    'myPosts',
    async () => await fetcher.get('/api/posts/me')
  );

  if (isLoading) return 'Loading';
  if (error) return 'An error has occurred: ' + error;

  return (
    <div>
      <Title>Posts</Title>
      {data.data.map((post) => (
        <div key={post.id} className="col col-lg-4">
          <Card>
            <CardImage
              src={`https://upload-123.s3.us-east-2.amazonaws.com/${post.imageUrl}`}
              alt={post.title}
            />
            <CardBody>
              <CardTitle>{post.title}</CardTitle>
              <CardText>{post.description}</CardText>
              <p>{post.user.username}</p>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Posts;
