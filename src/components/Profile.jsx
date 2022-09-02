import React from "react";
import { Form, Navbar, Offcanvas } from "react-bootstrap";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

const Profile = ({ mode, setMode }) => {
  const changeMode = (e) => {
    const body = document.querySelector("body");
    if (e.target.checked) {
      localStorage.setItem("Mode", "dark");
      body.style.background = "#121212";
      setMode("dark");
    } else {
      localStorage.setItem("Mode", "light");
      body.style.background = "#fff";
      setMode("light");
    }
  };
  return (
    <div className="fixedtop profile text-dark  p-2 d-flex flex-column justify-content-center align-items-center">
      <div className="dark-mode">
        <Navbar bg="light" expand="lg" className="mb-3 px-2">
          <div>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
              className="h-25"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-lg`}
                ></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-flex flex-column justify-content-start align-items-center canvas-body p-2">
                <div>
                  Welcome{" "}
                  <span className="fw-bold">
                    {localStorage.getItem("Name")}
                  </span>
                </div>

                {localStorage.getItem("Project") ? (
                  <div>
                    Todo List for{" "}
                    <span className="fw-bold">
                      {localStorage.getItem("Project")}
                    </span>{" "}
                    Project
                  </div>
                ) : (
                  ""
                )}
                <Form className="d-flex justify-content-between align-items-center">
                  <BsFillSunFill className="fs-3 text-warning me-2" />
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    onChange={(e) => changeMode(e)}
                    checked={mode === "dark" ? true : false}
                  />
                  <BsMoonStarsFill className="fs-5 ms-2" />
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

export default Profile;
