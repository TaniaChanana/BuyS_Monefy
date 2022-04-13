import React from 'react';
import './Home.css';
import Header from '../header/Header';
import bgimage from '../../assets/im.png'
import aboutimage from '../../assets/about.png';
import contactimage from '../../assets/contact.png';
import logo from '../../assets/logo.png';
import t1 from "../../assets/testimonials/testimonials-1.jpg";
import { Link } from 'react-router-dom';
function Home() {
    return (
        <>
            <div className="home">
                <Header />
                {/* <h1>Buys Monefy</h1> */}
                <div id = 'home' className='d-flex align-items-center justify-content-between container pt-4 home-container'>
                    <div className='home-details'>
                        {/* <h1 className="home-details-heading">Welcome to <br /><span>BuyS Monefy</span></h1>
            <h4>A website to settle buyer and supplier payment.</h4> */}
                        <h1 class="display-3 text-center text-md-start">
                            Welcome to <br /> <span class="text-primary">BuyS Monefy</span>.
                        </h1>
                        <h4 class="display-6 text-center text-md-start">
                            Transactions made simple.
                        </h4>
                        <p class="lead text-center text-md-start text-muted mb-6 mb-lg-8">
                            A website to settle buyer and supplier payment.
                        </p>
                        <Link to="./Login" class="btn btn-lg btn-primary shadow lift me-1">
                            Login
                      </Link>

                    </div>
                    <img src={bgimage} />
                </div>
                <div id = 'about' className='about py-5 my-3 d-flex flex-column align-items-center'>
                    <h1 class="display-3 text-md-start text-primary my-4" >About</h1>
                    <div className='d-flex justify-content-between align-items-center'>
                        <img src={aboutimage} />
                        <p className='lead text-center text-md-start text-muted mb-6 mb-lg-8'>BuyS Monefy :
                         As its name indicates it will manage the money transactions between buyers and
                        suppliers to remove the financial stress from the supplier. In our project 
                        all the e-commerce sites like amazon, flipkart, myntra etc. are acting as a 
                        buyer and all the wholesalers/retailers those are registered with these sites 
                        are acting as a suppliers. When the buyer buy any product in a bulk quantity from the supplier and not able to do the early payment to the supplier but as supplier needs money to purchase raw material for developing product so supplier will take a loan from bank.
                        Then there will be an agreement between the buyer and supplier that loan will 
                        be paid off by the buyer. At the time of agreement the bank will take the 
                        collateral from the buyer so that buyer can’t step back at the time of payment 
                        of loan.
                    </p>
                    </div>
                </div>

                <div id = 'services' className='service py-5 my-3 d-flex flex-column align-items-center'>
                    <h1 class="display-3 text-md-start text-primary my-4">Services</h1>
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-4 aos-init aos-animate" data-aos="fade-up">
                                <div class="icon text-primary mb-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M7 3h10a4 4 0 110 8H7a4 4 0 110-8zm0 6a2 2 0 100-4 2 2 0 000 4z" fill="#335EEA"></path><path d="M7 13h10a4 4 0 110 8H7a4 4 0 110-8zm10 6a2 2 0 100-4 2 2 0 000 4z" fill="#335EEA" opacity=".3"></path></g></svg>            </div>

                                <h3>
                                    Built for Buyers
                                </h3>
                                <p class="text-muted mb-6 mb-md-0">
                                    Buyer can purchase any item based on his/her choice. He can purchase item from
                                    any supplier according to his convenient.
                                </p>

                            </div>
                            <div class="col-12 col-md-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="50">

                                <div class="icon text-primary mb-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M5.5 4h4A1.5 1.5 0 0111 5.5v1A1.5 1.5 0 019.5 8h-4A1.5 1.5 0 014 6.5v-1A1.5 1.5 0 015.5 4zm9 12h4a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-1a1.5 1.5 0 011.5-1.5z" fill="#335EEA"></path><path d="M5.5 10h4a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 019.5 20h-4A1.5 1.5 0 014 18.5v-7A1.5 1.5 0 015.5 10zm9-6h4A1.5 1.5 0 0120 5.5v7a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-7A1.5 1.5 0 0114.5 4z" fill="#335EEA" opacity=".3"></path></g></svg>            </div>

                                <h3>
                                    Built for Suppliers
                                </h3>
                                <p class="text-muted mb-6 mb-md-0">
                                    Supplier can add any item according to the stock available. He can view his transactions and bank details also.
                                </p>

                            </div>
                            <div class="col-12 col-md-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">

                                <div class="icon text-primary mb-3">
                                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M17.272 8.685a1 1 0 111.456-1.37l4 4.25a1 1 0 010 1.37l-4 4.25a1 1 0 01-1.456-1.37l3.355-3.565-3.355-3.565zm-10.544 0L3.373 12.25l3.355 3.565a1 1 0 01-1.456 1.37l-4-4.25a1 1 0 010-1.37l4-4.25a1 1 0 011.456 1.37z" fill="#335EEA"></path><rect fill="#335EEA" opacity=".3" transform="rotate(15 12 12)" x="11" y="4" width="2" height="16" rx="1"></rect></g></svg>            </div>

                                <h3>
                                    Built for Banks
                                </h3>
                                <p class="text-muted mb-0">
                                    User can create his bank account and bank can view all the accounts related to bank.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
        {/* testimonials section */}
    {/* <section id="testimonials" class="testimonials section-bg">
      <div class="container">

        <div class="section-title">
          <h2>Testimonials</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>

        <div class="owl-carousel testimonials-carousel">

          <div class="testimonial-item" data-aos="fade-up">
            <p>
              <i class="bx bxs-quote-alt-left quote-icon-left"></i>
              Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.
              <i class="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <img src={t1} class="testimonial-img" alt="" />
            <h3>Saul Goodman</h3>
            <h4>Ceo &amp; Founder</h4>
          </div>

          <div class="testimonial-item" data-aos="fade-up" data-aos-delay="100">
            <p>
              <i class="bx bxs-quote-alt-left quote-icon-left"></i>
              Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.
              <i class="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <img src={t1} class="testimonial-img" alt="" />
            <h3>Sara Wilsson</h3>
            <h4>Designer</h4>
          </div>

          <div class="testimonial-item" data-aos="fade-up" data-aos-delay="200">
            <p>
              <i class="bx bxs-quote-alt-left quote-icon-left"></i>
              Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.
              <i class="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <img src="../../assets/testimonials/testimonials-3.jpg" class="testimonial-img" alt="" />
            <h3>Jena Karlis</h3>
            <h4>Store Owner</h4>
          </div>

          <div class="testimonial-item" data-aos="fade-up" data-aos-delay="300">
            <p>
              <i class="bx bxs-quote-alt-left quote-icon-left"></i>
              Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.
              <i class="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <img src="../../assets/testimonials/testimonials-4.jpg" class="testimonial-img" alt="" />
            <h3>Matt Brandon</h3>
            <h4>Freelancer</h4>
          </div>

          <div class="testimonial-item" data-aos="fade-up" data-aos-delay="400">
            <p>
              <i class="bx bxs-quote-alt-left quote-icon-left"></i>
              Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.
              <i class="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <img src="../../assets/testimonials/testimonials-5.jpg" class="testimonial-img" alt="" />
            <h3>John Larson</h3>
            <h4>Entrepreneur</h4>
          </div>

        </div>

      </div>
    </section> */}

                <div id = 'contact' className='contact py-5 my-3 d-flex flex-column align-items-center'>
                    <h1 class="display-3 text-md-start text-primary my-4">Contact Us</h1>
                    <div className='d-flex justify-content-center align-items-center contact-container'>
                        <img src={contactimage} />
                        <form className='form-container'>
                            <div class="form-group">
                                <label for="exampleInputEmail1" className='mb-2'>Email address</label>
                                <input type="email" class="form-control mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1" className='mb-2'>Name</label>
                                <input type="text" class="form-control mb-2" id="exampleInputName1" placeholder="Enter name" />
                            </div>

                            <div class="form-group">
                                <label for="exampleInputMessage1" className='mb-2'>Message</label>
                                <textarea rows={5} type="text" class="form-control mb-2" id="exampleInputMessage1" placeholder="Enter Message" />
                            </div>

                            <button type="submit" class="btn btn-primary ">Submit</button>
                        </form>
                    </div>
                </div>
                <footer class="footer py-8 py-md-11 bg-gray-200">
                    <p>© Copyright 2022</p>
                    {/* <div class="container">
                        <div class="row">
                            <div class="col-12 col-md-4 col-lg-3">
                                <img src={logo} alt="..." class="footer-brand img-fluid mb-2" />
                                    <p class="text-gray-700 mb-2">
                                        A better way to build.
                                    </p>
                                    <ul class="list-unstyled list-inline list-social mb-6 mb-md-0">
                                        <li class="list-inline-item list-social-item me-3">
                                            <a href="#!" class="text-decoration-none">
                                                <img src="./assets/img/icons/social/instagram.svg" class="list-social-icon" alt="..." />
                                            </a>
                                        </li>
                                        <li class="list-inline-item list-social-item me-3">
                                            <a href="#!" class="text-decoration-none">
                                                <img src="./assets/img/icons/social/facebook.svg" class="list-social-icon" alt="..." />
                                            </a>
                                        </li>
                                        <li class="list-inline-item list-social-item me-3">
                                            <a href="#!" class="text-decoration-none">
                                                <img src="./assets/img/icons/social/twitter.svg" class="list-social-icon" alt="..." />
                                            </a>
                                        </li>
                                        <li class="list-inline-item list-social-item">
                                            <a href="#!" class="text-decoration-none">
                                                <img src="./assets/img/icons/social/pinterest.svg" class="list-social-icon" alt="..." />
                                            </a>
                                        </li>
                                    </ul>

                            </div>
                            <div class="col-6 col-md-4 col-lg-2">
                                <h6 class="fw-bold text-uppercase text-gray-700">
                                    Products
                                </h6>
                                <ul class="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Page Builder
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            UI Kit
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Styleguide
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#!" class="text-reset">
                                            Changelog
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            <div class="col-6 col-md-4 col-lg-2">
                                <h6 class="fw-bold text-uppercase text-gray-700">
                                    Services
                                </h6>
                                <ul class="list-unstyled text-muted mb-6 mb-md-8 mb-lg-0">
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Documentation
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Changelog
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Pagebuilder
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#!" class="text-reset">
                                            UI Kit
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            <div class="col-6 col-md-4 offset-md-4 col-lg-2 offset-lg-0">
                                <h6 class="fw-bold text-uppercase text-gray-700">
                                    Connect
                                </h6>
                                <ul class="list-unstyled text-muted mb-0">
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Page Builder
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            UI Kit
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Styleguide
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Documentation
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Changelog
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#!" class="text-reset">
                                            Changelog
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            <div class="col-6 col-md-4 col-lg-2">
                                <h6 class="fw-bold text-uppercase text-gray-700">
                                    Legal
                                </h6>
                                <ul class="list-unstyled text-muted mb-0">
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Documentation
                                        </a>
                                    </li>
                                    <li class="mb-3">
                                        <a href="#!" class="text-reset">
                                            Changelog
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#!" class="text-reset">
                                            Pagebuilder
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>  */}
                </footer>
            </div>
        </>
    )
}

export default Home
