import { ModalsView } from "../modals/ModalViews";
import { Row, Col } from "react-bootstrap";
import icTrash from "../../assets/icons/icTrash2.png";

export const ModalDelete = ({ isOpen, closeModal, onDelete }) => {
  return (
    <ModalsView
      closeModal={closeModal}
      isOpen={isOpen}
      width={400}
      overlayBackground={"transparent"}
      content={
        <div
          className="p-5"
          style={{
            backgroundColor: "#3F483B",
            borderRadius: 10,
            border: "1px solid #414150",
          }}
        >
          <Row className="mb-4">
            <div className="d-flex" style={{ justifyContent: "center" }}>
              <img
                src={icTrash}
                alt="trash"
                style={{ width: 69, height: 76 }}
              />
            </div>
          </Row>
          <Row className="mb-4">
            <div
              style={{
                color: "white",
                fontWeight: 400,
                fontFamily: "Rubik",
                fontSize: 24,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              <span>Do you want to delete ?</span>
            </div>
          </Row>
          <div className="d-flex justify-content-center gap-3">
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
                onClick={closeModal}
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
                  backgroundColor: "#F24C3D",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 18,
                  borderRadius: 4,
                  border: "1px solid black",
                }}
                onClick={() => {
                  onDelete();
                  closeModal();
                }}
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};
