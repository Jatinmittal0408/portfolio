import { useEffect, useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from "react-icons/fi";
import "./styles/Hero.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TYPING_PHRASES = [
  "Architecting zero-downtime deployments",
  "Turning cloud bills into engineering wins",
  "Running 367 VMs on autopilot",
  "Security-first, always.",
  "50+ deploys/day, 0 grey hairs",
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [typed, setTyped] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (charIdx < phrase.length) {
        timeout = setTimeout(() => { setTyped(phrase.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 55);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => { setTyped(phrase.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 30);
      } else {
        setDeleting(false);
        setPhraseIdx(i => (i + 1) % TYPING_PHRASES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, phraseIdx, deleting]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-label", { opacity: 0, y: 30, duration: 0.8, delay: 0.2, ease: "power3.out" });
      gsap.from(".hero-title .word", { opacity: 0, y: 60, duration: 0.9, stagger: 0.08, delay: 0.4, ease: "power3.out" });
      gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.8, delay: 0.8, ease: "power3.out" });
      gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.7, delay: 1.0, ease: "power3.out" });
      gsap.from(".hero-social", { opacity: 0, y: 20, duration: 0.7, delay: 1.1, ease: "power3.out" });
      gsap.from(".stat-card", { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-label">DevOps Engineer</div>
            <h1 className="hero-title" ref={titleRef}>
              <span className="line"><span className="word">I Build</span> <span className="word">Infrastructure</span></span>
              <span className="line"><span className="word highlight">That</span> <span className="word">Doesn't</span></span>
              <span className="line"><span className="word">Break.</span></span>
            </h1>
            <p className="hero-subtitle">
              Architecting production systems that handle millions of requests, cost 40% less
              to run, and deploy 50+ times a day without breaking a sweat.
            </p>
            <div className="typing-wrap">
              $ {typed}<span className="typing-cursor" />
            </div>
            <div className="hero-cta">
              <a href="#projects" className="btn-primary">
                See What I've Built <FiArrowRight />
              </a>
              <a href="/documents/JatinMittal_Devops_Resume.pdf" download="JatinMittal_Devops_Resume.pdf" className="btn-secondary">
                <FiDownload /> Download Resume
              </a>
            </div>
            <div className="hero-social">
              <a href="https://github.com/jatinmittal0408" target="_blank" rel="noopener noreferrer" data-cursor="disable">
                <FiGithub /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/jatin-mittal-2b428b190/" target="_blank" rel="noopener noreferrer" data-cursor="disable">
                <FiLinkedin /> LinkedIn
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
                style={{ cursor: 'pointer' }}
                data-cursor="disable"
              >
                <FiMail /> Email
              </span>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-stats-panel">
              {[
                { value: "500K+", label: "Requests/Day" },
                { value: "99.95%", label: "Uptime SLA" },
                { value: "$50K+", label: "Annual Savings" },
                { value: "50+", label: "Deploys/Day" },
              ].map((s) => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
