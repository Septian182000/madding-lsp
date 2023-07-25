import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { generateDiceBearAvatars } from "../../lib/utils/randomImage";
import { Avatar } from "../imageViewer/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTrashAlt, faEye,faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import moment from "moment/moment";
import { ModalDelete } from "./ModalDelete";
import { deteleComment , updateComment} from "../../lib/state_manager/reducers/comentarSlice";

export const ListCommentsDetail = ({ data, logged }) => {
  const dispatch = useDispatch();
  // show modal delete
  const [modalDelete, setModalDelete] = useState(false);
  const handleShowModalDelete = () => {
    setModalDelete((val) => !val);
  };
  //

  const [hideComment, setHideComment] = useState({});

  const handleEditComment = () => {
    if(data.hide_comment === "0"){
      dispatch(updateComment({id: data.id, newData: "1"}))
    }else{
      dispatch(updateComment({id: data.id, newData: "0"}))
    }
  }

  return (
    <Container>
      <ModalDelete
        isOpen={modalDelete}
        closeModal={handleShowModalDelete}
        onDelete={() => {
          dispatch(deteleComment({ id: data.id }));
        }}
      />
      <Row
        className="mb-3"
        style={{
          border: "2px solid black",
          borderRadius: 8,
          marginLeft: 0,
          padding: 10,
          fontFamily: "Rubik",
          backgroundColor: "#fff",
          display: data.hide_comment === "1" ? "none" : ""
        }}
      >
        <Row className="mb-2" style={{ justifyContent: "space-between" }}>
          <Col
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
            <>
            <Col lg={"auto"} className="d-flex">
              <FontAwesomeIcon
                icon={data.hide_comment !== "1" ? faEye : faEyeSlash}
                style={{
                  height: 25,
                  marginTop: 12,
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditComment()
                }}
              />
            </Col>
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
            </>
            
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
