import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import Modal from "react-bootstrap/Modal";

export default function TodoCard({ todo }) {
  const completed = todo.completed;
  const border = completed ? "success" : "danger";
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const setTodos = useContext(TodoContext).setTodos;
  const [modalShow, setModalShow] = useState(false);

  function startTimer() {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        console.log("running");
      }, 1000);
      setTimerInterval(intervalID);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    setTimerInterval(null);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(0);
  }

  function deleteTodo() {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
    );
  }

  function handleShow() {
    setModalShow(true);
  }

  function handleClose() {
    setModalShow(false);
  }

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header>{!completed && "Not"} Completed</Card.Header>
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <p>Timer: {timer} seconds</p>
          <Button onClick={startTimer}>
            <i className="bi bi-play"></i>
          </Button>
          <Button onClick={pauseTimer} className="ms-2">
            <i className="bi bi-pause-fill"></i>
          </Button>
          <Button onClick={resetTimer} className="ms-2">
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
          <Button variant="secondary" href={`todo/${todo.id}`} className="ms-2">
            <i className="bi bi-pencil"></i>
          </Button>
          <Button variant="danger" onClick={handleShow} className="ms-2">
            <i className="bi bi-trash3"></i>
          </Button>
        </Card.Body>
      </Card>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={modalShow} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Comfirm Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteTodo}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
