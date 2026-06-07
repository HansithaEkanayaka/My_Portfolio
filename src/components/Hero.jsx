import { useEffect, useRef } from "react";
import useTypingEffect from "../hooks/useTypingEffect";
import "./Hero.css";

const PHRASES = [
  "Computer Science Undergraduate",
  "Problem Solver",
  "Software Engineer",
  "Full-Stack Developer",
  "Tech Enthusiast",
];

export default function Hero() {
  const heroRef = useRef(null);
  const meshRef = useRef(null);
  const typedText = useTypingEffect(PHRASES);

  useEffect(() => {
    const hero = heroRef.current;
    const mesh = meshRef.current;
    if (!hero || !mesh) return;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mesh.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(99,179,237,0.15) 0%, transparent 50%)`;
    };

    hero.addEventListener("mousemove", onMove);
    return () => hero.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-mesh" ref={meshRef} />
      <div className="hero-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-content">
        <h4 className="hero-greeting">Hello, It's me</h4>
        <h1 className="hero-h1">Hansitha Ekanayaka</h1>
        <p className="hero-sub">
          I build simple, effective solutions focused on solving real-world
          challenges. Always learning and improving.
        </p>
        <div className="hero-typed-wrap">
          <span className="typed-text">{typedText}</span>
          <span className="typed-cursor" />
        </div>
        <div className="hero-btns">
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </div>
      </div>

      <div className="scroll-hint">
        scroll down
        <div className="scroll-hint-line" />
      </div>
    </section>
  );
}
