import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgArticle from "../../assets/image/article.png";
import {
  faComments,
  faTrash,
  faPenToSquare,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
import { ModalDelete } from "./ModalDelete";
import { ModalEditArticle } from "./ModalEditArticle";
import { deleteArticle } from "../../lib/state_manager/reducers/articleSlice";

export const ListArticle = ({ data, logged }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalComment, setTotalComment] = useState(10);

  // show modal delete
  const [modalDelete, setModalDelete] = useState(false);
  const handleCloseModalDelete = () => {
    setModalDelete((val) => !val);
  };
  //

  // show modal edit
  const [modalEdit, setModalEdit] = useState(false);
  const handleCloseModalEdit = () => {
    setModalEdit((val) => !val);
  };
  //

  return (
    <>
      <ModalDelete
        isOpen={modalDelete}
        closeModal={handleCloseModalDelete}
        onDelete={() => {
          dispatch(deleteArticle({ id: data.id }));
        }}
      />

      <ModalEditArticle
        isOpen={modalEdit}
        closeModal={handleCloseModalEdit}
        dataID={data.id}
        dataTitle={data.title}
        dataContent={data.content}
        dataImage={data.image_url}
      />
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
            style={{
              backgroundColor: "#F5F1F1",
              width: 230,
              marginLeft: -12,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <img
              src={data.image_url}
              alt="article"
              style={{
                width: 230,
                height: "100%",
                objectFit: "cover",
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          </div>
          <div style={{ marginLeft: 15 }}>
            <Row
              className="mt-2 d-flex"
              style={{ justifyContent: "space-between" }}
            >
              <Col>
                <Row>
                  <Col lg={"auto"}>
                    <span
                      style={{
                        fontFamily: "Rubik",
                        fontWeight: 600,
                        fontSize: 28,
                      }}
                    >
                      {data.title}
                    </span>
                  </Col>
                  <Col lg={"auto"}>
                    {logged === "admin" ? (
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="xl"
                        style={{
                          marginTop: 7,
                          fontFamily: "Rubik",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalEdit(true);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </Col>
              <Col lg={"auto"}>
                {logged === "admin" ? (
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
                ) : (
                  ""
                )}
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
                  height: 200,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {data.content}
              </div>
            </Row>
            <Row
              className="mt-3 mb-3 me-1"
              style={{ justifyContent: "space-between" }}
            >
              <Col
                lg={"auto"}
                className="d-flex ms-3"
                style={{
                  backgroundColor: "green",
                  cursor: "pointer",
                  padding: 6,
                  borderRadius: 7,
                  color: "white",
                }}
                onClick={() => {
                  navigate(`/article-detail/${data.id}`);
                }}
              >
                <FontAwesomeIcon
                  icon={faBookOpenReader}
                  size="xl"
                  style={{
                    marginRight: 5,
                    fontFamily: "Rubik",
                    fontWeight: 600,
                  }}
                />
                <span style={{ fontSize: 18 }}>Baca Selengkapnya</span>
              </Col>
              <Col lg={"auto"} className="d-flex">
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
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};
