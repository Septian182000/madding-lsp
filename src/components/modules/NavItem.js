import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

export const NavItem = (props) => {
  useLocation();
  const isActive =
    props.to !== "/"
      ? window.location.pathname.includes(props.to)
      : window.location.pathname === props.to;

  const activeStyle = {
    color: "white",
    textDecoration: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: 22,
  };

  const inActiveStyle = {
    color: "grey",
    textDecoration: "none",
    fontFamily: "Rubik",
    fontWeight: 400,
    fontSize: 22,
  };

  const itemStyle = isActive ? activeStyle : inActiveStyle;

  return (
    <div className={props.position} style={{ marginLeft: 8 }}>
      <Nav.Link
        style={{
          padding: props.padding,
        }}
      >
        <Link {...props} style={itemStyle}>
          {props.children}
        </Link>
      </Nav.Link>
    </div>
  );
};
