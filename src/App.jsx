import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";
import Login from "./pages/Login";
import { AuthContext } from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";

function Layout({ user, setUser }) {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Todos App</Navbar.Brand>
          <Nav className="ms-auto">
            {user && <Nav.Link href="/add">Add Todos</Nav.Link>}
            {user ? (
              <Nav.Link
                className="text-danger"
                href="/login"
                onClick={() => setUser("")}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link className="text-primary" to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [user, setUser] = useLocalStorage("user", "");
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <TodoContext.Provider value={{ todos, setTodos }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout user={user} setUser={setUser} />}>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path="/add"
                element={
                  <RequireAuth>
                    <AddTodo />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/todo/:id" element={<EditTodo />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TodoContext.Provider>
    </AuthContext.Provider>
  );
}
