import { render } from '@testing-library/react';
import Spinner from '../spinner';

describe('Spinner Component', () => {
  it('renders a Spinner component', () => {
    render(<Spinner />);
  });

  it('has a element with the role as status', () => {
    const { getByRole } = render(<Spinner />);

    expect(getByRole(/status/i)).toBeDefined();
  });
});
