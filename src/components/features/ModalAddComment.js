import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalsView } from "../modals/ModalViews";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { storeComment } from "../../lib/state_manager/reducers/comentarSlice";

export const ModalAddComment = ({ isOpen, closeModal, articleID }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  useEffect(() => {
    setInput({ ...input, article_id: articleID });
  }, [articleID]);

  return (
    <ModalsView
      closeModal={closeModal}
      isOpen={isOpen}
      width={600}
      overlayBackground={"transparent"}
      background={"#ECF8F9"}
      content={
        <div className="py-5">
          <Row className="justify-content-end">
            <Col lg={"auto"} style={{ marginRight: 8, marginTop: -40 }}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                style={{ height: 30, cursor: "pointer" }}
                onClick={() => {
                  setInput({});
                  closeModal();
                }}
              />
            </Col>
          </Row>
          <Row
            className="justify-content-center"
            style={{ fontFamily: "Rubik", fontSize: 24, fontWeight: 600 }}
          >
            <Col lg={"auto"}>What Are You Gonna Say ?</Col>
          </Row>
          <Row className="mt-4">
            <Col style={{ marginLeft: 20 }}>
              <div className="coolinput">
                <label for="input" className="text">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Write here..."
                  name="input"
                  className="input"
                  value={input.name}
                  onChange={(e) => {
                    setInput({ ...input, name: e.target.value });
                  }}
                />
              </div>
            </Col>
            <Col lg={"auto"}>
              <div style={{ backgroundColor: "black", width: 3, height: 80 }}>
                .
              </div>
            </Col>
            <Col style={{ marginLeft: 15 }}>
              <div className="coolinput">
                <label for="input" className="text">
                  Email:
                </label>
                <input
                  type="text"
                  placeholder="Write here..."
                  name="input"
                  className="input"
                  value={input.email}
                  onChange={(e) => {
                    setInput({ ...input, email: e.target.value });
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="p-4">
            <textarea
              className="textarea"
              value={input.comment}
              placeholder="Insert your comment"
              name="review"
              style={{
                width: "100%",
                height: 180,
              }}
              onChange={(e) => {
                setInput({ ...input, comment: e.target.value });
              }}
            />
          </Row>
          <Row className="justify-content-center">
            <Col lg={"auto"}>
              <button
                style={{
                  width: 150,
                  height: 46,
                  color: "white",
                  backgroundColor: "green",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 18,
                  borderRadius: 10,
                  border: "1px solid black",
                }}
                onClick={() => {
                  if (input.name && input.email && input.comment) {
                    dispatch(storeComment({ newData: input }));
                    setInput({});
                    closeModal();
                  }
                }}
              >
                <span>Add</span>
              </button>
            </Col>
          </Row>
        </div>
      }
    />
  );
};
