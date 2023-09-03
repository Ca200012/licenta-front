import { useState, useEffect } from "react";
import { Row, Col, Card, Carousel } from "react-bootstrap";
import axiosClient from "../../../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";

import classes from "./RecentlyViewedArticles.module.css";

function RecentlyViewedArticles() {
  const navigate = useNavigate();
  const [viewedArticles, setViewedArticles] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const { token } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setItemsPerSlide(1);
      } else if (width <= 768) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const articleSlices = [];
  for (let i = 0; i < viewedArticles.length; i += itemsPerSlide) {
    articleSlices.push(viewedArticles.slice(i, i + itemsPerSlide));
  }

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
          <Row className="w-100 p-3 bg-light d-flex justify-content-center">
            <Carousel variant="dark" interval={null} className="p-3">
              {articleSlices.map((articleSlice, sliceIndex) => (
                <Carousel.Item key={sliceIndex}>
                  <Row className="justify-content-start">
                    {articleSlice.map((item, index) => (
                      <Col
                        key={index}
                        xs={12}
                        md={itemsPerSlide === 2 ? 6 : 3}
                        lg={3}
                        xl={3}
                      >
                        <Card className="h-100">
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
              ))}
            </Carousel>
          </Row>
        </>
      )}
    </>
  );
}

export default RecentlyViewedArticles;
