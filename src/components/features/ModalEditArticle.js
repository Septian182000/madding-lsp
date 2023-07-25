import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalsView } from "../modals/ModalViews";
import { Row, Col,Form} from "react-bootstrap";
import { NormalTextField } from "../textFields/NormalTextFields";
import { editArticle } from "../../lib/state_manager/reducers/articleSlice";

export const ModalEditArticle = ({
  isOpen,
  closeModal,
  dataID,
  dataTitle,
  dataContent,
  dataImage,
  dataHide
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  useEffect(() => {
    setInput({
      ...input,
      title: dataTitle,
      content: dataContent,
      image_url: dataImage,
      hide_comment: dataHide
    });
  }, [dataTitle, dataContent, dataImage,dataHide]);

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
              Edit The Article
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
              <Row className="mt-2 mb-4">
                <Col lg={"auto"} style={{marginRight: -15}}>
                  <Form.Check
                    type={"radio"}
                    onChange={() => {
                     setInput({...input, hide_comment: "0"})
                    }}
                    checked={input.hide_comment === "0"}
                  />
                  
                </Col>
                <Col lg={"auto"} style={{color:"white", marginRight:20}}>
                  Show Comment
                </Col>
                <Col lg={"auto"} style={{marginRight: -15}}>
                  <Form.Check
                    type={"radio"}
                    onChange={() => {
                     setInput({...input, hide_comment: "1"})
                    }}
                    checked={input.hide_comment === "1"}
                  />
                  
                </Col>
                <Col lg={"auto"} style={{color:"white"}}>
                  Hide Comment
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
                        dispatch(editArticle({ id: dataID, newData: input }));
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
