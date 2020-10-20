import Router from 'next/router';
import Title from '../../components/title';
import { Form, Field } from '../../components/form';
import { useRequest } from '../../hooks/use-request';

const Signin = () => {
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  return (
    <>
      <Title>Signin</Title>
      <Form
        initialValues={{ email: '', password: '' }}
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
      </Form>
    </>
  );
};

export default Signin;
