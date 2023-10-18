import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  console.log(user);
  return (
    <Container>
      <h1 className="my-3">Login</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setUser(userInput);
          navigate("/");
        }}
      >
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name (any name)"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="remember">
          <Form.Check type="checkbox" label="remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}
