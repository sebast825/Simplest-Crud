import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

function Register() {
  const { register } = useRegister();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [userName, setUserName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!validateUser()) return;

    await register(email, password, userName);
    
  }

  function validateUser(): boolean {
    if (password !== passwordRepeat) {
      alert("Las contraseñas no coinciden");
      return false; // retorna false si falla
    }
 if (!password  ) {
      alert("Las contraseñas no pueden estar vacia");
      return false; // retorna false si falla
    }
    if (!userName) {
      alert("El nombre de usuario es obligatorio");
      return false;
    }

    if (!validateEmail(email)) {
      alert("El email de usuario es inválido");
      return false;
    }

    return true; // todo bien
  }
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  return (
    <>
      <Row className=" justify-content-center align-items-center vh-100 vw-100 ">
        <Col md={4} className="p-4 border rounded-3 shadow-lg">
          <h2 className="text-center mb-2 text-primary">Crear Usuario</h2>
          <Form onSubmit={() => {}} className="d-flex flex-column ">
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="fw-bold"></Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="p-2"
              />
            </Form.Group>
            <Form.Group controlId="formBasicNombre">
              <Form.Label className="fw-bold"></Form.Label>

              <Form.Control
                type="text"
                placeholder="Ingresar nombre de usuario"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                className="p-2"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className=""></Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresar contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="p-2"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordRepeat">
              <Form.Label className=""></Form.Label>
              <Form.Control
                type="password"
                placeholder="Repetir contraseña"
                onChange={(e) => setPasswordRepeat(e.target.value)}
                value={passwordRepeat}
                className="p-2"
              />
            </Form.Group>
            <div className="mt-4 d-flex flex-column">
              <Button
                className=""
                onClick={(e) => handleSubmit(e)}
                variant="primary"
                type="submit"
              >
                Crear Usuario
              </Button>
            </div>
          </Form>
          <div className="mt-2 d-flex flex-column border-top pt-3">
            <Button
              onClick={() => navigate("/")}
              variant="secondary"
              type="submit"
            >
              Volver
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Register;
