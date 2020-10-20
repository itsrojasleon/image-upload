import Router from 'next/router';
import Title from '../../components/title';
import { Form, Field } from '../../components/form';
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
        initialValues={{ email: '', password: '', username: '' }}
        onSubmit={doRequest}
        errors={errors}>
        <Field
          aria-label="email-input"
          label="email"
          placeholder="enter an email"
        />
        <Field
          aria-label="password-input"
          label="password"
          placeholder="enter a password"
          type="password"
        />
        <Field
          aria-label="username-input"
          label="username"
          placeholder="enter an username"
        />
      </Form>
    </>
  );
};

export default Signup;
