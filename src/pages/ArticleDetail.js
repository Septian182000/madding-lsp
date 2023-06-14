import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import { ListComments } from "../components/features/ListComments";
import { Pagination } from "../components/modules/Pagination";
import {
  getDetailArticle,
  selectDetailArticleData,
  getDetailArticleStatus,
} from "../lib/state_manager/reducers/detailArticleSlice";
import { dataComment } from "../mockData/dataComment";

export default function ArticleDetail({ logged }) {
  // redux
  const dispatch = useDispatch();
  const detailData = useSelector(selectDetailArticleData);
  const detailStatus = useSelector(getDetailArticleStatus);
  //

  const params = useParams();
  const [data, setData] = useState({});
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments((val) => !val);
  };

  // set pagination
  const [commentSlice, setCommentSlice] = useState([]);
  const [filter, setFilter] = useState({
    page: 5,
  });
  const [paginationState, setPaginationState] = useState({
    pageCount: 0,
    currentPage: 0,
    pageSize: filter.page,
  });
  const onPageChange = (page) => {
    const currentPage = page.selected;
    setPaginationState({
      pageCount: paginationState.pageCount,
      currentPage: currentPage,
      pageSize: filter.page,
    });
  };
  //

  useEffect(() => {
    dispatch(getDetailArticle({ id: params.idArticle }));
  }, [dispatch]);

  useEffect(() => {
    if (detailStatus === "success") {
      detailData.map((val) => {
        return setData(val);
      });
    }
  }, [detailData, detailStatus]);

  useEffect(() => {
    const startIndex = paginationState.currentPage * filter.page;
    const lastIndex = startIndex + filter.page;

    setCommentSlice(dataComment.slice(startIndex, lastIndex));
  }, [paginationState, filter]);

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col lg={6}>
          <Row>
            <img
              src={data.image_url}
              alt="poster"
              style={{ objectFit: "cover", width: "100%", height: 477 }}
            />
          </Row>
          {showComments ? (
            <Row
              className="mt-4"
              style={{
                height: 477,
                border: "2px black solid",
                borderRadius: 10,
                marginRight: 5,
                marginLeft: 2,
                backgroundColor: "#ECF8F9",
              }}
            >
              <Row style={{ justifyContent: "space-between" }}>
                <Col
                  lg={"auto"}
                  className="mt-3"
                  style={{ fontFamily: "Rubik", fontWeight: 600, height: 46 }}
                >
                  Total Komentar : {dataComment.length ?? 0}
                </Col>
                {logged !== "admin" ? (
                  <Col
                    lg={"auto"}
                    className="mt-3 d-flex add_comment"
                    style={{
                      height: 46,
                      padding: 8,
                      border: "2px black solid",
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      style={{ height: 25, marginRight: 8 }}
                    />
                    <span>Comment</span>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
              <Row className="mt-3" style={{ overflow: "scroll", height: 350 }}>
                {commentSlice.map((val, index) => (
                  <ListComments key={index} data={val} logged={logged} />
                ))}
                <Row className="justify-content-center">
                  <Col lg={"auto"} style={{ marginLeft: 30 }}>
                    <Pagination
                      currentPage={paginationState.currentPage}
                      onPageChange={onPageChange}
                      pageCount={Math.ceil(dataComment.length / filter.page)}
                    />
                  </Col>
                </Row>
              </Row>
            </Row>
          ) : (
            ""
          )}
          <Row className="justify-content-center mt-3">
            <Col
              className="button_show_comment"
              lg={"auto"}
              style={{
                border: "2px black solid",
                borderRadius: 10,
                padding: 10,
                fontFamily: "Rubik",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={handleShowComments}
            >
              {showComments ? "Hide Comments" : "Show Comments"}
            </Col>
          </Row>
        </Col>
        <Col lg={6}>
          <Row>
            <span
              style={{ fontFamily: "Rubik", fontWeight: 800, fontSize: 36 }}
            >
              {data.title}
            </span>
          </Row>
          <Row className="justify-content-start mt-4">
            <Col lg={"auto"} className="d-flex" style={{ color: "grey" }}>
              <FontAwesomeIcon
                icon={faPencil}
                style={{ height: 25, marginRight: 10 }}
              />
              <span
                style={{
                  fontStyle: "italic",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                }}
              >
                Created at {moment(data.created_at).locale("id").format("LL")}
              </span>
            </Col>
            <Col
              className="mt-4"
              lg={12}
              style={{
                textAlign: "justify",
                overflow: "scroll",
                height: 850,
                border: "2px solid black",
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "Rubik",
                  fontWeight: 400,
                }}
              >
                {data.content}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
