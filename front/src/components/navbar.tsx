import { Nav, Navbar, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

export const NavBar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const showBtn = location.pathname == "/dashboard";
  return (
    <>
      <Navbar fixed="top" expand="lg" className="border-bottom shadow-sm bg-dark vw-100 p-3">
        <Navbar.Brand
          href="https://sebastianmolina.netlify.app/"
          target="_blank"
          className="fw-bold text-secondary"
        >
          Portfolio
        </Navbar.Brand>

        <Nav className="ms-auto">
          {showBtn && (
            <Button className="" onClick={logout}>
              Salir
            </Button>
          )}
        </Nav>
      </Navbar>
    </>
  );
};
