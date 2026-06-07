import { useEffect, useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 150) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? "hidden" : "";
      return !prev;
    });
  };

  const toggleTheme = () => {
    setLightTheme((prev) => {
      document.body.classList.toggle("light-theme", !prev);
      return !prev;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <a href="#hero" className="nav-logo">
          <img src="img/logo.jpeg" alt="Logo" />
        </a>

        <ul className="nav-links" id="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? "active" : ""}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fas ${lightTheme ? "fa-sun" : "fa-moon"}`} />
          </button>
          <a href="public/Hansitha Ekanayaka CV.pdf" className="nav-cta" download>
            <i className="fas fa-download" /> CV
          </a>
          <button className={`ham ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mob-nav ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a
          href="public/Hansitha Ekanayaka CV.pdf"
          className="nav-cta"
          download
          style={{ display: "inline-block", marginTop: "20px" }}
          onClick={closeMenu}
        >
          <i className="fas fa-download" /> CV
        </a>
      </div>
    </>
  );
}
