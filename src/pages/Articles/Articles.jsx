import classes from "./Articles.module.css";

import axiosClient from "../../axios-client";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import Loading from "../../components/Loading";

import { InView } from "react-intersection-observer";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Articles() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const gender = query.get("gender");
  const category = query.get("category");
  const subCategory = query.get("subcategory");
  const articleType = query.get("articletype");

  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState([]);
  const [formData, setFormData] = useState({});
  const [filtersDropdownIsOpen, setFiltersDropdownIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = "Articles";
    setIsLoading(true);
    setCurrentPage(1); // Resetting currentPage to 1
    getArticles(formData, 1); // Starting from page 1
  }, [location]); // Re-run effect if `location` changes

  const handleSortChange = (e) => {
    const sortType = e.currentTarget.getAttribute("value");
    // Update the URL with the sorting parameter
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sort", sortType);
    window.history.pushState({}, "", currentUrl.toString());
    setIsLoading(true);
    // Call the function to get articles with sorting
    getArticles();
  };

  const navigateToArticlePage = (id) => {
    const encodedId = btoa(id.toString());
    navigate(`/articlepage?id=${encodedId}`);
  };

  const handleCheckboxChange = (filterTitle, value, isChecked) => {
    let updatedFormData = { ...formData };

    if (isChecked) {
      if (!updatedFormData[filterTitle]) {
        updatedFormData[filterTitle] = [];
      }
      updatedFormData[filterTitle].push(value);
    } else {
      updatedFormData[filterTitle] = updatedFormData[filterTitle].filter(
        (item) => item !== value
      );
    }

    setFormData(updatedFormData);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    getArticles();
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const getArticles = async (currentFilters = formData, page = 1) => {
    setIsLoading(true);
    let verif = 0; // to check if URL parameters have started

    // Base URL construction
    let url = "/article";
    url += gender ? "/" + gender : "";
    url += category ? "/" + category : "";
    url += subCategory ? "/" + subCategory : "";
    url += articleType ? "/" + articleType : "";

    // Add sorting type if available
    const currentQuery = new URLSearchParams(window.location.search);
    const sortType = currentQuery.get("sort");
    if (sortType) {
      url += (verif ? "&" : "?") + `sort=${sortType}`;
      verif = 1; // set flag to indicate parameters have started
    }

    // Add filters if available
    const filterKeys = ["Brand", "Colour", "Usage", "Season", "Pattern"];
    filterKeys.forEach((key) => {
      if (currentFilters[key]) {
        currentFilters[key].forEach((item, index) => {
          url += (verif ? "&" : "?") + `${key.toLowerCase()}${index}=${item}`;
          verif = 1;
        });
      }
    });

    // Add page information
    url += (verif ? "&" : "?") + `page=${page}`;

    try {
      const response = await axiosClient.get(url);
      const data = response.data.data;

      if (page === 1) {
        setArticles(data.articles.data); // If it's the first page, replace the articles
      } else {
        setArticles((prevArticles) => [...prevArticles, ...data.articles.data]); // Else, append the new articles
      }

      setCurrentPage(page + 1); // increment current page
      setHasMore(data.last_page > data.current_page); // set if there are more articles to load

      setFilters(data.filters); // Set filters if you have any
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setFormData({});
    getArticles({});
    setFiltersDropdownIsOpen(false);
    setIsLoading(true);
  };

  return (
    <>
      <Button
        variant="light"
        className="position-fixed"
        style={{ bottom: "10px", right: "10px" }}
        onClick={() => scrollTop()}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>
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
            {/* schimbat dinamic in functie de ce categorie/subcategorie/articletype e ales */}
            <h1 className="py-3 text-center">
              {articleType
                ? articleType
                : subCategory
                ? subCategory
                : category
                ? category
                : gender}
            </h1>
          </Col>
        </Row>

        <Row className="w-100 mx-0 py-3 bg-light">
          <Col className="d-flex" xl={12} lg={12} md={12} sm={12} xs={12}>
            <DropdownButton title="Sort by" variant="light">
              <Dropdown.Item value="asc" onClick={handleSortChange}>
                Lowest to highest price
              </Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item value="desc" onClick={handleSortChange}>
                Highest to lowest price
              </Dropdown.Item>
            </DropdownButton>

            <Dropdown
              className="mx-2"
              show={filtersDropdownIsOpen}
              onToggle={(isOpen) => setFiltersDropdownIsOpen(isOpen)}
            >
              <Dropdown.Toggle variant="light">
                Filters{"  "}
                {/* <FontAwesomeIcon icon={faSliders} /> */}
              </Dropdown.Toggle>

              <Dropdown.Menu className="px-2">
                <Form onSubmit={handleFormSubmit} className="w-100">
                  <Row className="d-flex flex-xl-nowrap flex-lg-nowrap flex-md-nowrap align-items-center justify-content-sm-center justify-content-xs-center">
                    {filters.map((filter, index) => (
                      <Col
                        key={index}
                        className="d-flex justify-content-sm-center justify-content-xs-center"
                      >
                        <Dropdown>
                          <Dropdown.Toggle variant="light">
                            {filter.title}
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            className={classes.scrollable_dropdown}
                          >
                            {filter.values.map((subItem, subIndex) => (
                              <Form.Check
                                type="checkbox"
                                id={`${filter.title}-${subIndex}`}
                                key={subIndex}
                                className="mx-2 d-flex align-items-center label-parent"
                                label={
                                  <div className="d-flex align-items-center justify-content-between">
                                    <span className="mx-2">{subItem}</span>
                                    {filter.title === "Colour" && (
                                      <span
                                        className="ms-3 border"
                                        style={{
                                          background: subItem,
                                          width: 15,
                                          height: 15,
                                        }}
                                      ></span>
                                    )}
                                  </div>
                                }
                                checked={
                                  formData[filter.title] &&
                                  formData[filter.title].includes(subItem)
                                }
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    filter.title,
                                    subItem,
                                    e.target.checked
                                  )
                                }
                              />
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    ))}
                    <Col className="d-flex justify-content-sm-center justify-content-xs-center">
                      <Button
                        variant="outline-success"
                        type="submit"
                        size="md"
                        onClick={() => setFiltersDropdownIsOpen(false)}
                      >
                        Filter
                      </Button>
                    </Col>

                    <Col className="d-flex justify-content-sm-center justify-content-xs-center">
                      <Button
                        variant="outline-danger"
                        type="button"
                        size="md"
                        onClick={() => resetFilters()}
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row xs={1} md={3} lg={3} xl={4} className="w-100 m-0 bg-light">
          {articles.map((item, index) => (
            <Col key={index} id={index}>
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
                    onClick={() => navigateToArticlePage(item.article_id)}
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
                    <Col className="d-flex justify-content-end px-0">
                      <Button variant="light">
                        <FontAwesomeIcon icon={faCartShopping} />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <InView
            as="div"
            className="w-100"
            onChange={(inView, entry) => {
              if (inView && hasMore) {
                getArticles(formData, currentPage); // Make sure you're passing the currentPage here
              }
            }}
          >
            {hasMore && <Loading />}
          </InView>
        </Row>
      </Container>
    </>
  );
}

export default Articles;
