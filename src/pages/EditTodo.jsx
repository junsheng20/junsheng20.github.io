import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

export default function EditTodo() {
  const id = useParams().id;
  const todos = useContext(TodoContext).todos;
  const currentTodo = todos.find((todo) => todo.id === id);
  const navigate = useNavigate();
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description);
  const [completed, setCompleted] = useState(currentTodo.completed);
  const setTodos = useContext(TodoContext).setTodos;
  const editTodo = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title, description, completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
    navigate("/");
  };

  return (
    <Container>
      <h1 className="my-3">Edit Todo</h1>
      <Form onSubmit={editTodo}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Get a software developer job"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            rows={3}
            placeholder={`1.Create amazing projects\n2.Apply to Google & Netflix\n3.Crush interview`}
            required
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          id="completed"
          label="Mark as completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mb-3"
        />
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}
