import { useState, useEffect, useRef } from "react";
import { NAV_LINKS, SKILLS, PROJECTS} from "./data/data";
import { useScrollReveal } from "./hooks/scroll";
import "./styles/main.css";



function App() {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  const scrollTo = (href) => {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  setMenuOpen(false);
};

  useScrollReveal();

useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 40);

    const sections = ["about", "skills", "projects", "contact"];

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id);
          break;
        }
      }
    }
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);  

useEffect(() => {
  const move = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    setCursorVisible(true);
  };

  const hide = () => setCursorVisible(false);

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseleave", hide);

  return () => {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseleave", hide);
  };
}, []);

  return (
    <>
     
      {/* Custom cursor */}
      <div
        className="cursor"
        style={{
          left: cursorPos.x - 4,
          top: cursorPos.y - 4,
          opacity: cursorVisible ? 1 : 0,
        }}
      />
      <div
        className="cursor-ring"
        style={{
          left: cursorPos.x - 18,
          top: cursorPos.y - 18,
          opacity: cursorVisible ? 1 : 0,
        }}
      />

      {/* NAVBAR */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span>~/</span>rui.dev
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={activeSection === l.href.replace("#", "") ? "active" : ""}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge">Available for remote work</div>
            <h1>
              Rui<br />
              <span className="accent">Orona</span><span className="dim">.</span>
            </h1>
            <p className="hero-sub">// Biomedical Engineer & Web Developer</p>
            <p className="hero-desc">
              Building technology at the intersection of biomedical engineering and software.
              Focused on clean architecture, meaningful tools, and remote collaboration.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("#projects")}>
                View Projects →
              </button>
              <a
                href="https://github.com/Ruigod64"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub ↗
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-num">3+</div>
                <div className="stat-label">Tech stacks</div>
              </div>
              <div className="stat">
                <div className="stat-num">5+</div>
                <div className="stat-label">Languages</div>
              </div>
              <div className="stat">
                <div className="stat-num">∞</div>
                <div className="stat-label">Curiosity</div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="avatar-wrap">
              <div className="avatar-ring" />
              <div className="avatar-placeholder">RO</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ABOUT */}
      <section id="about">
        <div className="section">
          <p className="section-label sr">01 — About</p>
          <h2 className="section-title sr sr-delay-1">Who I am</h2>
          <div className="about-grid">
            <div className="about-text sr sr-delay-2">
              <p>
                I'm a <strong>Biomedical Engineering student</strong> with a strong focus on software development.
                I combine knowledge of medical systems with modern tech to build tools that actually solve problems.
              </p>
              <p>
                My goal is to specialize in <strong>software for medical devices</strong> — working remotely on
                meaningful, well-engineered solutions that sit at the intersection of health and technology.
              </p>
              <p>
                I'm constantly learning, always shipping, and deeply committed to writing clean, maintainable code.
              </p>
            </div>
            <div className="sr sr-delay-3">
              <ul className="about-list">
                {[
                  "Biomedical Engineering — Mazatlán, Sinaloa MX",
                  "Open to full remote opportunities",
                  "Focused on medical device software",
                  "FastAPI + Python backend development",
                  "Git-first workflow, clean commits",
                  "Self-taught frontend, Bootstrap → React",
                ].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* SKILLS */}
      <section id="skills" className="skills-section">
        <div className="section">
          <p className="section-label sr">02 — Skills</p>
          <h2 className="section-title sr sr-delay-1">Technical stack</h2>
          <div className="skills-grid">
            {SKILLS.map((skill, i) => (
              <div
                className={`skill-cell sr sr-delay-${Math.min(i + 1, 5)}`}
                key={skill.category}
              >
                <span className="skill-icon">{skill.icon}</span>
                <div className="skill-cat">{skill.category}</div>
                <div className="skill-name">{skill.items[0]}{skill.items.length > 1 ? " +" + (skill.items.length - 1) : ""}</div>
                <div className="skill-tags">
                  {skill.items.map((item) => (
                    <span className="skill-tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* PROJECTS */}
      <section id="projects">
        <div className="section">
          <p className="section-label sr">03 — Projects</p>
          <h2 className="section-title sr sr-delay-1">Selected work</h2>
          <div className="projects-list sr sr-delay-2">
            {PROJECTS.map((project) => (
              <div className="project-item" key={project.title}>
                <div className="project-num">{project.number}</div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="project-link">
                  View <span className="project-link-arrow">↗</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section">
          <div className="contact-inner">
            <div className="sr">
              <p className="section-label">04 — Contact</p>
              <h2 className="contact-headline">
                Let's work<br /><span>together.</span>
              </h2>
              <p className="contact-desc">
                I'm actively looking for remote opportunities. If you have a project,
                a role, or just want to talk tech — my inbox is open.
              </p>
              <a href="mailto:ruigod64@gmail.com" className="contact-email">
                ✉ ruigod64@gmail.com
              </a>
            </div>
            <div className="sr sr-delay-2">
              <div className="social-links">
                {[
                  { label: "GitHub", handle: "@Ruigod64", href: "https://github.com/Ruigod64" },
                  { label: "LinkedIn", handle: "Rui Orona", href: "https://www.linkedin.com/in/rui-orona-186b1a335/" },
                  { label: "Facebook", handle: "rui.oronadiaz", href: "https://www.facebook.com/rui.oronadiaz/" },
                  { label: "WhatsApp", handle: "+52 669 150 6644", href: "https://wa.me/526691506644?text=Hi%20Rui,%20I%20saw%20your%20portfolio%20and%20want%20to%20talk%20about%20a%20project."}
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <div className="social-platform">
                      <div className="social-dot" />
                      <span>{s.label}</span>
                      <span style={{ color: "var(--text-muted)", opacity: 0.5, fontSize: "10px" }}>{s.handle}</span>
                    </div>
                    <span className="social-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer>
        <div className="footer-left">© 2026 Rui Orona — All rights reserved</div>
        <div className="footer-right">
          Designed & built with <span>♥</span>
        </div>
      </footer>
    </>
  );

}

export default App;

