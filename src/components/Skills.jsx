import "./Skills.css";

import {
  SiPython, SiKotlin, SiJavascript, SiTypescript,
  SiReact, SiTailwindcss, SiHtml5, SiCss3, SiFlutter,
  SiNodedotjs, SiFirebase, SiSupabase, SiMysql, SiMongodb, SiPostgresql,
  SiAndroidstudio, SiGithub, SiFigma, SiVisualstudiocode, SiIntellijidea, SiApachenetbeans, SiGooglecolab
} from "react-icons/si";
import { FaJava, FaAws, FaGitAlt } from "react-icons/fa";

const SKILL_CATEGORIES = [
  {
    label: "⚡ Programming Languages",
    skills: [
      { icon: <SiPython     style={{ color: "#3776AB" }} />, name: "Python" },
      { icon: <FaJava       style={{ color: "#E32C32" }} />, name: "Java" },
      { icon: <SiJavascript style={{ color: "#F7DF1E" }} />, name: "JavaScript" },
      { icon: <SiTypescript style={{ color: "#3178C6" }} />, name: "TypeScript" },
      { icon: <SiKotlin     style={{ color: "#7F52FF" }} />, name: "Kotlin" },
    ],
  },
  {
    label: "🎨 Frontend & Mobile",
    skills: [
      { icon: <SiReact      style={{ color: "#61DAFB" }} />, name: "React JS" },
      { icon: <SiTailwindcss style={{ color: "#06B6D4" }} />, name: "Tailwind CSS" },
      { icon: <SiHtml5      style={{ color: "#E34F26" }} />, name: "HTML" },
      { icon: <SiCss3       style={{ color: "#1572B6" }} />, name: "CSS" },
      { icon: <SiFlutter    style={{ color: "#02569B" }} />, name: "Flutter" },
    ],
  },
  {
    label: "⚙️ Backend & Databases",
    skills: [
      { icon: <SiNodedotjs   style={{ color: "#339933" }} />, name: "Node.js" },
      { icon: <FaAws        style={{ color: "#FF9900" }} />, name: "AWS" },
      { icon: <SiMysql      style={{ color: "#4479A1" }} />, name: "MySQL" },
      { icon: <SiMongodb    style={{ color: "#47A248" }} />, name: "MongoDB" },
      { icon: <SiPostgresql style={{ color: "#4169E1" }} />, name: "SQL" },
      { icon: <SiFirebase   style={{ color: "#FFCA28" }} />, name: "Firebase" },
      { icon: <SiSupabase   style={{ color: "#3ECF8E" }} />, name: "Supabase" },
    ],
  },

  {
    label: "🛠️ Tools & IDEs",
    skills: [
      { icon: <FaGitAlt           style={{ color: "#F05032" }} />, name: "Git" },
      { icon: <SiGithub           style={{ color: "var(--text)" }} />, name: "GitHub" },
      { icon: <SiFigma            style={{ color: "#F24E1E" }} />, name: "Figma" },
      { icon: <SiVisualstudiocode style={{ color: "#007ACC" }} />, name: "VS Code" },
      { icon: <SiIntellijidea     style={{ color: "#000000" }} />, name: "IntelliJ IDEA" },
      { icon: <SiAndroidstudio    style={{ color: "#3DDC84" }} />, name: "Android Studio" },
      { icon: <SiApachenetbeans   style={{ color: "#1B6AC6" }} />, name: "Apache NetBeans" },
      { icon: <SiGooglecolab      style={{ color: "#F9AB00" }} />, name: "Google Colab" },
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
