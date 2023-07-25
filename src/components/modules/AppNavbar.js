import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar } from "../imageViewer/Avatar";
import { NavItem } from "./NavItem";
import logo from "../../assets/logo2.png";

export const AppNavbar = () => {
  const navbarStyle = {
    fontFamily: "Rubik",
    fontSize: 18,
    position: "sticky",
    background: "#3F483B",
    zIndex: 9999,
    padding: "1.2%",
    top: 0,
  };

  return (
    <Container fluid style={navbarStyle}>
      <Row className="justify-content-center">
        <Col lg={"auto"} style={{ paddingTop: 5 }}>
          <NavItem to={"/dashboard"}>Dashboard</NavItem>
        </Col>
        <Col lg={"auto"}>
          <div
            style={{
              height: 44,
              textAlign: "center",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              marginLeft: 10,
            }}
          >
            <div>
              <Avatar
                picture={logo}
                size={62}
                borderRadius={8}
                borderStyle={"2px solid #3F483B"}
              />
            </div>
          </div>
        </Col>
        <Col lg={"auto"} style={{ paddingTop: 5 }}>
          <NavItem to={"/about"}>About</NavItem>
        </Col>
      </Row>
    </Container>
  );
};
