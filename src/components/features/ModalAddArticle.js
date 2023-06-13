import { useState } from "react";
import { ModalsView } from "../modals/ModalViews";
import { Row, Col } from "react-bootstrap";
import { NormalTextField } from "../textFields/NormalTextFields";
import { Avatar } from "../imageViewer/Avatar";
import { TextEditor } from "../textFields/TextEditor";

export const ModalAddArticle = ({ isOpen, closeModal }) => {
  const [input, setInput] = useState({});

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setInput({ ...input, image: URL.createObjectURL(file) });
  };

  console.log(input);

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
                *Image
              </Row>
              <Row className="mt-2">
                <Col lg={6}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Col>
              </Row>
            </Col>
            <Col fluid></Col>
            <Col lg={"auto"} style={{ marginRight: 50 }}>
              {input.image && (
                <Avatar
                  picture={input.image}
                  size={202}
                  borderRadius={8}
                  borderStyle={"2px solid #3F483B"}
                />
              )}
            </Col>
          </Row>
          <Row>
            <textarea
              className="textarea"
              placeholder="Sharing Your Article"
              name="review"
            />
          </Row>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <div>
              <button
                style={{
                  width: 100,
                  height: 36,
                  color: "black",
                  backgroundColor: "#D9D9D9",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 18,
                  borderRadius: 4,
                  border: "1px solid black",
                }}
                onClick={() => {
                  setInput({});
                  closeModal();
                }}
              >
                <span>Cancel</span>
              </button>
            </div>
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
              >
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};
