import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Offline.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    img: `${import.meta.env.BASE_URL}images/guitar_raw.jpg`,
    emoji: "🎸",
    heading: "Audio Orchestration",
    role: "Lead Guitarist",
    desc: "Managing soundwaves and high-fidelity output. Improvisation in high-pressure live environments.",
    tags: ["#LivePerformance", "#RhythmSection"],
  },
  {
    img: `${import.meta.env.BASE_URL}images/trekking.jpg`,
    emoji: "🏔️",
    heading: "High Availability",
    role: "Alpine Trekker",
    desc: "Scaling mountains when not scaling clusters. Endurance testing in extreme conditions.",
    tags: ["#Endurance", "#NatureOps"],
  },
  {
    img: `${import.meta.env.BASE_URL}images/cooking.jpg`,
    emoji: "🍳",
    heading: "Flavor Deployment",
    role: "Culinary Artist",
    desc: "Testing recipes in production. Precision plating and flavor stack optimization.",
    tags: ["#MiseEnPlace", "#TasteTesting"],
  },
];

const Offline = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".offline-card", {
        opacity: 0, y: 50, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".offline-grid", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="offline" ref={sectionRef} className="offline-section">
      <div className="container">
        <div className="section-title">
          <h2>Offline <span>Layer</span></h2>
          <p>System Maintenance &amp; Creative Output</p>
        </div>
        <div className="offline-grid">
          {CARDS.map((c) => (
            <div className="offline-card" key={c.role}>
              <img src={c.img} alt={c.role} />
              <div className="offline-info">
                <div className="offline-emoji">{c.emoji}</div>
                <div className="offline-heading">{c.heading}</div>
                <div className="offline-role">{c.role}</div>
                <p className="offline-desc">{c.desc}</p>
                <div className="offline-tags">
                  {c.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offline;
