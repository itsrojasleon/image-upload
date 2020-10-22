import { render } from '@testing-library/react';
import { Card, CardImage, CardBody, CardTitle, CardText } from '../card';

describe('Card Component', () => {
  it('renders a Card component with some children', () => {
    render(<Card>hello there</Card>);
  });

  it('renders a CardImage component', () => {
    const { container } = render(<CardImage src="image-url" alt="image-alt" />);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <img
        alt="image-alt"
        class="card-img-top"
        src="image-url"
      />
    `);
  });

  it('renders a CardBody component', () => {
    const { container } = render(
      <CardBody>
        <h1>Hello</h1>
      </CardBody>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="card-body"
      >
        <h1>
          Hello
        </h1>
      </div>
    `);
  });

  it('renders a CardTitle component', () => {
    const { container } = render(<CardTitle>Hello</CardTitle>);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <h3
        class="card-title"
      >
        Hello
      </h3>
    `);
  });

  it('renders a CardText component', () => {
    const { container } = render(<CardText>Hello</CardText>);

    expect(container.firstChild).toMatchInlineSnapshot(`
      <p
        class="card-text"
      >
        Hello
      </p>
    `);
  });
});
