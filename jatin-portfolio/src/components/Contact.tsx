import { MdArrowOutward } from "react-icons/md";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-cta-big">
          <h2>
            Let's Build Something
            <span>That Doesn't Break.</span>
          </h2>
          <p>
            Open to full-time DevOps / SRE opportunities, consulting, or just a good conversation about infrastructure.
          </p>
          <a href="mailto:mittaljatin9090@gmail.com" className="btn-primary" data-cursor="disable">
            Get In Touch <MdArrowOutward />
          </a>
        </div>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <span 
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText("mittaljatin9090@gmail.com");
                  const target = e.target as HTMLElement;
                  target.innerText = "Copied to clipboard!";
                  target.style.color = "#00ffff";
                  setTimeout(() => {
                    target.innerText = "mittaljatin9090@gmail.com";
                    target.style.color = "";
                  }, 2000);
                }} 
                style={{ cursor: 'pointer', textDecoration: 'none' }} 
                data-cursor="disable"
              >
                mittaljatin9090@gmail.com
              </span>
            </p>
            <h4>Based In</h4>
            <p>India 🇮🇳</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a href="https://github.com/jatinmittal0408" target="_blank" rel="noopener noreferrer" className="contact-social" data-cursor="disable">
              <FiGithub /> GitHub <MdArrowOutward />
            </a>
            <a href="https://www.linkedin.com/in/jatin-mittal-2b428b190/" target="_blank" rel="noopener noreferrer" className="contact-social" data-cursor="disable">
              <FiLinkedin /> LinkedIn <MdArrowOutward />
            </a>
            <span 
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText("mittaljatin9090@gmail.com");
                const target = e.currentTarget as HTMLElement;
                const originalHtml = target.innerHTML;
                target.innerText = "Copied!";
                target.style.color = "#00ffff";
                setTimeout(() => {
                  target.innerHTML = originalHtml;
                  target.style.color = "";
                }, 2000);
              }}
              className="contact-social" 
              data-cursor="disable"
              style={{ cursor: 'pointer' }}
            >
              <FiMail /> Email <MdArrowOutward />
            </span>
          </div>
          <div className="contact-box">
            <p className="contact-big">
              Designed &amp; Built by <span>Jatin Mittal</span>
            </p>
            <p className="contact-year">© 2025 · All rights reserved</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
