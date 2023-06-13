import { Container, Row, Col } from "react-bootstrap";
import { Oval } from "react-loader-spinner";

export const LoadingView = ({
  title,
  width,
  height,
  color,
  innerWidth,
  innerHeight,
}) => {
  return (
    <Container
      style={{
        width: width,
        height: height,
        fontFamily: "Gilroy",
        backgroundColor: "transparent",
        borderRadius: 10,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Row>
        <Col>
          <Row
            className={"justify-content-center"}
            style={{ color: "white", fontWeight: 600 }}
          >
            <Col xs={"auto"} style={{ fontSize: 20, marginTop: 10 }}>
              {title}
            </Col>
          </Row>
          <Row
            className={"justify-content-center"}
            style={{
              color: "white",
              fontWeight: 600,
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <Col xs={"auto"}>
              <Oval
                color={color ? color : "#3F483B"}
                secondaryColor={"rgba(89,167,255,0.49)"}
                height={innerHeight}
                width={innerWidth}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
