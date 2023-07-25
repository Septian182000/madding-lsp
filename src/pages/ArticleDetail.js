import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import { ListComments } from "../components/features/ListComments";
import { ListCommentsDetail } from "../components/features/ListCommentsDetail";
import { Pagination } from "../components/modules/Pagination";
import notFound from "../assets/image/notFound2.png";
import { ModalAddComment } from "../components/features/ModalAddComment";
import {
  getDetailArticle,
  selectDetailArticleData,
  getDetailArticleStatus,
} from "../lib/state_manager/reducers/detailArticleSlice";
import {
  getComments,
  selectCommentsData,
  getCommentsStatus,
} from "../lib/state_manager/reducers/comentarSlice";
import { dataComment } from "../mockData/dataComment";

export default function ArticleDetail({ logged }) {
  // redux
  const dispatch = useDispatch();
  const detailData = useSelector(selectDetailArticleData);
  const detailStatus = useSelector(getDetailArticleStatus);
  const commentData = useSelector(selectCommentsData);
  const commentStatus = useSelector(getCommentsStatus);
  //

  const params = useParams();
  const [data, setData] = useState({});
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments((val) => !val);
  };

  // show modal add comment
  const [modalAddComment, setModalAddComment] = useState(false);
  const handleShowModalAddComment = () => {
    setModalAddComment((val) => !val);
  };
  //

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
    dispatch(getComments({ id: params.idArticle }));
  }, [dispatch]);

  useEffect(() => {
    if (detailStatus === "success") {
      detailData.map((val) => {
        return setData(val);
      });
    }
  }, [detailData, detailStatus]);

  useEffect(() => {
    if (commentStatus === "success" && commentData) {
      if (
        commentData.data === "Success create comment" ||
        commentData.data === "Success delete comment"
      ) {
        dispatch(getComments({ id: params.idArticle }));
        dispatch(getDetailArticle({ id: params.idArticle }));
      }
    }
  }, [dispatch, commentStatus, commentData]);

  useEffect(() => {
    if (commentStatus === "success" && commentData) {
      if (
        commentData.data !== "Success create comment" &&
        commentData.data !== "Success delete comment"
      ) {
        const startIndex = paginationState.currentPage * filter.page;
        const lastIndex = startIndex + filter.page;

        setCommentSlice(commentData.data.slice(startIndex, lastIndex));
      }
    }
  }, [commentStatus, commentData, paginationState, filter]);

  return (
    <Container className="mt-5">
      <ModalAddComment
        isOpen={modalAddComment}
        closeModal={handleShowModalAddComment}
        articleID={params.idArticle}
      />
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
                  Total Komentar :{" "}
                  {commentStatus === "success"
                    ? commentData.data.length ?? 0
                    : 0}
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
                    onClick={() => {
                      setModalAddComment(true);
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
              <Row style={{ overflow: "scroll", height: 350 }}>
                {commentStatus === "success" && commentData.data.length > 0 ? (
                  commentSlice.map((val, index) => (
                    <ListCommentsDetail
                      key={index}
                      data={val}
                      commentData={commentData}
                      commentStatus={commentStatus}
                      setTotalComment
                    />
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <figure>
                      <img
                        style={{
                          height: 200,
                        }}
                        src={notFound}
                        alt="not-found"
                      />
                      <figcaption className="text-center">
                        <span
                          style={{
                            color: "black",
                            fontFamily: "Rubik",
                            fontSize: 18,
                            fontWeight: 600,
                          }}
                        >
                          No result found
                        </span>
                      </figcaption>
                      <figcaption className="text-center">
                        <span
                          style={{
                            color: "#90909C",
                            fontFamily: "Rubik",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          The data is empty
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                )}
                {commentData.data.length > 0 ? (
                  <Row className="justify-content-center">
                    <Col lg={"auto"} style={{ marginLeft: 30 }}>
                      <Pagination
                        currentPage={paginationState.currentPage}
                        onPageChange={onPageChange}
                        pageCount={Math.ceil(
                          commentStatus === "success"
                            ? commentData.data.length / filter.page
                            : 0 / filter.page
                        )}
                      />
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </Row>
            </Row>
          ) : (
            ""
          )}
          {data.hide_comment !== "1" ? 
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
          </Row> : ""}
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
