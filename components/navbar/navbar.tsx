import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import styles from './navbar.module.css';

interface Props {
  appTitle?: string;
  routes?: string[];
}

const NavBar: React.FC<Props> = ({
  appTitle = 'Pokenext',
  routes = ['my-team'],
}) => {
  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container style={{ margin: '0 2rem' }}>
          <Navbar.Brand>
            <Link href="/" style={{ textDecoration: 'none', color: '#121212' }}>
              <Image
                width={30}
                height={30}
                src={'/svg/pokeball.svg'}
                alt="pokeball"
                className="d-inline-block align-top"
              />{' '}
              {appTitle}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {routes.map((route, index) => (
                <Link key={index} href={`/${route}`}>
                  <label className={styles.routeLabel}>{route}</label>
                </Link>
              ))}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
