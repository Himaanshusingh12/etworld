import React from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Logistic() {
  return (
    <>
      <Navbar />
      <Header title="Services" secondtitle="Services" />
      {/* Service Start */}
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
      {/* Service End */}
      {/* Team Start */}
      <div className="container-xxl py-5">
        <div className="container py-5">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="text-secondary text-uppercase">Our Team</h6>
            <h1 className="mb-5">Expert Team Members</h1>
          </div>
          <div className="row g-4">
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.3s"
            >
              <div className="team-item p-4">
                <div className="overflow-hidden mb-4">
                  <img className="img-fluid" src="img/team-1.jpg" alt />
                </div>
                <h5 className="mb-0">Full Name</h5>
                <p>Designation</p>
                <div className="btn-slide mt-1">
                  <i className="fa fa-share" />
                  <span>
                    <a href>
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href>
                      <i className="fab fa-twitter" />
                    </a>
                    <a href>
                      <i className="fab fa-instagram" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.5s"
            >
              <div className="team-item p-4">
                <div className="overflow-hidden mb-4">
                  <img className="img-fluid" src="img/team-2.jpg" alt />
                </div>
                <h5 className="mb-0">Full Name</h5>
                <p>Designation</p>
                <div className="btn-slide mt-1">
                  <i className="fa fa-share" />
                  <span>
                    <a href>
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href>
                      <i className="fab fa-twitter" />
                    </a>
                    <a href>
                      <i className="fab fa-instagram" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.7s"
            >
              <div className="team-item p-4">
                <div className="overflow-hidden mb-4">
                  <img className="img-fluid" src="img/team-3.jpg" alt />
                </div>
                <h5 className="mb-0">Full Name</h5>
                <p>Designation</p>
                <div className="btn-slide mt-1">
                  <i className="fa fa-share" />
                  <span>
                    <a href>
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href>
                      <i className="fab fa-twitter" />
                    </a>
                    <a href>
                      <i className="fab fa-instagram" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay="0.9s"
            >
              <div className="team-item p-4">
                <div className="overflow-hidden mb-4">
                  <img className="img-fluid" src="img/team-4.jpg" alt />
                </div>
                <h5 className="mb-0">Full Name</h5>
                <p>Designation</p>
                <div className="btn-slide mt-1">
                  <i className="fa fa-share" />
                  <span>
                    <a href>
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href>
                      <i className="fab fa-twitter" />
                    </a>
                    <a href>
                      <i className="fab fa-instagram" />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team End */}

      <Footer />
    </>
  );
}

export default Logistic;
