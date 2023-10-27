import {  Link } from "react-router-dom";
import "./Main.css";

export default function Main() {
    return (
      <div className="main" id="verytop">
        <div className="Home">
          <div className="upper">
            <nav className="navbar">
              <ul>
                <li>
                <Link to="/social">Social</Link>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#wex">About Us</a>
                </li>
                <li>
                  <a href="#prod">Products</a>
                </li>
                <li>
                <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>
            <img src="V.png" alt="v" className="vpng" />
            <div className="Homedet">
              <h2>Welcome to Veloxal!</h2>
              <br />
            </div>
          </div>
          <div className="lower">
            <div className="gallery" id="prod">
              <h1 className="pek">Products</h1>
              <h2>Our Top Items!</h2>
              <p>
                Disclaimer: I do NOT own any of the images used on this website.
                <br />
                <br /> However, they are not STOCK images. <br /> I have added my
                own designs to stock clothing images. <br />
                <br /> If there are any concerns about copyright laws, please send
                me an
                <a href="mailto:imveloxal@gmail.com" className="hone">
                  Email
                </a>
              </p>
              <div className="mainpr">
                <div className="ita1">
                  <p>
                    <a href="/tshirts">
                      <img
                        src="tshirt.png"
                        alt="tshirt"
                        className="item1"
                      />
                    </a>
                  </p>
                  <p>VX TShirts</p>
                </div>
                <br />
                <div className="ita2">
                  <a href="/hoodies">
                    <img
                      src="hoodie.png"
                      alt="hoodie"
                      className="item2"
                    />
                  </a>
                  <p>VX Hoodies</p>
                </div>
              </div>
              <div className="r2">
                <div className="ita3">
                  <a href="/shoes">
                    <img src="./public/company23.png" alt="" className="item3" />
                  </a>
                  <p>Shoes</p>
                </div>
                <br />
                <div className="ita4">
                  <a href="/cases">
                    <img src="./public/cases.png" alt="" className="item4" />
                  </a>
                  <p>Phone Cases</p>
                </div>
              </div>
              <br />
              <br />
              <button className="button-48">More Items Coming Soon!</button>
            </div>
            <div className="about-us" id="wex">
              <div className="abt1">
                <h1>About Us</h1>
                <h3>
                  Veloxal is a startup clothing company <br /> located in Colombo,
                  Sri Lanka, launched in 2023. <br />
                  (This is JUST a prototype website!)
                </h3>
                <p>Quality &gt; Quantity!</p>
                <br />
              </div>
              <h1 className="finder">Find us on</h1>
              <div className="socialicos">
                <div className="icox">
                  <p>
                    <a href="https://www.youtube.com/@Veloxal">
                      <img src="./public/yt.png" alt="" />
                    </a>
                  </p>
                </div>
                <br />
                <div className="icox1">
                  <a href="https://twitter.com/VeloxalYT">
                    <img src="./public/twitter.png" alt="" />
                  </a>
                </div>
                <br />
                <div className="icox2">
                  <a href="https://www.linkedin.com/in/dulran-samarasinghe-6258b9269/">
                    <img src="./public/linkedin.png" alt="" />
                  </a>
                </div>
                <br />
                <div className="icox3">
                  <a href="https://www.tiktok.com/@veloxalyt">
                    <img src="./public/tiktok.png" alt="" />
                  </a>
                </div>
                <br />
                <div className="icox4">
                  <a href="https://open.spotify.com/user/o61y4ehnaqgr0htyvpxpoda3o?si=2bd6cfd8fa1b4f95">
                    <img src="./public/spotify.png" alt="" />
                  </a>
                </div>
                <br />
              </div>
            </div>
            <div className="contactus" id="contact">
              <form action="#" id="contactForm">
                <h1>Contact Us!</h1>
                <p>Mail</p>
                <input
                  type="email"
                  id="emailInput"
                  placeholder="Your Email..."
                  className="email"
                />
                <p>Inquiry</p>
                <input
                  type="text"
                  id="responseInput"
                  placeholder="Your Inquiry..."
                  className="response"
                />
                <br />
                <br />
                <input
                  type="submit"
                  value="Submit"
                  className="button-48"
                  id="submitting"
                />
              </form>
              <br />
              <a href="#verytop" className="hone">
                Back to the top?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }