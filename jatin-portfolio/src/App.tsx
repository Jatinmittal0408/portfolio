import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import Loading, { runLoadingProgress } from "./components/Loading";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";

const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const TechStack = lazy(() => import("./components/TechStack"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Offline = lazy(() => import("./components/Offline"));
const Contact = lazy(() => import("./components/Contact"));

function MainApp() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const loader = runLoadingProgress(setPercent);
    const t = setTimeout(() => loader.finish(), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Cursor />
      {/* Loading overlay sits on top — content always rendered underneath */}
      <Loading percent={percent} />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Experience />
          <Offline />
          <Contact />
        </Suspense>
      </main>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <MainApp />
    </LoadingProvider>
  );
}

export default App;
