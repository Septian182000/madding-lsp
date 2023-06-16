import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faTrash,
  faPenToSquare,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";
export const ListArticleUser = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Col
      className="mt-5"
      lg={"auto"}
      style={{
        width: 351,
        backgroundColor: "transparent",
        borderRadius: 10,
        border: "1px solid black",
        margin: "0 10px",
      }}
    >
      <div style={{ marginLeft: -12 }}>
        <img
          src={data.image_url}
          alt="article"
          style={{
            width: 350,
            height: 250,
            objectFit: "cover",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </div>
      <div className="mt-2">
        <span style={{ fontFamily: "Rubik", fontWeight: 600, fontSize: 17 }}>
          {data.title}
        </span>
      </div>
      <div
        className="mt-2"
        style={{
          textAlign: "justify",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          height: 129,
          WebkitBoxOrient: "vertical",
        }}
      >
        <span style={{ fontFamily: "Rubik", fontWeight: 400, fontSize: 14 }}>
          {data.content}
        </span>
      </div>
      <Row className="mt-3 mb-3 me-1" style={{ justifyContent: "center" }}>
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
      </Row>
    </Col>
  );
};
