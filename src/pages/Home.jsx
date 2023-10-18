import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import TodoCard from "../components/TodoCard";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const todos = useContext(TodoContext).todos;
  const user = useContext(AuthContext).user;

  return (
    <Container>
      <h1 className="my-3">Hi, {user}</h1>
      <h3>welcome to my todo app</h3>
      <br></br>
      {!todos.find((todo) => todo.user === user) && <p>Add your todo !</p>}
      <Row>
        <CardGroup todos={todos} />
      </Row>
    </Container>
  );
}

function CardGroup({ todos }) {
  const user = useContext(AuthContext).user;

  return todos
    .filter((todo) => todo.user === user)
    .map((todo) => {
      return (
        <Col md={6} xxl={4} key={todo.id}>
          <TodoCard todo={todo} />
        </Col>
      );
    });
}
