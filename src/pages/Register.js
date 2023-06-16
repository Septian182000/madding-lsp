import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faFileSignature,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { NormalTextField } from "../components/textFields/NormalTextFields";
import SweetAlert2 from "react-sweetalert2";
import { register } from "../lib/state_manager/reducers/registerSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({});
  const [fieldIsError, setFieldIsError] = useState({});
  const [validation, setValidation] = useState({});
  const [passwordType, setPasswordType] = useState("password");

  const [sweetAlert, setSweetAlert] = useState({});
  function handleClickShowAlert() {
    setSweetAlert({
      show: true,
      confirmButtonColor: "green",
      confirmButtonText: "Login",
    });
  }

  return (
    <Container>
      <SweetAlert2
        {...sweetAlert}
        didClose={() => {
          navigate("/100101001");
        }}
      >
        <h1 style={{ fontFamily: "Rubik" }}>Register Success</h1>
        <Row className="mt-5 mb-4 justify-content-center">
          <Col lg={"auto"}>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ height: 90, color: "grey" }}
            />
          </Col>
        </Row>
      </SweetAlert2>
      <div
        style={{
          background: "transparent",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Row className="mb-4">
          <span
            style={{
              fontFamily: "Rubik",
              fontSize: 24,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Register your data !
          </span>
        </Row>
        <Row className="mb-3">
          <Col lg={"auto"} className="d-flex">
            <FontAwesomeIcon
              icon={faUser}
              style={{ height: 25, margin: "auto 0" }}
            />
          </Col>
          <Col>
            <NormalTextField
              placeholder={"Insert Your Username"}
              input={input.username}
              onChanged={(e) => {
                setInput({
                  ...input,
                  username: e.target.value,
                });
                setValidation({ ...validation, isUserName: false });
              }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={"auto"} className="d-flex">
            <FontAwesomeIcon
              icon={faFileSignature}
              style={{ height: 20, margin: "auto 0" }}
            />
          </Col>
          <Col>
            <NormalTextField
              placeholder={"Insert Your Name"}
              input={input.name}
              onChanged={(e) => {
                setInput({
                  ...input,
                  name: e.target.value,
                });
                setValidation({ ...validation, isName: false });
              }}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col lg={"auto"} className="d-flex">
            <FontAwesomeIcon
              icon={faLock}
              style={{ height: 25, margin: "auto 0" }}
            />
          </Col>
          <Col>
            <NormalTextField
              typed={passwordType}
              placeholder={"Insert Your Password"}
              input={input.password}
              onChanged={(e) => {
                setInput({
                  ...input,
                  password: e.target.value,
                });
                setValidation({ ...validation, isPassword: false });
              }}
              icon={passwordType === "password" ? faEyeSlash : faEye}
              onClicked={() => {
                setPasswordType(
                  passwordType === "password" ? "text" : "password"
                );
              }}
            />
          </Col>
        </Row>
        <Row
          className="justify-content-start mb-4"
          style={{
            fontFamily: "Rubik",
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/100101001");
          }}
        >
          <Col lg={"auto"}>Login Account</Col>
        </Row>
        {validation.isUserName || validation.isName || validation.isPassword ? (
          <span style={{ fontFamily: "Rubik", color: "red" }}>
            *Failed to register
          </span>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center mt-2">
          <div>
            <button
              style={{
                width: 100,
                height: 36,
                color: "white",
                backgroundColor: "green",
                fontFamily: "Rubik",
                fontWeight: 400,
                fontSize: 18,
                borderRadius: 4,
                border: "1px solid black",
              }}
              onClick={() => {
                if (
                  input.username !== "" &&
                  input.name !== "" &&
                  input.password
                ) {
                  dispatch(register({ newData: input }));
                  handleClickShowAlert();
                  setInput({});
                } else {
                  setFieldIsError({
                    ...validation,
                    isName: true,
                    isUserName: true,
                    isPassword: true,
                  });
                }
              }}
            >
              <span>Register</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
