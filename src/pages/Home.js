import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { SearchTextField } from "../components/textFields/SearchTextField";
import icSearch from "../assets/icons/icSearch.png";
import { LoadingView } from "../components/loading/LoadingViews";
import { ListArticle } from "../components/features/ListArticle";
import { Pagination } from "../components/modules/Pagination";
import { ModalAddArticle } from "../components/features/ModalAddArticle";
import { ModalLogout } from "../components/features/ModalLogout";
import imgNotFound from "../assets/image/notFound.png";
import {
  getArticle,
  selectArticleData,
  getArticleStatus,
} from "../lib/state_manager/reducers/articleSlice";

export default function Home({ user, userID, logged }) {
  // redux
  const dispatch = useDispatch();
  const articleData = useSelector(selectArticleData);
  const articleStatus = useSelector(getArticleStatus);
  //

  const [search, setSearch] = useState("");
  const [getSearch, setGetSearch] = useState("");

  // set loading
  const [isLoading, setIsLoading] = useState(true);
  //

  // show modal add
  const [modalAdd, setModalAdd] = useState(false);
  const handleCloseModal = () => {
    setModalAdd((val) => !val);
  };
  //

  // show modal logout
  const [modalLogout, setModalLogout] = useState(false);
  const handleCloseModalLogout = () => {
    setModalLogout((val) => !val);
  };
  //

  // logout
  const handleLogout = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("role_name");
    sessionStorage.removeItem("id_admin");
    window.location.reload();
  };
  //

  // set pagination
  const [articleSlice, setArticleSlice] = useState([]);
  const [filter, setFilter] = useState({
    page: 3,
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
    dispatch(getArticle({ search: getSearch }));
  }, [dispatch, getSearch]);

  useEffect(() => {
    if (articleStatus === "success" && articleData) {
      if (
        articleData.data === "Success create article" ||
        articleData.data === "Success delete article" ||
        articleData.data === "Success update article"
      ) {
        dispatch(getArticle({ search: getSearch }));
      }
    }
  }, [dispatch, articleStatus, articleData, getSearch]);

  useEffect(() => {
    if (articleStatus === "success" && articleData) {
      if (
        articleData.data !== "Success create article" &&
        articleData.data !== "Success delete article" &&
        articleData.data !== "Success update article"
      ) {
        const startIndex = paginationState.currentPage * filter.page;
        const lastIndex = startIndex + filter.page;

        setArticleSlice(articleData.data.slice(startIndex, lastIndex));
        setIsLoading(false);
      }
    }
  }, [articleStatus, articleData, paginationState, filter]);

  return (
    <Container className="mt-5">
      <ModalAddArticle
        isOpen={modalAdd}
        closeModal={handleCloseModal}
        userID={userID}
      />
      <ModalLogout
        isOpen={modalLogout}
        closeModal={handleCloseModalLogout}
        onLogout={handleLogout}
      />
      {logged === "admin" ? (
        <Row style={{ fontFamily: "Rubik", fontWeight: 600, fontSize: 20 }}>
          <Col lg={"auto"}>
            <span>Hello, {user}</span>
          </Col>
          <Col>
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="xl"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setModalLogout(true);
              }}
            />
          </Col>
        </Row>
      ) : (
        ""
      )}
      <Row className="justify-content-center">
        <SearchTextField
          width={400}
          icon={icSearch}
          placeholder={"Search"}
          search={search}
          setSearch={setSearch}
          setGetSearch={setGetSearch}
        />
      </Row>

      <Row className="mt-5 " style={{ justifyContent: "space-between" }}>
        <Col
          lg={"auto"}
          style={{
            marginLeft: "15%",
            fontFamily: "Rubik",
            fontWeight: 600,
            fontSize: 20,
            marginTop: 20,
          }}
        >
          Total :{" "}
          <span style={{ color: "green" }}>
            {articleStatus === "success" ? articleData.data.length ?? 0 : 0}
          </span>
        </Col>
        {logged === "admin" ? (
          <Col
            lg={"auto"}
            style={{
              borderRadius: 10,
              border: "2px solid black",
              display: "flex",
              color: "black",
              fontFamily: "Rubik",
              fontWeight: 600,
              padding: 11,
              cursor: "pointer",
            }}
            onClick={() => {
              setModalAdd(true);
            }}
          >
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={{
                width: 25,
                height: 25,
                color: "green",
                cursor: "pointer",
                marginRight: 7,
              }}
            />
            <span>Tambah</span>
          </Col>
        ) : (
          ""
        )}
      </Row>
      <Row className="mb-4">
        {isLoading ? (
          <LoadingView height={400} width={"100%"} />
        ) : articleData.data.length > 0 ? (
          articleSlice.map((data, index) => (
            <ListArticle key={index} data={data} logged={logged} />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <figure>
              <img
                style={{
                  height: 250,
                }}
                src={imgNotFound}
                alt="not-found"
              />
              <figcaption className="text-center mt-4">
                <span
                  style={{
                    color: "black",
                    fontFamily: "Rubik",
                    fontSize: 24,
                    fontWeight: 600,
                  }}
                >
                  No result found
                </span>
              </figcaption>
              <figcaption className="text-center" style={{ marginTop: 10 }}>
                <span
                  style={{
                    color: "#90909C",
                    fontFamily: "Rubik",
                    fontSize: 17,
                    fontWeight: 600,
                  }}
                >
                  The data is empty
                </span>
              </figcaption>
            </figure>
          </div>
        )}
      </Row>
      {articleSlice.length > 0 ? (
        <Row className="mb-5 justify-content-center">
          <Col lg={"auto"}>
            <Pagination
              currentPage={paginationState.currentPage}
              onPageChange={onPageChange}
              pageCount={Math.ceil(articleData.data.length / filter.page)}
            />
          </Col>
        </Row>
      ) : (
        ""
      )}
    </Container>
  );
}
