import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgArticle from "../../assets/image/article.png";
import {
  faComments,
  faTrash,
  faCirclePlus,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";
import { ModalDelete } from "./ModalDelete";

export const ListArticle = ({ data }) => {
  const [totalComment, setTotalComment] = useState(10);

  // show modal delete
  const [modalDelete, setModalDelete] = useState(false);
  const handleCloseModalDelete = () => {
    setModalDelete((val) => !val);
  };
  //

  return (
    <>
      <ModalDelete isOpen={modalDelete} closeModal={handleCloseModalDelete} />
      <Row className="mt-4 justify-content-center">
        <Col
          lg={8}
          style={{
            backgroundColor: "#D9D9D9",
            borderRadius: 10,
            border: "1px solid black",
            display: "flex",
          }}
        >
          <div
            className="p-4"
            style={{
              backgroundColor: "#F5F1F1",
              width: 230,
              marginLeft: -12,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <img
              src={imgArticle}
              alt="article"
              style={{ width: 180, height: 180 }}
            />
          </div>
          <div style={{ marginLeft: 15 }}>
            <Row className="mt-2">
              <Col>
                <span
                  style={{ fontFamily: "Rubik", fontWeight: 600, fontSize: 28 }}
                >
                  {data.judul}
                </span>
              </Col>
              <Col lg={"auto"}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size="xl"
                  style={{
                    color: "red",
                    cursor: "pointer",
                    marginTop: 7,
                    marginRight: 7,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalDelete(true);
                  }}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <div
                style={{
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 16,
                  textAlign: "justify",
                  maxHeight: 120,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {data.content}
              </div>
            </Row>
            <Row className="mt-2 me-1">
              <div className="d-flex justify-content-end">
                <FontAwesomeIcon
                  icon={faComments}
                  size="xl"
                  style={{
                    marginTop: 3,
                    marginRight: 5,
                    fontFamily: "Rubik",
                    fontWeight: 600,
                  }}
                />
                <span style={{ fontSize: 18 }}>{totalComment}</span>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};
