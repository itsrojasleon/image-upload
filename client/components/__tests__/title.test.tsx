import { render } from '@testing-library/react';
import Title from '../title';

describe('Title Component', () => {
  it('renders a title component with the correct text', () => {
    const { getByText } = render(<Title>Hello</Title>);

    expect(getByText(/hello/i)).toBeInTheDocument();
  });
});
