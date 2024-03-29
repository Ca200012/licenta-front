import { useLocation } from "react-router-dom";
import classes from "./ArticlePage.module.css";
import axiosClient from "../../axios-client";
import SizeGuide from "../../components/article/SizeGuide";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  Row,
  Col,
  Carousel,
  Button,
  Accordion,
} from "react-bootstrap";
import { useEffect, useState } from "react";

import AddToCart from "../../components/cart/AddToCart";
import Loading from "../../components/Loading";
import CustomAlert from "../../components/CustomAlert";
import RecentlyViewedArticles from "../../components/article/RecentlyViewedArticles/RecentlyViewedArticles";
import RecommendedArticles from "../../components/article/RecommendedArticles/RecommendedArticles";
import { useStateContext } from "../../contexts/ContextProvider";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ArticlePage() {
  const query = useQuery();
  const location = useLocation();
  const encodedId = query.get("id");
  const decodedId = atob(encodedId);

  const [articleData, setArticleData] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useStateContext();

  const [alert, setAlert] = useState({
    variant: "primary",
    message: null,
    visible: false,
  });

  const isDisabledS = articleData.size_S_availability === 0;
  const isDisabledM = articleData.size_M_availability === 0;
  const isDisabledL = articleData.size_L_availability === 0;
  const isDisabledXL = articleData.size_XL_availability === 0;
  const isDisabledXXL = articleData.size_XXL_availability === 0;

  useEffect(() => {
    document.title = "Article Page";
    getArticleData(decodedId);
    if (token) {
      addViewedArticle(decodedId);
    }
  }, [decodedId, token]);

  useEffect(() => {
    const encodedId = query.get("id");
    const id = atob(encodedId);

    getArticleData(id);
  }, [location]);

  useEffect(() => {
    let timer;
    if (alert.visible) {
      timer = setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [alert.visible]);

  const handleItemNotAddedToCart = (err) => {
    setSelectedSize(null);
    setAlert({
      variant: "danger",
      message: err,
      visible: true,
    });
  };

  const handleItemAddedToCart = () => {
    setSelectedSize(null);
    setAlert({
      variant: "success",
      message: "Item successfully added to cart!",
      visible: true,
    });
  };

  const getArticleData = async (id) => {
    try {
      const response = await axiosClient.get("/articledata/" + id);
      const data = response.data.data;
      setArticleData(data[0]);
      return data;
    } catch (err) {
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addViewedArticle = async (id) => {
    if (!id) {
      console.error("Article ID or selected size is missing.");
      return;
    }

    const payload = {
      article_id: id,
    };

    try {
      const response = await axiosClient.post("/viewedarticle", payload);
      const data = response.data;
    } catch (err) {
      console.error(err);
      const response = err.response;
      if (response && response.status !== 200) {
        if (response.data.errors) {
          console.error(response.data.errors, "check errors");
        }
      }
    }
  };

  return (
    <Container
      className={`${classes.cover} d-flex align-items-center flex-fill flex-column position-relative p-0 py-5`}
    >
      {alert.visible && (
        <CustomAlert
          variant={alert.variant}
          message={alert.message}
          onClose={() =>
            setAlert((prevAlert) => ({ ...prevAlert, visible: false }))
          }
        />
      )}
      <Row className="w-100 mx-0">
        <Col
          className={`${classes.header} p-0`}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
        >
          <h1 className="py-3 text-center">{articleData.display_name}</h1>
        </Col>
      </Row>

      <Row className="w-100 mx-0 bg-light py-3 px-5 ">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="py-3">
              <Carousel variant="dark" className="">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={articleData.default_image}
                  />
                </Carousel.Item>
                {articleData.first_image && (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={articleData.first_image}
                    />
                  </Carousel.Item>
                )}
                {articleData.second_image && (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={articleData.second_image}
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </Col>
            <Col xl={6} lg={6} md={6} sm={12} xs={12} className="py-4">
              <h4 className="">{articleData.display_name}</h4>
              <h6 className="text-muted">{articleData.brand_name}</h6>
              <h6 className="text-muted">{articleData.colour}</h6>
              <h5 className="py-4">{articleData.price} RON</h5>
              <h6>Sizes</h6>
              <Button
                variant="outline-dark"
                className="me-2"
                disabled={isDisabledS}
                title="Add size S to cart"
                onClick={() => setSelectedSize("S")}
                active={selectedSize == "S"}
              >
                S
              </Button>
              <Button
                variant="outline-dark"
                className="me-2"
                disabled={isDisabledM}
                title="Add size M to cart"
                onClick={() => setSelectedSize("M")}
                active={selectedSize == "M"}
              >
                M
              </Button>
              <Button
                variant="outline-dark"
                className="me-2"
                disabled={isDisabledL}
                title="Add size L to cart"
                onClick={() => setSelectedSize("L")}
                active={selectedSize == "L"}
              >
                L
              </Button>
              <Button
                variant="outline-dark"
                className="me-2"
                disabled={isDisabledXL}
                title="Add size XL to cart"
                onClick={() => setSelectedSize("XL")}
                active={selectedSize == "XL"}
              >
                XL
              </Button>
              <Button
                variant="outline-dark"
                className="me-2"
                disabled={isDisabledXXL}
                title="Add size XXL to cart"
                onClick={() => setSelectedSize("XXL")}
                active={selectedSize == "XXL"}
              >
                XXL
              </Button>

              <AddToCart
                articleId={decodedId}
                selectedSize={selectedSize}
                size={"md"}
                icon={faCartShopping}
                onAdd={handleItemAddedToCart}
                onNotAdd={handleItemNotAddedToCart}
              />

              <Accordion defaultActiveKey="0" className="py-5">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Description</Accordion.Header>
                  <Accordion.Body>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: articleData.description,
                      }}
                    ></div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Shipping and payment</Accordion.Header>
                  <Accordion.Body>
                    <h6 className="fw-bold">Shipping</h6>
                    <div>
                      We offer fast and reliable shipping right to your doorstep
                      or to another location of your choosing, anywhere in
                      Romania.
                    </div>
                    <h6 className="fw-bold">Payment</h6>
                    <div>
                      Enjoy a hassle-free payment experience with our "Cash on
                      Delivery" option. Simply choose this method during
                      checkout, and you can pay in cash when your order arrives
                      at your doorstep. No need for online transactions or card
                      payments.
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Size guide</Accordion.Header>
                  <Accordion.Body>
                    <SizeGuide />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </>
        )}
      </Row>
      <RecommendedArticles />
      {token != null && <RecentlyViewedArticles />}
    </Container>
  );
}

export default ArticlePage;
