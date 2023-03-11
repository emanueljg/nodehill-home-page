import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation } from 'react-router-dom';
import { useStates } from '../utilities/states';

export default function NavMenu() {

  const s = useStates('main');
  const { pathname: active } = useLocation();

  return <Navbar collapseOnSelect expand="lg" className="py-1 pt-2">
    <Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {s.menu.map(({ path, label, sub, parent }) => !sub ?
            <Link className={'nav-link' + (active === path ? ' active' : '')} to={path}>{label}</Link> :
            <NavDropdown title={label} className={sub.find(x => x.path === active) && 'active'}>
              {sub.map(({ path, label }) => <Link className={'dropdown-item' + (active === path ? ' active' : '')} to={path}>{label}</Link>)}
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>;
}