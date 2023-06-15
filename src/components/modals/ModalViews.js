import { Container } from "react-bootstrap";
import ReactModal from "react-modal";
import { useCallback, useEffect, useState } from "react";

export const ModalsView = ({
  isOpen,
  closeModal,
  content,
  width,
  height,
  background,
}) => {
  const [modalWidth, setModalWidth] = useState(width);

  const handleWindowResize = useCallback((event) => {
    setModalWidth(window.innerWidth < 1000 ? "60%" : width);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <Container>
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: background ? background : "#3F483B",
            border: "2px solid #414150",
            padding: 0,
            borderRadius: 8,
            width: modalWidth,
            height: height,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999999,
          },
        }}
      >
        {content}
      </ReactModal>
    </Container>
  );
};
