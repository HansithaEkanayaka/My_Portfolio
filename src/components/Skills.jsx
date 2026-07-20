import "./Skills.css";

import {
  SiPython, SiKotlin, SiPostgresql, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiFirebase, SiAndroidstudio, SiGithub, SiPandas, SiFigma
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";

const SKILL_CATEGORIES = [
  {
    label: "⚡ Programming Languages",
    skills: [
      { icon: <FaJava        style={{ color: "#E32C32" }} />, name: "Java" },
      { icon: <SiPython      style={{ color: "#3776AB" }} />, name: "Python" },
      { icon: <SiKotlin      style={{ color: "#7F52FF" }} />, name: "Kotlin" },
      { icon: <SiPostgresql  style={{ color: "#4169E1" }} />, name: "SQL" },
      { icon: <SiJavascript  style={{ color: "#F7DF1E" }} />, name: "JavaScript" },
      { icon: <SiTypescript  style={{ color: "#3178C6" }} />, name: "TypeScript" },
    ],
  },
  {
    label: "🎨 Frontend Development",
    skills: [
      { icon: <SiReact       style={{ color: "#61DAFB" }} />, name: "React" },
      { icon: <SiNextdotjs   style={{ color: "var(--text)" }} />, name: "Next.js" },
      { icon: <SiTailwindcss style={{ color: "#06B6D4" }} />, name: "Tailwind CSS" },
      { icon: <SiHtml5       style={{ color: "#E34F26" }} />, name: "HTML5" },
      { icon: <SiCss        style={{ color: "#1572B6" }} />, name: "CSS" },
    ],
  },
  {
    label: "⚙️ Backend Development",
    skills: [
      { icon: <SiNodedotjs   style={{ color: "#339933" }} />, name: "Node.js" },
      { icon: <SiPostgresql  style={{ color: "#4169E1" }} />, name: "PostgreSQL" }, 
      { icon: <SiFirebase    style={{ color: "#FFCA28" }} />, name: "Firebase" },
    ],
  },

  {
    label: "📱 Mobile App Development",
    skills: [
      { icon: <SiAndroidstudio style={{ color: "#3DDC84" }} />, name: "Android Studio" },
      { icon: <SiKotlin        style={{ color: "#7F52FF" }} />, name: "Kotlin" },
    ],
  },
  {
    label: "🛠️ Tools & Platforms",
    skills: [
      { icon: <SiGithub  style={{ color: "var(--text)" }} />, name: "GitHub" },
      { icon: <FaAws     style={{ color: "#FF9900" }} />, name: "AWS" },
      { icon: <SiPandas  style={{ color: "#150458" }} />, name: "Pandas" },
      { icon: <SiFigma   style={{ color: "#F24E1E" }} />, name: "Figma" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="chip reveal">
        <span className="chip-dot" />
        Capabilities
      </div>
      <h2 className="section-title reveal">
        My <span className="gradient-text">Tech Stack.</span>
      </h2>
      <p className="section-sub reveal">
        Languages, frameworks, and tools I use to bring ideas to life.
      </p>

      <div className="skills-cats reveal" style={{ transitionDelay: "0.1s" }}>
        {SKILL_CATEGORIES.map(({ label, skills }) => (
          <div key={label}>
            <div className="skill-cat-label">{label}</div>
            <div className="skill-cat-grid">
              {skills.map(({ icon, name }) => (
                <div className="skill-pill" key={name}>
                  <span className="skill-pill-icon">{icon}</span>
                  {name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
