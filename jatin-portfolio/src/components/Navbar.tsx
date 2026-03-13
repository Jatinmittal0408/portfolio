import { useEffect, useState } from "react";
import "./styles/Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" className="navbar-brand" data-cursor="disable">
          <span>JM</span> · DevOps
        </a>
        <nav>
          <ul className="navbar-nav">
            <li><a href="#about">About</a></li>
            <li><a href="#techstack">Stack</a></li>
            <li><a href="#projects">Work</a></li>
            <li><a href="#experience">Journey</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <span
          className="navbar-email"
          data-cursor="disable"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText("mittaljatin9090@gmail.com");
            const target = e.target as HTMLElement;
            target.innerText = "Copied!";
            target.style.color = "#00ffff";
            setTimeout(() => {
              target.innerText = "mittaljatin9090@gmail.com";
              target.style.color = "";
            }, 2000);
          }}
          style={{ cursor: 'pointer' }}
        >
          mittaljatin9090@gmail.com
        </span>
      </header>
      <div className="navbar-circle1" />
      <div className="navbar-circle2" />
    </>
  );
};

export default Navbar;
