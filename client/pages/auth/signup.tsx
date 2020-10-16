import Router from 'next/router';
import Title from '../../components/title';
import Form from '../../components/form';
import { useRequest } from '../../hooks/use-request';

const Signup = () => {
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  return (
    <>
      <Title>Signup</Title>
      <Form
        initialValues={{
          email: '',
          password: '',
          username: ''
        }}
        onSubmit={doRequest}
        errors={errors}
      />
    </>
  );
};

export default Signup;
