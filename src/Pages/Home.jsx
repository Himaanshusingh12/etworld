import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
function Home() {
  return (
    <>
      <Navbar />
      {/* <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ height: "500px" }}>
            <img
              src="img/carousel-1.jpg"
              className="d-block w-100"
              alt="Transport & Logistics Solution"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white text-uppercase mb-3">
                Transport &amp; Logistics Solution
              </h5>
              <h1 className="display-3 text-white mb-4">
                #1 Place For Your{" "}
                <span className="text-primary">Logistics</span> Solution
              </h1>
              <p className="fs-5 fw-medium text-white mb-4 pb-2">
                Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam
                no. Kasd rebum ipsum et diam justo clita et kasd rebum sea
                elitr.
              </p>
              <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3">
                Read More
              </a>
              <a href="#" className="btn btn-secondary py-md-3 px-md-5">
                Free Quote
              </a>
            </div>
          </div>
          <div className="carousel-item" style={{ height: "500px" }}>
            <img
              src="img/carousel-2.jpg"
              className="d-block w-100"
              alt="Transport Solution"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white text-uppercase mb-3">
                Transport &amp; Logistics Solution
              </h5>
              <h1 className="display-3 text-white mb-4">
                #1 Place For Your{" "}
                <span className="text-primary">Transport</span> Solution
              </h1>
              <p className="fs-5 fw-medium text-white mb-4 pb-2">
                Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam
                no. Kasd rebum ipsum et diam justo clita et kasd rebum sea
                elitr.
              </p>
              <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3">
                Read More
              </a>
              <a href="#" className="btn btn-secondary py-md-3 px-md-5">
                Free Quote
              </a>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}
      {/* new one */}
      <div>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ height: "500px" }}>
              <img
                src="img/carousel-1.jpg"
                className="d-block w-100"
                alt="Transport & Logistics Solution"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="text-white text-uppercase mb-3">
                  Transport &amp; Logistics Solution
                </h5>
                <h1 className="display-3 text-white mb-4">
                  #1 Place For Your{" "}
                  <span className="text-primary">Logistics</span> Solution
                </h1>
                <p className="fs-5 fw-medium text-white mb-4 pb-2">
                  Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam
                  no. Kasd rebum ipsum et diam justo clita et kasd rebum sea
                  elitr.
                </p>
                <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3">
                  Read More
                </a>
                <a href="#" className="btn btn-secondary py-md-3 px-md-5">
                  Free Quote
                </a>
              </div>
            </div>
            <div className="carousel-item" style={{ height: "500px" }}>
              <img
                src="img/carousel-2.jpg"
                className="d-block w-100"
                alt="Transport Solution"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="text-white text-uppercase mb-3">
                  Transport &amp; Logistics Solution
                </h5>
                <h1 className="display-3 text-white mb-4">
                  #1 Place For Your{" "}
                  <span className="text-primary">Transport</span> Solution
                </h1>
                <p className="fs-5 fw-medium text-white mb-4 pb-2">
                  Vero elitr justo clita lorem. Ipsum dolor at sed stet sit diam
                  no. Kasd rebum ipsum et diam justo clita et kasd rebum sea
                  elitr.
                </p>
                <a href="#" className="btn btn-primary py-md-3 px-md-5 me-3">
                  Read More
                </a>
                <a href="#" className="btn btn-secondary py-md-3 px-md-5">
                  Free Quote
                </a>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* about section */}
        <section className="py-5">
          <div className="container-fluid overflow-hidden py-5 px-lg-0">
            <div className="container about py-5 px-lg-0">
              <div className="row g-5 mx-lg-0">
                <div
                  className="col-lg-6 ps-lg-0 wow fadeInLeft"
                  data-wow-delay="0.1s"
                  style={{ minHeight: 400 }}
                >
                  <div className="position-relative h-100">
                    <img
                      className="position-absolute img-fluid w-100 h-100"
                      src="img/about.jpg"
                      style={{ objectFit: "cover" }}
                      alt
                    />
                  </div>
                </div>
                <div
                  className="col-lg-6 about-text wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <h6 className="text-secondary text-uppercase mb-3">
                    About Us
                  </h6>
                  <h1 className="mb-5">
                    Quick Transport and Logistics Solutions
                  </h1>
                  <p className="mb-5">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                    sit, sed stet lorem sit clita duo justo magna dolore erat
                    amet
                  </p>
                  <div className="row g-4 mb-5">
                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.5s">
                      <i className="fa fa-globe fa-3x text-primary mb-3" />
                      <h5>Global Coverage</h5>
                      <p className="m-0">
                        Stet stet justo dolor sed duo. Ut clita sea sit ipsum
                        diam lorem diam justo.
                      </p>
                    </div>
                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.7s">
                      <i className="fa fa-shipping-fast fa-3x text-primary mb-3" />
                      <h5>On Time Delivery</h5>
                      <p className="m-0">
                        Stet stet justo dolor sed duo. Ut clita sea sit ipsum
                        diam lorem diam justo.
                      </p>
                    </div>
                  </div>
                  <a href className="btn btn-primary py-3 px-5">
                    Explore More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-5">
          <div className="container-xxl py-5">
            <div className="container py-5">
              <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="text-secondary text-uppercase">Our Services</h6>
                <h1 className="mb-5">Explore Our Services</h1>
              </div>
              <div className="row g-4">
                <div
                  className="col-md-6 col-lg-4 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="service-item p-4">
                    <div className="overflow-hidden mb-4">
                      <img className="img-fluid" src="img/service-1.jpg" alt />
                    </div>
                    <h4 className="mb-3">Air Freight</h4>
                    <p>
                      Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam
                      lorem diam.
                    </p>
                    <a className="btn-slide mt-2" href>
                      <i className="fa fa-arrow-right" />
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="service-item p-4">
                    <div className="overflow-hidden mb-4">
                      <img className="img-fluid" src="img/service-2.jpg" alt />
                    </div>
                    <h4 className="mb-3">Ocean Freight</h4>
                    <p>
                      Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam
                      lorem diam.
                    </p>
                    <a className="btn-slide mt-2" href>
                      <i className="fa fa-arrow-right" />
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="service-item p-4">
                    <div className="overflow-hidden mb-4">
                      <img className="img-fluid" src="img/service-3.jpg" alt />
                    </div>
                    <h4 className="mb-3">Road Freight</h4>
                    <p>
                      Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam
                      lorem diam.
                    </p>
                    <a className="btn-slide mt-2" href>
                      <i className="fa fa-arrow-right" />
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 wow fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <div className="service-item p-4">
                    <div className="overflow-hidden mb-4">
                      <img className="img-fluid" src="img/service-4.jpg" alt />
                    </div>
                    <h4 className="mb-3">Train Freight</h4>
                    <p>
                      Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam
                      lorem diam.
                    </p>
                    <a className="btn-slide mt-2" href>
                      <i className="fa fa-arrow-right" />
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 wow fadeInUp"
                  data-wow-delay="0.5s"
                >
                  <div className="service-item p-4">
                    <div className="overflow-hidden mb-4">
                      <img className="img-fluid" src="img/service-5.jpg" alt />
                    </div>
                    <h4 className="mb-3">Customs Clearance</h4>
                    <p>
                      Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam
                      lorem diam.
                    </p>
                    <a className="btn-slide mt-2" href>
                      <i className="fa fa-arrow-right" />
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
                <div
                  className="col-md-6 col-lg-4 wow fadeInUp"
                  data-wow-delay="0.7s"
                >
                  <div className="service-item p-4">
                    <div className="overflow-hidden mb-4">
                      <img className="img-fluid" src="img/service-6.jpg" alt />
                    </div>
                    <h4 className="mb-3">Warehouse Solutions</h4>
                    <p>
                      Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam
                      lorem diam.
                    </p>
                    <a className="btn-slide mt-2" href>
                      <i className="fa fa-arrow-right" />
                      <span>Read More</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-4">What Our Clients Say</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="p-4 shadow-sm bg-white rounded mb-4">
                  <p>
                    "Excellent logistics services! Fast, reliable, and very
                    professional. Highly recommend!"
                  </p>
                  <p className="fw-bold">- John Doe, CEO of ABC Corp</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-4 shadow-sm bg-white rounded mb-4">
                  <p>
                    "Our shipments always arrive on time, and the customer
                    service is top-notch."
                  </p>
                  <p className="fw-bold">- Jane Smith, Logistics Manager</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
