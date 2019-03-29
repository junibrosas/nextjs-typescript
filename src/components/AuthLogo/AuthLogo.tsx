import Link from 'next/link';

const AuthLogo = () => (
  <div className="logo mb-5">
    <Link href="/">
      <a>
        <img src="/static/img/logo.png" alt="Application Logo" className="img-fluid" />
      </a>
    </Link>
  </div>
);

export default AuthLogo;