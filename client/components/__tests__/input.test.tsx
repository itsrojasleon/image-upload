import { fireEvent, render } from '@testing-library/react';
import Input from '../input';

describe('Input Component', () => {
  it('renders an input component with valid props', () => {
    render(
      <Input
        name="email"
        label="email"
        onChange={jest.fn()}
        aria-label="email-input"
      />
    );
  });

  it('changes values via the fireEvent.change method', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Input
        name="email"
        label="email"
        onChange={handleChange}
        aria-label="email-input"
      />
    );

    const input = getByLabelText(/email/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test@test.com' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('test@test.com');
  });
});
