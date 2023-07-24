import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Container, Col, Row } from "react-bootstrap";
import { NormalTextField } from "../components/textFields/NormalTextFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  getLogin,
  selectLoginData,
  getLoginStatus,
} from "../lib/state_manager/reducers/loginSlice";

export default function Login({ setUser, user }) {
  // redux
  const dispatch = useDispatch();
  const loginData = useSelector(selectLoginData);
  const loginStatus = useSelector(getLoginStatus);
  //
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [validation, setValidation] = useState({});
  const [passwordType, setPasswordType] = useState("password");

  useEffect(() => {
    if (loginStatus === "success" && loginData) {
      if (loginData.data !== "Failed to login") {
        setUser(loginData.data);
        window.location.href = "/";
      } else {
        setValidation({ ...validation, isUserName: true, isPassword: true });
      }
    } else if (user === "admin") {
      window.location.href = "/";
    }
  }, [loginStatus, loginData]);

  return (
    <Container>
      <div
        style={{
          background: "transparent",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
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
            Hello, Welcome back
          </span>
        </Row>
        <Row className="mb-3">
          <span style={{ fontFamily: "Rubik", fontSize: 20, fontWeight: 500 }}>
            Username
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
          <span style={{ fontFamily: "Rubik", fontSize: 20, fontWeight: 500 }}>
            Pasword
          </span>
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
          className="mb-4"
          style={{
            fontFamily: "Rubik",
            justifyContent: "space-between",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/register");
          }}
        >
          <Col lg={"auto"}>
            {validation.isUserName && validation.isPassword ? (
              <span style={{ fontFamily: "Rubik", color: "red" }}>
                *Failed to login
              </span>
            ) : (
              ""
            )}
          </Col>
          <Col lg={"auto"} style={{ textDecoration: "underline" }}>
            Register Account
          </Col>
        </Row>

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
                dispatch(
                  getLogin({
                    username: input.username,
                    password: input.password,
                  })
                );
              }}
            >
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
