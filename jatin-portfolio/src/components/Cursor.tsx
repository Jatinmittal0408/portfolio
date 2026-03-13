import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });

    const animate = () => {
      const delay = 6;
      cursorPos.x += (mousePos.x - cursorPos.x) / delay;
      cursorPos.y += (mousePos.y - cursorPos.y) / delay;
      gsap.set(cursor, { x: cursorPos.x, y: cursorPos.y });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const hoverEls = document.querySelectorAll("a, button, [data-cursor='hover']");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
    });

    const disableEls = document.querySelectorAll("[data-cursor='disable']");
    disableEls.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("cursor-disable"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-disable"));
    });
  }, []);

  return <div className="cursor-main" ref={cursorRef} />;
};

export default Cursor;
