import React, { useState } from "react";
import classes from "./Home.module.css";
import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import RecommendedArticles from "../../components/article/RecommendedArticles/RecommendedArticles";
import RecentlyViewedArticles from "../../components/article/RecentlyViewedArticles/RecentlyViewedArticles";
import Loading from "../../components/Loading";
import { useStateContext } from "../../contexts/ContextProvider";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useStateContext();

  useEffect(() => {
    document.title = "Home page";
  }, []);

  const handleLoadingStatus = (status) => {
    setIsLoading(status);
  };

  const navigateToWomen = () => {
    navigate("/articles?gender=Women");
  };

  const navigateToMen = () => {
    navigate("/articles?gender=Men");
  };

  return (
    <Container
      className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 py-5`}
    >
      <Row className="w-100 mx-0">
        <Col
          className={`${classes.header} p-0`}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <h1 className="py-3 text-center">Home</h1>
        </Col>
      </Row>

      <Row className={`${classes.shadow} w-100 mx-0`}>
        <Col
          className={`${classes.hoverable_element} p-0 text-center position-relative`}
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
        >
          <img className="d-block w-100 h-100" src="./women-home.jpg" />
          {!isLoading && (
            <Button
              variant="light"
              size="md"
              className={`${classes.grad} mx-0 position-absolute women_button`}
              onClick={() => {
                navigateToWomen();
              }}
            >
              Discover Women's collection
            </Button>
          )}
        </Col>

        <Col
          className={`${classes.hoverable_element} p-0 text-center position-relative`}
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
        >
          <img className="d-block w-100 h-100" src="./men-home.jpg" />
          {!isLoading && (
            <Button
              variant="light"
              size="md"
              className={`${classes.grad} mx-0 position-absolute men_button`}
              onClick={() => {
                navigateToMen();
              }}
            >
              Discover Men's collection
            </Button>
          )}
        </Col>
      </Row>

      {isLoading && <Loading />}

      <RecommendedArticles onLoadingStatusChange={handleLoadingStatus} />

      {!isLoading && token && (
        <>
          <RecentlyViewedArticles />
        </>
      )}
    </Container>
  );
}

export default Home;
