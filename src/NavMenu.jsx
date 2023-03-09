import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { useStates } from './utilities/states';

export default function NavMenu() {

  const s = useStates('main');

  return (
    <>
      <Container fluid className="logo">
        <div className="row">
          <div className="col text-center">
            <img className="d-inline-block" src="/images/nodehill.jpg" />
          </div>
        </div>
      </Container>
      <Navbar collapseOnSelect expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {s.menu.map(({ path, label, sub }) => !sub ?
                <NavLink className="nav-link" to={path}>{label}</NavLink> :
                <NavDropdown title={label}>
                  {sub.map(({ path, label }) => <NavLink className="dropdown-item" to={path}>{label}</NavLink>)}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}