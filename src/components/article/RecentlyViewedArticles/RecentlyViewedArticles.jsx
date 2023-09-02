import { useState, useEffect } from "react";
import { Row, Col, Card, Carousel } from "react-bootstrap";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

import classes from "./RecentlyViewedArticles.module.css";

function RecentlyViewedArticles() {
  const navigate = useNavigate();
  const [viewedArticles, setViewedArticles] = useState([]);
  const { token } = useStateContext();

  useEffect(() => {
    if (token != null) getViewedArticles();
  }, []);

  const getViewedArticles = async () => {
    try {
      const response = await axiosClient.get("/getviewedarticles");
      setViewedArticles(response.data.data);
      return response.data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
        }
      }
    }
  };

  const navigateToArticlePage = (id) => {
    const encodedId = btoa(id.toString());
    navigate(`/articlepage?id=${encodedId}`);
  };

  return (
    <>
      {viewedArticles.length > 0 && (
        <>
          <Row className="w-100 p-3 pt-5 bg-light">
            <h4>You recently viewed:</h4>
          </Row>
          <Row className="w-100 px-3 pb-3 bg-light d-flex justify-content-center">
            <Carousel variant="dark" interval={null}>
              <Carousel.Item>
                <Row className="justify-content-start">
                  {viewedArticles.slice(0, 4).map((item, index) => (
                    <Col key={index} xs={12} md={3} lg={3} xl={3}>
                      <Card className="my-3">
                        <Card.Img
                          role="button"
                          variant="top"
                          className={classes.card_img}
                          src={
                            item.default_image
                              ? item.default_image
                              : item.first_image
                              ? item.first_image
                              : item.second_image
                              ? item.second_image
                              : item.third_image
                              ? item.third_image
                              : "no_image_available.jpg"
                          }
                          onClick={() => navigateToArticlePage(item.article_id)}
                        />
                        <Card.Body>
                          <Card.Title
                            role="button"
                            onClick={() =>
                              navigateToArticlePage(item.article_id)
                            }
                          >
                            {item.display_name}
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {item.brand_name}
                          </Card.Subtitle>
                          <Row className="w-100 mx-0 px-0 d-flex justify-content-between align-items-center">
                            <Col className="px-0">
                              <Card.Text>{item.price} RON</Card.Text>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
              {viewedArticles.length > 4 && (
                <Carousel.Item>
                  <Row className="justify-content-start">
                    {viewedArticles.slice(4, 8).map((item, index) => (
                      <Col key={index} xs={12} md={3} lg={3} xl={3}>
                        <Card className="my-3">
                          <Card.Img
                            role="button"
                            variant="top"
                            className={classes.card_img}
                            src={
                              item.default_image
                                ? item.default_image
                                : item.first_image
                                ? item.first_image
                                : item.second_image
                                ? item.second_image
                                : item.third_image
                                ? item.third_image
                                : "no_image_available.jpg"
                            }
                            onClick={() =>
                              navigateToArticlePage(item.article_id)
                            }
                          />
                          <Card.Body>
                            <Card.Title
                              role="button"
                              onClick={() =>
                                navigateToArticlePage(item.article_id)
                              }
                            >
                              {item.display_name}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {item.brand_name}
                            </Card.Subtitle>
                            <Row className="w-100 mx-0 px-0 d-flex justify-content-between align-items-center">
                              <Col className="px-0">
                                <Card.Text>{item.price} RON</Card.Text>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              )}
              {viewedArticles.length > 8 && (
                <Carousel.Item>
                  <Row className="justify-content-start">
                    {viewedArticles.slice(8, 10).map((item, index) => (
                      <Col key={index} xs={12} md={3} lg={3} xl={3}>
                        <Card className="my-3">
                          <Card.Img
                            role="button"
                            variant="top"
                            className={classes.card_img}
                            src={
                              item.default_image
                                ? item.default_image
                                : item.first_image
                                ? item.first_image
                                : item.second_image
                                ? item.second_image
                                : item.third_image
                                ? item.third_image
                                : "no_image_available.jpg"
                            }
                            onClick={() =>
                              navigateToArticlePage(item.article_id)
                            }
                          />
                          <Card.Body>
                            <Card.Title
                              role="button"
                              onClick={() =>
                                navigateToArticlePage(item.article_id)
                              }
                            >
                              {item.display_name}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              {item.brand_name}
                            </Card.Subtitle>
                            <Row className="w-100 mx-0 px-0 d-flex justify-content-between align-items-center">
                              <Col className="px-0">
                                <Card.Text>{item.price} RON</Card.Text>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              )}
            </Carousel>
          </Row>
        </>
      )}
    </>
  );
}

export default RecentlyViewedArticles;
