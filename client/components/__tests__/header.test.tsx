import { render } from '@testing-library/react';
import Header from '../header';

describe('Header Component', () => {
  it('it renders a header component with a currentuser prop', () => {
    render(<Header currentUser={{ user: null }} />);
  });

  it('shows a logo link and two links when user is not authenticated', () => {
    const { getByText, getAllByText } = render(<Header currentUser={null} />);

    // Logo link
    expect(getByText(/image upload/i)).toHaveAttribute('href', '/');

    // Other two links to signup and signin
    expect(getAllByText(/sign/i)).toHaveLength(2);
  });
});
