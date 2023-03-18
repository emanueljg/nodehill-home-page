import { Link } from 'react-router-dom';

export default function Logo() {
  return <Link to="/">
    <div className="logo container">
      <div className="row">
        <div className="col text-center text-lg-start">
          <img className="d-inline-block header-logo" src="/images/logos/nodehill-full.jpg" alt="Node Hill logo" />
          <img className="d-none header-logo-dark" src="/images/logos/nodehill-full-dmode.jpg" alt="Node Hill logo" />
        </div>
      </div>
    </div>
  </Link>;
}