import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const EXPERTISE = [
  { icon: "🏗️", title: "Infrastructure as Code", desc: "Terraform, Ansible, CloudFormation for scalable infrastructure automation" },
  { icon: "🚀", title: "CI/CD Engineering", desc: "Jenkins, GitLab CI, ArgoCD for seamless deployment pipelines" },
  { icon: "☁️", title: "Cloud Architecture", desc: "AWS, GCP, Azure multi-cloud solutions and migrations" },
  { icon: "🔐", title: "DevSecOps", desc: "Security-first approach with automated compliance and monitoring" },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-image-frame", {
        opacity: 0, x: -50, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-section", start: "top 75%" },
      });
      gsap.from(".about-text > *", {
        opacity: 0, y: 30, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 80%" },
      });
      gsap.from(".expertise-card", {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ".expertise-grid", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section">
      <div className="container">
        <div className="section-title">
          <h2>About <span>Me</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-image-wrap">
            <div className="about-image-frame">
              <img src="/images/profile.png" alt="Jatin Mittal" />
              <div className="about-image-overlay" />
              <div className="about-tag">DevOps · 3+ Years</div>
            </div>
          </div>
          <div className="about-text">
            <h3>DevOps Engineer &amp; Infrastructure Architect</h3>
            <p>
              I architect resilient, self-healing cloud infrastructure where <strong>security, scalability,
              and cost-efficiency</strong> are built-in by design. My focus is on creating silent,
              high-performance systems that empower development teams to ship faster without breaking production.
            </p>
            <p>
              True engineering excellence lies in <strong>simplicity and automation</strong>. I specialize in
              untangling complex workflows and implementing robust Infrastructure as Code (IaC) that turns
              manual operations into predictable, repeatable code standards.
            </p>
            <p>
              Beyond the terminal, I maintain a strong <strong>"Offline Layer"</strong> to stay grounded —
              lead guitarist, alpine trekker, and culinary artist.
            </p>
            <div className="expertise-grid">
              {EXPERTISE.map((e) => (
                <div className="expertise-card" key={e.title}>
                  <div className="expertise-icon">{e.icon}</div>
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
