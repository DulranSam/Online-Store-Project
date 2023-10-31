import { Link } from "react-router-dom";
import { useEffect, useState,useRef } from "react";
import "./Main.css";
import emailjs from "@emailjs/browser";

export default function Main() {
  const [time, setTime] = useState("");
  const [loading,setLoading] = useState(false); 
  const emailRef = useRef();
  const inquiryRef = useRef();

  useEffect(() => {

    function Time() {
      const time = Date.now();
      if (time > 12) {
        setTime("Evening");
      } else if (time > 4) {
        setTime("Evening");
      } else {
        setTime("Morning");
      }
    }
    Time();
   
  });

 


 
  useEffect(() => emailjs.init("jQgti3TGAJsQtelIY"), []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = "service_cg40vyf";
    const templateId = "service_cg40vyf";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
       inquiry: inquiryRef.current.value,
        recipient: emailRef.current.value
      });
      alert("Email Sent , Thank You!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

 

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
          <br></br>
          <div className="Homedet">
          <h1>Good {time}!</h1>
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
              <a className="ita1" href="/tshirts">
                <p>
                  <img src="tshirt.png" alt="tshirt" className="item1" />
                </p>
                <p>VX TShirts</p>
              </a>
              <br />
              <a className="ita2" href="/hoodies">
                <img src="hoodie.png" alt="hoodie" className="item2" />
                <p>VX Hoodies</p>
              </a>
            </div>
            <div className="r2">
              <a className="ita3" href="/shoes">
                <img src="./images/company23.png" alt="" className="item3" />
                <p>Shoes</p>
              </a>
              <br />
              <a className="ita4" href="/cases">
                <img src="./images/cases.png" alt="" className="item4" />
                <p>Phone Cases</p>
              </a>
            </div>
            <br />
            <br />
            <a href="/more" className="button-48">
              Browse More
            </a>
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
                    <img src="./images/yt.png" alt="" />
                  </a>
                </p>
              </div>
              <br />
              <div className="icox1">
                <a href="https://twitter.com/VeloxalYT">
                  <img src="./images/twitter.png" alt="" />
                </a>
              </div>
              <br />
              <div className="icox2">
                <a href="https://www.linkedin.com/in/dulran-samarasinghe-6258b9269/">
                  <img src="./images/linkedin.png" alt="" />
                </a>
              </div>
              <br />
              <div className="icox3">
                <a href="https://www.tiktok.com/@veloxalyt">
                  <img src="./images/tiktok.png" alt="" />
                </a>
              </div>
              <br />
              <div className="icox4">
                <a href="https://open.spotify.com/user/o61y4ehnaqgr0htyvpxpoda3o?si=2bd6cfd8fa1b4f95">
                  <img src="./images/spotify.png" alt="" />
                </a>
              </div>
              <br />
            </div>
          </div>
          <div className="contactus" id="contact">
            <form action="#" id="contactForm" onSubmit={handleSubmit}>
              <h1>Contact Us!</h1>
              <p>Mail</p>
              <input
                type="email"
                id="emailInput"
                ref={emailRef}
                placeholder="Your Email..."
                className="email"
              />
              <p>Inquiry</p>
              <input
                type="text"
                ref={inquiryRef}
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
