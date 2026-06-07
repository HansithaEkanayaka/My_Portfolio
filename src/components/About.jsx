import "./About.css";

const CARDS = [
  { icon: "🤖", label: "AI & ML", val: "Deep passion" },
  { icon: "📱", label: "Mobile Dev", val: "Android & more" },
  { icon: "🧩", label: "Problem Solver", val: "Logic & creativity" },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        {/* Avatar */}
        <div className="avatar-card reveal">
          <div className="avatar-inner">
            <div className="avatar-ring" />
            <img
              src="/img/avatar.jpeg"
              alt="Hansitha Ekanayaka"
              className="avatar-img"
            />
          </div>
          <div className="avatar-badge">
            <span className="avatar-badge-val">Computer Science Undergraduate</span>
            Informatics Institute of Technology in collaboration with University of Westminster
          </div>
        </div>

        {/* Story */}
        <div className="about-story reveal" style={{ transitionDelay: "0.15s" }}>
          <div className="chip">
            <span className="chip-dot" />
            About Me
          </div>
          <h2 className="about-headline">
            Software Engineer with a<br />
            <span className="gradient-text">
              lifelong love for code and a mission to build software that actually matters.
            </span>
          </h2>
          <p className="about-p">
            I'm a Computer Science student and software developer passionate about
            building clean, efficient, and user-focused solutions. I enjoy turning
            ideas into real-world applications and continuously improving my skills
            through learning and hands-on projects.
          </p>
          <div className="about-cards">
            {CARDS.map(({ icon, label, val }) => (
              <div className="about-card" key={label}>
                <div className="about-card-icon">{icon}</div>
                <div className="about-card-label">{label}</div>
                <div className="about-card-val">{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
