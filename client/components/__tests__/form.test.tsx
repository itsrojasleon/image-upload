import { render, fireEvent } from '@testing-library/react';
import { Form, Field } from '../form';

describe('Form Component', () => {
  it('renders a Form component with the correct properties', () => {
    render(
      <Form initialValues={{ email: '' }} onSubmit={jest.fn()} errors={null}>
        <input />
      </Form>
    );
  });

  it('calls onSubmit function with some the correct values', () => {
    const handleSubmit = jest.fn();

    const { getByText, getByLabelText } = render(
      <Form initialValues={{ email: '' }} onSubmit={handleSubmit} errors={null}>
        <Field
          label="email"
          placeholder="enter an email"
          aria-label="email-input"
        />
      </Form>
    );

    const button = getByText(/submit/i) as HTMLButtonElement;
    const input = getByLabelText(/email-input/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test@test.com' } });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@test.com'
    });
    expect(input.value).toBe('test@test.com');
  });
});
