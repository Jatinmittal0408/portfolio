import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Experience.css";

gsap.registerPlugin(ScrollTrigger);

const JOBS = [
  {
    date: "April 2025 – Present",
    company: "ParkPlus",
    role: "DevOps Engineer",
    desc: "Managing production infrastructure with 135 VMs in production cluster and 232 VMs hosting various services. Architected and deployed Wazuh SIEM solution for security monitoring without paid tools. Created hardened golden image with Lynis score of 86, currently used across all production systems. Managing self-managed SQL databases and maintaining 99.95% SLA on applications.",
    tags: ["GCP", "Kubernetes", "Terraform", "Ansible", "Wazuh", "Python", "Nginx"],
  },
  {
    date: "April 2024 – April 2025",
    company: "Insight Solutions",
    role: "Cloud Engineer II (Promoted)",
    desc: "Promoted to Cloud Engineer II. Led VAPT (Vulnerability Assessment and Penetration Testing) initiatives as external security team for enterprise clients. Utilized Tenable and Nessus for comprehensive security assessments. Successfully reduced overall infrastructure costs by 18% for Emcore Corporation through intelligent resource optimization scripts and rightsizing recommendations.",
    tags: ["Security", "Tenable", "Nessus", "VAPT", "AWS", "Cost Optimization", "Python"],
  },
  {
    date: "April 2023 – April 2024",
    company: "Insight Solutions",
    role: "Cloud Engineer",
    desc: "Developed automated cost analysis scripts to identify overcommitted and undercommitted resources across client environments. Created detailed reports with actionable recommendations and cost reduction projections. Worked with multiple enterprise clients including Kenvue, reducing attack surface area through comprehensive security assessments and implementing security best practices.",
    tags: ["AWS", "Azure", "Python", "Terraform", "Cost Analysis", "Security"],
  },
  {
    date: "June 2022 – March 2023",
    company: "Hanu Solutions",
    role: "Cloud Engineer",
    desc: "Gained foundational cloud engineering experience working with GCP infrastructure for client ParkPlus. Delivered early-stage cost optimization work achieving 36% compute and 28% SQL savings. Developed the Python-based BigQuery analysis tooling that formed the foundation of company-wide FinOps practices.",
    tags: ["GCP", "Python", "BigQuery", "FinOps", "Linux"],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        opacity: 0, x: -40, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".timeline", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience-section">
      <div className="container">
        <div className="section-title">
          <h2>Professional <span>Journey</span></h2>
          <p>From FinOps tools to enterprise SIEM deployments — 3+ years of production impact.</p>
        </div>
        <div className="timeline">
          {JOBS.map((j) => (
            <div className="timeline-item" key={j.company + j.role}>
              <div className="timeline-dot" />
              <div className="timeline-box">
                <div className="timeline-date">{j.date}</div>
                <div className="timeline-company">{j.company}</div>
                <div className="timeline-role">{j.role}</div>
                <p className="timeline-desc">{j.desc}</p>
                <div className="timeline-tags">
                  {j.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
