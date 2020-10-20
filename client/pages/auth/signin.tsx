import Router from 'next/router';
import Title from '../../components/title';
import Input from '../../components/input';
import { useInputText } from '../../hooks/use-input-text';
import { useRequest } from '../../hooks/use-request';

const Signin = () => {
  const email = useInputText('');
  const password = useInputText('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    doRequest({
      email: email.value,
      password: password.value
    });
  };

  return (
    <>
      <Title>Signin</Title>
      <form onSubmit={onSubmit}>
        <Input
          label="email"
          name="email"
          placeholder="enter an email"
          aria-label="email-input"
          {...email}
        />
        <Input
          type="password"
          label="password"
          name="password"
          placeholder="enter a password"
          aria-label="password-input"
          {...password}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {errors}
      </form>
    </>
  );
};

export default Signin;
