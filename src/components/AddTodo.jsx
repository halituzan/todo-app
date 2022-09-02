import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { postData } from "../helpers/postData";
import { toast } from "react-toastify";

const AddTodo = ({
  addTodo,
  setAddTodo,
  setAddedNewTodo,
  addedNewTodo,
  mode,
}) => {
  const addNewTodo = async () => {
    if (addTodo.length < 3) {
      toast.error(
        "Your Todo List needs to be more than or equal to 3 characters"
      );
    } else {
      setAddTodo("");
      await postData(addTodo);
      addedNewTodo ? setAddedNewTodo(false) : setAddedNewTodo(true);
    }
  };
  const handleKeyPress = async (e) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      if (addTodo.length < 3) {
        toast.error(
          "Your Todo List needs to be more than or equal to 3 characters"
        );
      }
      if (addTodo.length >= 3) {
        setAddTodo("");
        await postData(addTodo);
        addedNewTodo ? setAddedNewTodo(false) : setAddedNewTodo(true);
      }
    }
  };

  return (
    <>
      <div className="container">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Add Todo"
            aria-label="Add Todo"
            aria-describedby="basic-addon2"
            value={addTodo}
            onChange={(e) => setAddTodo(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => addNewTodo()}
            className={
              mode === "dark" ? "bg-dark text-light" : "bg-dark text-light"
            }
          >
            Add
          </Button>
        </InputGroup>
      </div>
    </>
  );
};

export default AddTodo;
