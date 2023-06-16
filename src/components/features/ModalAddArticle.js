import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalsView } from "../modals/ModalViews";
import { Row, Col } from "react-bootstrap";
import { NormalTextField } from "../textFields/NormalTextFields";
import { Avatar } from "../imageViewer/Avatar";
import { TextEditor } from "../textFields/TextEditor";
import { storeArticle } from "../../lib/state_manager/reducers/articleSlice";

export const ModalAddArticle = ({ isOpen, closeModal, userID }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  const handleClearInput = () => {
    setInput({
      ...input,
      title: "",
      image_url: "",
      content: "",
    });
  };

  useEffect(() => {
    setInput({ ...input, admin_id: userID });
  }, [userID]);

  return (
    <ModalsView
      closeModal={closeModal}
      isOpen={isOpen}
      width={1000}
      height={580}
      overlayBackground={"transparent"}
      content={
        <div className="p-5">
          <Row
            className="mb-4 justify-content-center"
            style={{ textAlign: "center" }}
          >
            <span style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
              Insert New Article
            </span>
          </Row>
          <Row className="mb-4">
            <Col lg={6}>
              <Row
                className="mt-2"
                style={{ color: "white", fontFamily: "Rubik", fontSize: 16 }}
              >
                *Title
              </Row>
              <Row className="mt-2 mb-4">
                <Col>
                  <NormalTextField
                    background={"#D9D9D9"}
                    placeholder={"Insert your title"}
                    input={input.title}
                    onChanged={(e) => {
                      setInput({
                        ...input,
                        title: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row
                style={{ color: "white", fontFamily: "Rubik", fontSize: 16 }}
              >
                *Image URL
              </Row>
              <Row className="mt-2 mb-4">
                <Col>
                  <NormalTextField
                    background={"#D9D9D9"}
                    placeholder={"Insert your URL"}
                    input={input.image_url}
                    onChanged={(e) => {
                      setInput({
                        ...input,
                        image_url: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <div>
                  <button
                    style={{
                      width: 150,
                      height: 46,
                      color: "black",
                      backgroundColor: "#D9D9D9",
                      fontFamily: "Rubik",
                      fontWeight: 400,
                      fontSize: 18,
                      borderRadius: 4,
                      border: "1px solid black",
                    }}
                    onClick={() => {
                      handleClearInput();
                      closeModal();
                    }}
                  >
                    <span>Cancel</span>
                  </button>
                </div>
                <div>
                  <button
                    style={{
                      width: 150,
                      height: 46,
                      color: "white",
                      backgroundColor: "green",
                      fontFamily: "Rubik",
                      fontWeight: 400,
                      fontSize: 18,
                      borderRadius: 4,
                      border: "1px solid black",
                    }}
                    onClick={() => {
                      if (input.title && input.image_url && input.content) {
                        dispatch(storeArticle({ newData: input }));
                        handleClearInput();
                        closeModal();
                      }
                    }}
                  >
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <textarea
                className="textarea"
                value={input.content}
                placeholder="Sharing Your Article"
                name="review"
                style={{
                  width: "100%",
                  height: 420,
                }}
                onChange={(e) => {
                  setInput({ ...input, content: e.target.value });
                }}
              />
            </Col>
          </Row>
        </div>
      }
    />
  );
};
