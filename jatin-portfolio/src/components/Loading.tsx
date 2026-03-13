import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useLoading } from "../context/LoadingProvider";
import "./styles/Loading.css";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      setTimeout(() => {
        setHidden(true);
        setTimeout(() => setIsLoading(false), 600);
      }, 400);
    }
  }, [percent, setIsLoading]);

  return (
    <div className={`loading-overlay${hidden ? " hidden" : ""}`}>
      <div className="loading-brand">
        <span>JM</span> · DevOps Engineer
      </div>

      <div className="loading-center">
        <div className="loading-percent">
          {String(Math.min(percent, 100)).padStart(2, "0")}
          <span>%</span>
        </div>
        <div className="loading-label">Initializing Systems</div>
        <div className="loading-bar-wrap">
          <div className="loading-bar" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="loading-marquee-wrap">
        <Marquee speed={40} gradient={false}>
          <span>DevOps Engineer</span>
          <span>Cloud Architect</span>
          <span>Infrastructure as Code</span>
          <span>Kubernetes</span>
          <span>CI/CD Pipelines</span>
          <span>Security Engineering</span>
          <span>DevOps Engineer</span>
          <span>Cloud Architect</span>
          <span>Infrastructure as Code</span>
          <span>Kubernetes</span>
        </Marquee>
      </div>
    </div>
  );
};

export default Loading;

export const runLoadingProgress = (setPercent: (v: number) => void) => {
  let p = 0;
  const fast = setInterval(() => {
    p += Math.round(Math.random() * 6) + 2;
    if (p >= 70) { clearInterval(fast); slowPhase(); }
    else setPercent(p);
  }, 80);

  const slowPhase = () => {
    const slow = setInterval(() => {
      p += 1;
      setPercent(p);
      if (p >= 90) clearInterval(slow);
    }, 200);
  };

  return {
    finish: () => {
      const fin = setInterval(() => {
        p++;
        setPercent(p);
        if (p >= 100) clearInterval(fin);
      }, 10);
    },
  };
};
