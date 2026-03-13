import { useState, useCallback } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FiGithub } from "react-icons/fi";
import "./styles/Projects.css";

const PROJECTS = [
  {
    title: "Hardened VM Golden Image with Lynis",
    category: "Security // Automation",
    status: "Production",
    desc: "Created production-grade hardened golden images using Packer and Ansible with comprehensive security configurations. Achieved Lynis security audit score of 86/100 through systematic hardening including CIS benchmarks, kernel tuning, and automated security policies, deployed across ParkPlus production infrastructure.",
    tags: ["Security", "Lynis", "Packer", "Ansible"],
    image: `${import.meta.env.BASE_URL}images/security.jpg`,
    metrics: [
      { val: "86/100", lab: "Lynis Score" },
      { val: "135+", lab: "VMs Deployed" },
      { val: "100%", lab: "Production Use" },
    ],
    links: [
      { href: "https://github.com/jatinmittal0408/ansible-server-hardening", label: "GitHub", icon: <FiGithub /> },
    ],
  },
  {
    title: "Wazuh SIEM Security Platform",
    category: "Observability // Security",
    status: "Active Monitoring",
    desc: "Architected and deployed enterprise-grade Wazuh SIEM solution for ParkPlus without any paid tools. Enabled comprehensive security monitoring, intrusion detection, file integrity monitoring, and compliance auditing across 367 VMs with real-time alerting and response.",
    tags: ["Wazuh", "SIEM", "Security", "Kubernetes"],
    image: `${import.meta.env.BASE_URL}images/monitoring.jpg`,
    metrics: [
      { val: "367", lab: "VMs Monitored" },
      { val: "$0", lab: "Licensing Cost" },
      { val: "24/7", lab: "Active Monitoring" },
    ],
    links: [
      { href: "https://github.com/jatinmittal0408/wazuh-docker-deployment", label: "GitHub", icon: <FiGithub /> },
    ],
  },
  {
    title: "Multi-Cloud Cost Optimization",
    category: "FinOps // Cloud",
    status: "Cost Savings",
    desc: "Developed automated cost optimization solutions across multiple organizations. For ParkPlus (via Hanu) achieved 36% compute and 28% SQL cost savings through lifecycle policies and right-sizing, and built reusable analysis tooling for other enterprises.",
    tags: ["GCP", "AWS", "Python", "BigQuery"],
    image: `${import.meta.env.BASE_URL}images/cost-optimization.jpg`,
    metrics: [
      { val: "36%", lab: "Compute Savings" },
      { val: "28%", lab: "SQL Savings" },
      { val: "18%", lab: "Overall Savings" },
    ],
    links: [
      { href: "https://github.com/jatinmittal0408/cloud-cost-optimizer", label: "GitHub", icon: <FiGithub /> },
    ],
  },
  {
    title: "Terraform GCP Infrastructure",
    category: "IaC // Infrastructure",
    status: "Infrastructure",
    desc: "Production-grade Terraform modules for GCP powering multi-region GKE clusters, VPC networks, service accounts, and Cloud SQL. Manages 367 VMs across ParkPlus infrastructure with autoscaling from 3–50 nodes per cluster.",
    tags: ["Terraform", "GCP", "GKE", "VPC"],
    image: `${import.meta.env.BASE_URL}images/k8s-optimization.jpg`,
    metrics: [
      { val: "367", lab: "VMs Managed" },
      { val: "Multi", lab: "Region GKE" },
      { val: "3–50", lab: "Auto-Scale Nodes" },
    ],
    links: [
      { href: "https://github.com/jatinmittal0408/terraform-gcp-infrastructure", label: "GitHub", icon: <FiGithub /> },
    ],
  },
  {
    title: "Kubernetes Monitoring Stack",
    category: "Observability // Monitoring",
    status: "Reliability",
    desc: "Production observability stack for Kubernetes with Prometheus, Grafana, Alertmanager, and on-call integrations. 12 custom dashboards, 45 alert rules, and tight SLOs monitoring 367 VMs and 15K+ time series.",
    tags: ["Prometheus", "Grafana", "Alertmanager", "PagerDuty"],
    image: `${import.meta.env.BASE_URL}images/monitoring.jpg`,
    metrics: [
      { val: "15K+", lab: "Time Series" },
      { val: "45", lab: "Alert Rules" },
      { val: "12", lab: "Custom Dashboards" },
    ],
    links: [
      { href: "https://github.com/jatinmittal0408/kubernetes-monitoring-stack", label: "GitHub", icon: <FiGithub /> },
    ],
  },
  {
    title: "ArgoCD GitOps Deployment",
    category: "Delivery // Automation",
    status: "GitOps",
    desc: "Production GitOps deployment patterns using ArgoCD: app-of-apps, sync waves, blue–green strategies, and automated rollbacks. Manages 45+ apps with more than 50 deployments per day.",
    tags: ["ArgoCD", "GitOps", "Kubernetes", "Helm"],
    image: `${import.meta.env.BASE_URL}images/cicd.jpg`,
    metrics: [
      { val: "45+", lab: "Apps Managed" },
      { val: "50+", lab: "Deploys/Day" },
      { val: "< 5min", lab: "Deploy Time" },
    ],
    links: [
      { href: "https://github.com/jatinmittal0408/argocd-gitops-deployment", label: "GitHub", icon: <FiGithub /> },
    ],
  },
  {
    title: "CI/CD Pipeline — Microservices",
    category: "CI/CD // Automation",
    status: "Pipeline",
    desc: "Production-ready CI/CD pipelines for Kubernetes microservices using GitHub Actions, Helm, and Docker. Includes automated testing, security scanning with Trivy/Snyk, progressive delivery, and automatic rollbacks with a 99.2% success rate.",
    tags: ["GitHub Actions", "Helm", "Docker", "Trivy"],
    image: `${import.meta.env.BASE_URL}images/migration.jpg`,
    metrics: [
      { val: "50+", lab: "Deploys/Day" },
      { val: "4.5min", lab: "Avg Deploy Time" },
      { val: "99.2%", lab: "Success Rate" },
    ],
    links: [
      { href: "https://github.com/jatinmittal0408/cicd-pipeline-kubernetes", label: "GitHub", icon: <FiGithub /> },
    ],
  },
];

const Projects = () => {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((next: number) => {
    if (animating) return;
    setAnimating(true);
    setIdx(next);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  const prev = () => go(idx === 0 ? PROJECTS.length - 1 : idx - 1);
  const next = () => go(idx === PROJECTS.length - 1 ? 0 : idx + 1);


  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-title">
          <h2>Production <span>Originals</span></h2>
          <p>Curated DevOps stories across security, cost, Kubernetes, and delivery.</p>
        </div>
        <div className="carousel-outer">
          <div className="carousel-track-container">
            <div className="carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {PROJECTS.map((proj, i) => (
                <div className="carousel-slide" key={i}>
                  <div className="slide-inner">
                    <div className="slide-info">
                      <div>
                        <div className="slide-num">0{i + 1}</div>
                        <div className="slide-category">{proj.category}</div>
                        <h3 className="slide-title">{proj.title}</h3>
                        <p className="slide-desc">{proj.desc}</p>
                        <div className="slide-tags">{proj.tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                      </div>
                      <div>
                        <div className="slide-metrics">
                          {proj.metrics.map(m => (
                            <div key={m.lab}>
                              <div className="slide-metric-val">{m.val}</div>
                              <div className="slide-metric-lab">{m.lab}</div>
                            </div>
                          ))}
                        </div>
                        <div className="slide-links" style={{ marginTop: 20 }}>
                          {proj.links.map(l => (
                            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="slide-link" data-cursor="disable">
                              {l.icon} {l.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="slide-image">
                      <img src={proj.image} alt={proj.title} />
                      <div className="slide-status">
                        <span className="status-dot" /> {proj.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-controls">
            <div className="carousel-dots">
              {PROJECTS.map((_, i) => (
                <button key={i} className={`carousel-dot${i === idx ? " active" : ""}`} onClick={() => go(i)} data-cursor="disable" aria-label={`Project ${i + 1}`} />
              ))}
            </div>
            <div className="carousel-counter">{String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</div>
            <div className="carousel-arrows">
              <button className="carousel-arrow" onClick={prev} data-cursor="disable" aria-label="Previous"><MdArrowBack /></button>
              <button className="carousel-arrow" onClick={next} data-cursor="disable" aria-label="Next"><MdArrowForward /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
