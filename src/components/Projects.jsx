import "./Projects.css";

const GH_ICON = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const PROJECTS = [
  {
    name: "VanGo – School Transport Platform",
    desc: "A full-stack school transportation ecosystem built for Sri Lanka. Parents track their child's van in real-time, get pickup/drop-off notifications, and message drivers securely. Drivers get route optimization, QR attendance scanning, and absence alerts — all in one platform.",
    image: "/img/vango.jpg",
    bgClass: "proj-bg-4",
    badge: "Group Project",
    stack: ["Flutter", "Fastify", "Supabase", "PostgreSQL", "FCM", "Socket.IO", "Google Maps API"],
    liveUrl: "https://github.com/bxnxrx/Vango_Parent_App",
    githubUrl: "https://github.com/bxnxrx/Vango_Parent_App",
  },

  {
    name: "Smart Campus API",
    desc: "A RESTful API for managing a Smart Campus system — covering room management, IoT sensor registration, and historical sensor readings. Built with JAX-RS (Jersey 2.x) on Apache Tomcat 9, using thread-safe in-memory storage. Features HATEOAS navigation, clean error handling, and request logging via JAX-RS filters.",
    image: "/img/smartcampusapi.jpg",
    bgClass: "proj-bg-5",
    badge: "REST API",
    stack: ["Java 11", "JAX-RS", "Jersey 2.x", "Tomcat 9", "Maven"],
    liveUrl: "https://github.com/HansithaEkanayaka/Smart_Campus_API",
    githubUrl: "https://github.com/HansithaEkanayaka/Smart_Campus_API",
  },
  {
    name: "Cross Math Puzzle Game",
    desc: "An interactive brain-training Android game where players solve cross-shaped arithmetic puzzles. Features multiple difficulty levels, hints, and a leaderboard — keeping players engaged with every session.",
    emoji: "🧮",
    bgClass: "proj-bg-1",
    stack: ["Kotlin", "Android", "Jetpack", "Room DB"],
    liveUrl: "https://github.com/HansithaEkanayaka/Cross_Math_Puzzle_Game",
    githubUrl: "https://github.com/HansithaEkanayaka/Cross_Math_Puzzle_Game",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="chip reveal">
        <span className="chip-dot" />
        Featured Work
      </div>
      <h2 className="section-title reveal">
        Projects I've <span className="gradient-text">Built.</span>
      </h2>
      <p className="section-sub reveal">
        Real products I'm proud of — from games to sustainability tech to AI.
      </p>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <div
            className="project-card reveal"
            key={project.name}
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            <div className="project-preview">
              <div className={`proj-bg ${project.bgClass}`} />
              <div className="proj-overlay" />
              {project.image ? (
                <img src={project.image} alt={project.name} className="proj-img" />
              ) : (
                <span className="proj-emoji">{project.emoji}</span>
              )}
            </div>
            <div className="project-body">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span className="stack-badge" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-footer">
                <a href={project.liveUrl} className="view-btn">
                  View Project ↗
                </a>
                <a
                  href={project.githubUrl}
                  className="github-ico"
                  title="GitHub"
                >
                  {GH_ICON}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
