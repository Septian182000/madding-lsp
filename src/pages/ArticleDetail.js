import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import {
  getDetailArticle,
  selectDetailArticleData,
  getDetailArticleStatus,
} from "../lib/state_manager/reducers/detailArticleSlice";

export default function ArticleDetail() {
  // redux
  const dispatch = useDispatch();
  const detailData = useSelector(selectDetailArticleData);
  const detailStatus = useSelector(getDetailArticleStatus);
  //

  const params = useParams();

  useEffect(() => {
    dispatch(getDetailArticle({ id: params.idArticle }));
  }, [dispatch]);

  return (
    <Container className="mt-5">
      <Row>Hallo</Row>
    </Container>
  );
}
