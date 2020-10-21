const Card: React.FC = ({ children }) => <div className="card">{children}</div>;

const CardImage = ({ src, alt }: { src: string; alt: string }) => (
  <img className="card-img-top" src={src} alt={alt} />
);

const CardBody: React.FC = ({ children }) => (
  <div className="card-body">{children}</div>
);

const CardTitle: React.FC = ({ children }) => (
  <h5 className="card-title">{children}</h5>
);

const CardText: React.FC = ({ children }) => (
  <p className="card-text">{children}</p>
);

export { Card, CardImage, CardBody, CardTitle, CardText };
