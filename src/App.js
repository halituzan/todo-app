import { Card, Form, InputGroup } from "react-bootstrap";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillCloseCircle,
  AiFillSave,
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineLink,
} from "react-icons/ai";
import AddTodo from "./components/AddTodo";
import { useEffect, useState } from "react";
import { getData } from "./helpers/getData";
import { putData } from "./helpers/putData";
import { ToastContainer, toast } from "react-toastify";
import deleteDataWidthId from "./helpers/deleteData";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import { motivation } from "./helpers/conf";

function App() {
  const localMode = localStorage.getItem("Mode")
    ? localStorage.getItem("Mode")
    : "light";
  const [data, setData] = useState([]);
  const [editContent, setEditContent] = useState(false);
  const [addTodo, setAddTodo] = useState("");
  const [addedNewTodo, setAddedNewTodo] = useState(true);
  const [mode, setMode] = useState(localMode);

  const todoList = async () => {
    const todos = await getData();
    setData(todos);
  };
  const isCheck = async (e, content, index) => {
    const filteredTodo = data.filter((i) => i.id === content.id);
    if (e.target.checked) {
      filteredTodo[0].isCompleted = true;
    } else {
      filteredTodo[0].isCompleted = false;
    }
    await putData(filteredTodo[0]);
    addedNewTodo ? setAddedNewTodo(false) : setAddedNewTodo(true);
  };
  const isEdit = (e, content, index) => {
    const newTodo = [...data];
    const filteredTodo = data.filter((i) => i.id === content.id);
    filteredTodo[0].content = e.target.value;
    newTodo[index] = filteredTodo[0];
    setData(newTodo);
  };
  const sendNewContent = async (todo) => {
    if (todo.content.length < 3) {
      toast.error(
        "Your Todo List needs to be more than or equal to 3 characters"
      );
    } else {
      setEditContent(false);
      await putData(todo);

      addedNewTodo ? setAddedNewTodo(false) : setAddedNewTodo(true);
    }
  };
  const deleteTodo = async (todo) => {
    await deleteDataWidthId(todo.id);
    addedNewTodo ? setAddedNewTodo(false) : setAddedNewTodo(true);
  };
  useEffect(() => {
    const body = document.querySelector("body");
    if (mode === "dark") {
      body.style.background = "#121212";
    } else {
      body.style.background = "#fff";
    }
    todoList();
    console.log(motivation);
  }, []);

  useEffect(() => {
    todoList();
  }, [addedNewTodo, editContent, mode]);

  return (
    <>
      {localStorage.getItem("Name") ? (
        <div className="App container mt-5 d-flex flex-column justify-content-center align-items-center">
          <Profile mode={mode} setMode={setMode} />
          <h1 className={mode === "dark" ? "text-light" : "text-dark"}>
            TodoList App
          </h1>
          <Card
            bg={mode === "dark" ? "secondary" : "light"}
            className="card-width mb-2 "
          >
            <Card.Header className="pt-4 d-flex">
              <AddTodo
                addTodo={addTodo}
                mode={mode}
                setAddTodo={setAddTodo}
                addedNewTodo={addedNewTodo}
                setAddedNewTodo={setAddedNewTodo}
              />
              <AiFillEdit
                className={
                  mode === "dark"
                    ? "fs-2 text-warning me-2 button-hever-effect cursor-pointer"
                    : "fs-2 text-success me-2 button-hever-effect cursor-pointer"
                }
                onClick={() => setEditContent(true)}
              />
              {editContent ? (
                <AiFillCloseCircle
                  onClick={() => setEditContent(false)}
                  className="fs-2 text-dark button-hever-effect cursor-pointer"
                />
              ) : (
                ""
              )}
            </Card.Header>
            <Card.Body>
              {data?.map((todo, index) => (
                <Card.Text
                  as="div"
                  key={todo?.id}
                  className="border-bottom pb-2 mb-2"
                >
                  <div className="todoline">
                    <div className="d-flex justify-content-between align-items-center row">
                      <Form className="d-flex align-items-center col-12 col-sm-10 pe-0">
                        <Form.Check
                          type="checkbox"
                          id={`check-api-checkbox-${todo.id}`}
                          className="d-flex justify-content-between align-items-baseline w-100 "
                        >
                          <Form.Check.Input
                            type="checkbox"
                            id={`check-api-checkbox-${todo.id}`}
                            isValid={todo?.isCompleted ? true : false}
                            className="me-5 col-2 input-check"
                            onChange={(e) => isCheck(e, todo, index)}
                            checked={todo.isCompleted ? true : false}
                          />

                          {!editContent ? (
                            <Form.Check.Label className="col-10">
                              <div
                                className={
                                  todo.isCompleted && mode === "dark"
                                    ? "fs-3 m-0 p-0 text-white text-decoration-line-through pe-2"
                                    : !todo.isCompleted && mode === "dark"
                                    ? "fs-3 m-0 p-0 text-white pe-2"
                                    : !todo.isCompleted && mode === "light"
                                    ? "fs-3 m-0 p-0 text-dark pe-2"
                                    : todo.isCompleted && mode === "light"
                                    ? "fs-3 m-0 p-0 text-dark pe-2 text-decoration-line-through"
                                    : ""
                                }
                              >
                                {todo?.content}
                              </div>
                            </Form.Check.Label>
                          ) : (
                            <InputGroup className="w-100 align-self-baseline">
                              <Form.Control
                                aria-label="Edit Todo"
                                aria-describedby="basic-addon2"
                                value={data[index]?.content}
                                onChange={(e) => isEdit(e, todo, index)}
                                disabled={editContent ? false : true}
                                type="text"
                                className="w-100"
                              />
                            </InputGroup>
                          )}
                        </Form.Check>
                      </Form>
                      <div className="d-flex justify-content-end align-items-center align-self-start col-12 col-sm-2">
                        {editContent ? (
                          <AiFillSave
                            onClick={() => sendNewContent(todo)}
                            className={
                              mode === "dark"
                                ? "fs-2 text-warning button-hever-effect cursor-pointer"
                                : "fs-2 text-success button-hever-effect cursor-pointer"
                            }
                          />
                        ) : (
                          ""
                        )}
                        <AiFillDelete
                          onClick={() => deleteTodo(todo)}
                          className={
                            mode === "dark"
                              ? "fs-2 text-light button-hever-effect cursor-pointer"
                              : "fs-2 text-danger button-hever-effect cursor-pointer"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Card.Text>
              ))}
            </Card.Body>
            <Card.Footer>
              <div
                className={
                  mode === "dark"
                    ? "text-light d-flex justify-content-center align-items-center"
                    : "text-dark d-flex justify-content-center align-items-center"
                }
              >
                <a
                  href="https://halituzan.github.io/"
                  className={mode === "dark" ? "text-light" : "text-dark"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineLink className="fs-1 cursor-pointer" />
                </a>
                <a
                  href="https://github.com/halituzan"
                  className={mode === "dark" ? "text-light" : "text-dark"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub className="fs-1 cursor-pointer" />
                </a>
                <a
                  href="https://www.linkedin.com/in/halituzan/"
                  className={mode === "dark" ? "text-light" : "text-dark"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin className="fs-1 cursor-pointer" />
                </a>
              </div>
            </Card.Footer>
          </Card>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      ) : (
        <Welcome
          addedNewTodo={addedNewTodo}
          setAddedNewTodo={setAddedNewTodo}
        />
      )}
    </>
  );
}

export default App;
