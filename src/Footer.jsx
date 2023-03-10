import { Link } from 'react-router-dom';
import { useStates } from './utilities/states';

export default function Footer() {

  const s = useStates('main');
  let routes = [...s.menu].filter(x => x.path);
  s.menu.filter(x => x.sub).forEach(x => routes = [...routes, ...x.sub]);

  return <>
    <div className="row">
      <div className="offset-8 col-4 d-none d-lg-block">
        <img className="hill" src="/images/logos/nodehill-hill.png" />
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-5 col-lg-4 text-dark px-5 position-relative">
        <address>
          <p><b>Node Hill AB</b></p>
          <p>Kyrkogatan 21</p>
          <p>222 22 LUND, Sverige</p>
          <p>Org-nr: 559028-9459</p>
          <p className="mt-2"><b>Tel:</b> +46 (0) 79 313 62 44</p>
          <p className="mt-2"><b>Email:</b> <a href="mailto:info@nodehill.com">info@nodehill.com</a></p>
          <p className="mt-2"><a href="https://www.linkedin.com/company/78601480" target="_blank"><img src="/images/logos/linked-in.svg" /></a></p>
        </address>
        <Link className="logo position-absolute d-block d-md-none" to="/">
          <img src="/images/logos/nodehill-logo-text-green-vertical.jpg" />
        </Link>
      </div>
      <div className="col-12 col-md-7 col-lg-4 mt-3 m-md-0 text-dark px-5 position-relative">
        <p><b>Pages:</b></p>
        <nav>
          {routes.map(({ path, label, parent }) => <p><Link to={path}>{parent && ((" " || parent.label) + ' ')}{label}</Link></p>)}
        </nav>
        <Link className="logo position-absolute d-none d-md-block d-lg-none" to="/">
          <img className="" src="/images/logos/nodehill-logo-text-green-vertical.jpg" />
        </Link>
      </div>
      <div className="d-none d-lg-block col-lg-4 text-dark px-5 text-end position-relative">
        <Link to="/">
          <img className="d-none d-lg-block" src="/images/logos/nodehill-logo-text-green.jpg" />
        </Link>
      </div>
    </div>
  </>;
}