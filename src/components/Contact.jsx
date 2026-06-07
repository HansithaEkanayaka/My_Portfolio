import { useState } from "react";
import "./Contact.css";

const SOCIALS = [
  {
    href: "https://github.com/HansithaEkanayaka",
    icon: "fab fa-github",
    label: "GitHub",
    sub: "github.com/HansithaEkanayaka",
    target: "_blank",
  },
  {
    href: "https://www.linkedin.com/in/hansitha-ekanayaka-476016309",
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    sub: "linkedin.com/in/hansitha-ekanayaka-476016309",
    target: "_blank",
  },
  {
    href: "mailto:hansithaekanayaka1@gmail.com",
    icon: "fas fa-envelope",
    label: "Email",
    sub: "hansithaekanayaka1@gmail.com",
    target: "",
  },
  {
    href: "tel:+94767950458",
    icon: "fas fa-phone",
    label: "Phone",
    sub: "+94 767950458",
    target: "_blank",
  },
  {
    href: "https://www.instagram.com/_reshan_hansitha_?igsh=MWMzajVtMzdwNnc2Ng==",
    icon: "fab fa-instagram",
    label: "Instagram",
    sub: "instagram.com/hansithaekanayaka",
    target: "_blank",
  },
];

export default function Contact() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    e.target.reset();
    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="chip reveal">
        <span className="chip-dot" />
        Get In Touch
      </div>
      <h2 className="section-title reveal">
        Let's <span className="gradient-text">Work Together</span>
      </h2>

      <div className="contact-inner">
        {/* Left: Info + Socials */}
        <div className="reveal">
          <div className="contact-info">
            <p>
              I'm always eager to explore new opportunities and collaborate on
              innovative ideas. Let's connect and build something great together!
            </p>
          </div>
          <div className="social-row">
            {SOCIALS.map(({ href, icon, label, sub, target }) => (
              <a
                key={label}
                href={href}
                className="social-btn"
                target={target || undefined}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
              >
                <div className="social-icon-wrap">
                  <i className={icon} />
                </div>
                <div>
                  <div className="social-label">{label}</div>
                  <div className="social-sub">{sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="reveal" style={{ transitionDelay: "0.15s" }}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="f-row">
              <div className="f-group">
                <label className="f-label">Name</label>
                <input
                  className="f-input"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="f-group">
                <label className="f-label">Email</label>
                <input
                  className="f-input"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="f-group">
              <label className="f-label">Subject</label>
              <input
                className="f-input"
                type="text"
                placeholder="What's this about?"
              />
            </div>
            <div className="f-group">
              <label className="f-label">Message</label>
              <textarea
                className="f-textarea"
                rows="5"
                placeholder="Tell me about your project or opportunity..."
                required
              />
            </div>
            {success && (
              <div className="form-success">
                Message received! I'll be in touch within 24 hours. 🚀
              </div>
            )}
            <button
              type="submit"
              className="btn-primary"
              style={{ alignSelf: "flex-start" }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
