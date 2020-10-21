import Link from 'next/link';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { href: '/auth/signin', label: 'Signin' },
    !currentUser && { href: '/auth/signup', label: 'Signup' },
    currentUser && { href: '/posts', label: 'My Posts' },
    currentUser && { href: '/upload', label: 'Upload' },
    currentUser && { href: '/auth/signout', label: 'Signout' }
  ].filter((linkConfig) => linkConfig);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand mb-0 h1">Image upload</a>
        </Link>
        <div className="d-flex">
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            {links.map(({ href, label }, idx) => (
              <li key={label} className="nav-item">
                <Link href={href}>
                  {idx === links.length - 1 ? (
                    <a className="btn btn-outline-primary" type="submit">
                      {label}
                    </a>
                  ) : (
                    <a
                      className="nav-link"
                      style={{ marginRight: '15px' }}
                      aria-current="page">
                      {label}
                    </a>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
