import Router from 'next/router';
import Title from '../components/title';
import { Form, Field } from '../components/form';
import { useRequest } from '../hooks/use-request';
import { useEffect } from 'react';

const Upload = ({ currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/posts',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    if (!currentUser) {
      Router.push('/');
    }
  }, []);

  return (
    <div>
      <Title>Create a post</Title>
      <Form
        initialValues={{ title: '', description: '' }}
        onSubmit={doRequest}
        errors={errors}>
        <Field
          label="title"
          aria-label="title-input"
          placeholder="enter a title"
        />
        <Field
          label="description"
          aria-label="description-input"
          placeholder="enter a description"
        />
        <Field
          label="imageUrl"
          aria-label="image-url-input"
          placeholder="enter an image"
          accept="image/*"
          type="file"
        />
      </Form>
    </div>
  );
};

export default Upload;
