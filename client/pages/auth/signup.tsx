import Router from 'next/router';
import Title from '../../components/title';
import Input from '../../components/input';
import { useInputText } from '../../hooks/use-input-text';
import { useRequest } from '../../hooks/use-request';

const Signup = () => {
  const email = useInputText('');
  const password = useInputText('');
  const username = useInputText('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    onSuccess: () => Router.push('/')
  });

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    doRequest({
      email: email.value,
      password: password.value,
      username: username.value
    });
  };

  return (
    <>
      <Title>Signup</Title>
      <form onSubmit={onSubmit}>
        <Input
          label="email"
          name="email"
          placeholder="Enter an email"
          aria-label="email-input"
          {...email}
        />
        <Input
          type="password"
          label="password"
          name="password"
          placeholder="Enter a password"
          aria-label="password-input"
          {...password}
        />
        <Input
          label="username"
          name="username"
          placeholder="Enter an username"
          aria-label="username-input"
          {...username}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {errors}
      </form>
    </>
  );
};

export default Signup;
