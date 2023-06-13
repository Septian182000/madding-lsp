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
import {
  getArticle,
  selectArticleData,
  getArticleStatus,
} from "../lib/state_manager/reducers/articleSlice";

export default function Home({ user, logged }) {
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

  // logout
  const handleLogout = () => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("role_name");
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
    dispatch(getArticle());
  }, [dispatch]);

  useEffect(() => {
    if (articleStatus === "success" && articleData) {
      const startIndex = paginationState.currentPage * filter.page;
      const lastIndex = startIndex + filter.page;

      setArticleSlice(articleData.slice(startIndex, lastIndex));
      setIsLoading(false);
    }
  }, [articleStatus, articleData, paginationState, filter]);

  return (
    <Container className="mt-5">
      <ModalAddArticle isOpen={modalAdd} closeModal={handleCloseModal} />
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
              onClick={handleLogout}
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
      {logged === "admin" ? (
        <Row className="mt-5 justify-content-end">
          <Col
            lg={"auto"}
            style={{
              borderRadius: 10,
              border: "2px solid black",
              display: "flex",
              color: "black",
              fontFamily: "Rubik",
              fontWeight: 600,
              padding: 8,
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
        </Row>
      ) : (
        ""
      )}
      <Row className="mb-4">
        {isLoading ? (
          <LoadingView height={400} width={"100%"} />
        ) : (
          articleSlice.map((data, index) => (
            <ListArticle key={index} data={data} logged={logged} />
          ))
        )}
      </Row>
      <Row className="mb-5 justify-content-center">
        <Col lg={"auto"}>
          <Pagination
            currentPage={paginationState.currentPage}
            onPageChange={onPageChange}
            pageCount={Math.ceil(articleData.length / filter.page)}
          />
        </Col>
      </Row>
    </Container>
  );
}
