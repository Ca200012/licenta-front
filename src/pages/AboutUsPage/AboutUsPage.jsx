import { Row, Col, Container } from "react-bootstrap";

import classes from "./AboutUsPage.module.css";

function AboutUsPage() {
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
          <h1 className="py-3 text-center">About us</h1>
        </Col>
      </Row>
      <Row className="bg-light w-100 p-3">
        <section class="about-info">
          <h2>Welcome to our website!</h2>
          <p>
            We are passionate about providing you with a diverse range of
            clothing and accessories that cater to various styles and
            preferences. We believe that fashion is a means of self-expression
            and a way to showcase your personality.
          </p>
          <p>
            With years of experience in the industry, we have established
            ourselves as a trusted destination for fashion enthusiasts looking
            to explore new trends and discover pieces that resonate with them.
          </p>
        </section>

        <section class="our-story">
          <h2>Our Story</h2>
          <p>
            Our journey started with a shared love for fashion and a desire to
            create a platform where individuals can find pieces that empower
            them to embrace their uniqueness. We began as a small team of
            dedicated individuals who believed in the power of fashion to
            inspire confidence and creativity.
          </p>
          <p>
            Over time, we have expanded our offerings, collaborating with
            designers, artisans, and brands that share our values of quality,
            diversity, and sustainability.
          </p>
        </section>

        <section class="mission-vision">
          <h2>Our Mission and Vision</h2>
          <p>
            Our mission is to curate a collection that caters to a wide range of
            tastes, styles, and occasions. We want to be your go-to destination
            for clothing and accessories that empower you to express yourself
            and feel comfortable in your own skin.
          </p>
          <p>
            Our vision is to continue growing as a community where fashion
            enthusiasts can find inspiration, connect with like-minded
            individuals, and access products that enhance their personal style
            journey.
          </p>
        </section>
      </Row>
    </Container>
  );
}

export default AboutUsPage;
