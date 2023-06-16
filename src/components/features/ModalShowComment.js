import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalsView } from "../modals/ModalViews";
import { Container, Row, Col } from "react-bootstrap";
import { Pagination } from "../modules/Pagination";
import notFound from "../../assets/image/notFound2.png";
import { ListComments } from "./ListComments";
import {
  getComments,
  selectCommentsData,
  getCommentsStatus,
} from "../../lib/state_manager/reducers/comentarSlice";

export const ModalShowComment = ({
  isOpen,
  closeModal,
  id,
  logged,
  onDispatch,
}) => {
  // redux
  const commentData = useSelector(selectCommentsData);
  const commentStatus = useSelector(getCommentsStatus);
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
    onDispatch();
  }, [onDispatch]);

  useEffect(() => {
    if (commentStatus === "success" && commentData) {
      if (commentData.data === "Success delete comment") {
        onDispatch();
      }
    }
  }, [onDispatch, commentStatus, commentData, id]);

  useEffect(() => {
    if (commentStatus === "success" && commentData) {
      if (commentData.data !== "Success delete comment") {
        const startIndex = paginationState.currentPage * filter.page;
        const lastIndex = startIndex + filter.page;

        setCommentSlice(commentData.data.slice(startIndex, lastIndex));
      }
    }
  }, [commentStatus, commentData, paginationState, filter]);

  return (
    <ModalsView
      closeModal={closeModal}
      isOpen={isOpen}
      width={600}
      height={600}
      overlayBackground={"transparent"}
      background={"#ECF8F9"}
      content={
        <div className="py-5">
          <Row className="justify-content-center">
            <Col
              lg={"auto"}
              style={{ fontFamily: "Rubik", fontWeight: 600, fontSize: 20 }}
            >
              List Comment
            </Col>
          </Row>
          <Row className="justify-content-start">
            <Col
              lg={"auto"}
              style={{
                marginLeft: 20,
                marginTop: 20,
                marginBottom: -10,
                fontFamily: "Rubik",
                fontWeight: 600,
              }}
            >
              <span>Total Komentar : </span>
              {commentStatus === "success" ? commentData.data.length : 0}
            </Col>
          </Row>
          <Row
            className="mt-3"
            style={{
              overflow: "scroll",
              height: 450,
              padding: 10,
              marginRight: 10,
            }}
          >
            {commentStatus === "success" && commentData.data.length > 0 ? (
              commentSlice.map((val, index) => (
                <ListComments
                  key={index}
                  data={val}
                  logged={logged}
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
                  marginTop: 50,
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
            {commentStatus === "success" ? (
              commentData.data.length > 0 ? (
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
              )
            ) : (
              ""
            )}
          </Row>
        </div>
      }
    />
  );
};
