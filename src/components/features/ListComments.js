import { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { generateDiceBearAvatars } from "../../lib/utils/randomImage";
import { Avatar } from "../imageViewer/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import moment from "moment/moment";
import { ModalDelete } from "./ModalDelete";

export const ListComments = ({ data, logged }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const handleShowModalDelete = () => {
    setModalDelete((val) => !val);
  };
  return (
    <Container>
      <ModalDelete isOpen={modalDelete} closeModal={handleShowModalDelete} />
      <Row
        className="mb-3"
        style={{
          border: "2px solid black",
          borderRadius: 8,
          marginLeft: 0,
          padding: 10,
          fontFamily: "Rubik",
        }}
      >
        <Row className="mb-2" style={{ justifyContent: "space-between" }}>
          <Col
            lg={"auto"}
            style={{
              display: "flex",
              marginLeft: -10,
            }}
          >
            <Avatar
              picture={generateDiceBearAvatars(Math.random())}
              size={60}
            />
            <span
              style={{
                marginLeft: 15,
                marginTop: "auto",
                marginBottom: "auto",
                fontSize: 19,
              }}
            >
              {data.name}
              <span
                style={{ marginLeft: 10, fontSize: 14, fontStyle: "italic" }}
              >
                {data.email}
              </span>
            </span>
          </Col>
          {logged === "admin" ? (
            <Col lg={"auto"} className="d-flex">
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{
                  height: 25,
                  marginTop: 12,
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setModalDelete(true);
                }}
              />
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Row className="mb-2" style={{ justifyContent: "space-between" }}>
          <Col lg={"auto"}>Comment :</Col>
          <Col lg={"auto"} className="d-flex" style={{ color: "grey" }}>
            <FontAwesomeIcon
              icon={faClock}
              style={{ marginRight: 5, marginTop: 5 }}
            />
            <span>{moment(data.created_at).format("LL")}</span>
          </Col>
        </Row>
        <Row>
          <Col lg={"auto"} style={{ textAlign: "justify" }}>
            {data.comment}
          </Col>
        </Row>
      </Row>
    </Container>
  );
};
