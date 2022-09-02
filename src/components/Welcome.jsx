import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const Welcome = ({ setAddedNewTodo, addedNewTodo }) => {
  const [user, setUser] = useState({
    name: "",
    project: "",
    id: uuidv4(),
  });

  const setLocalStorage = () => {
    if (user.name === "") {
      toast.error("You need to enter the namespace");
    } else {
      localStorage.setItem("Name", user.name);
      localStorage.setItem("Project", user.project);
      localStorage.setItem("Id", user.id);
      localStorage.setItem("Mode", "light");
    }
    addedNewTodo ? setAddedNewTodo(false) : setAddedNewTodo(true);
  };

  return (
    <div className="p-5 border container w-50 mt-5">
      <div className="text-center">
        Please enter your name to access the Todo List. You can optionally enter
        a project name.
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            <span className="fs-5 text-danger">*</span>Full Name{" "}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Full Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            Project Name <span className="text-muted">(optional)</span>{" "}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Project Name"
            value={user.project}
            onChange={(e) => setUser({ ...user, project: e.target.value })}
          />
        </Form.Group>
        <Button variant="success" onClick={() => setLocalStorage()}>
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Welcome;
