import { render } from '@testing-library/react';
import Header from '../header';

describe('Header Component', () => {
  it('it renders a header component with a currentuser prop', () => {
    render(<Header currentUser={{ user: null }} />);
  });

  it('has a logo link with the correct text', () => {
    const { getByText } = render(<Header currentUser={null} />);

    expect(getByText(/poster/i)).toHaveAttribute('href', '/');
  });

  it('shows two links when user is not authenticated', () => {
    const { getAllByText } = render(<Header currentUser={null} />);
    // Other two links to signup and signin
    expect(getAllByText(/sign/i)).toHaveLength(2);
  });

  it('shows two links when user is authenticated', () => {
    const { getAllByText } = render(
      <Header currentUser={{ email: 'test@test.com' }} />
    );

    expect(getAllByText(/upload/i)).toHaveLength(1);
    expect(getAllByText(/signout/i)).toHaveLength(1);
  });
});
