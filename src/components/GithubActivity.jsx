import { useRef, useEffect, useState } from "react";
import "./GithubActivity.css";

const GITHUB_USERNAME = "HansithaEkanayaka";

/* ── Blue colour levels ── */
const LEVEL_COLORS = {
  0: "rgba(255,255,255,0.05)",
  1: "#cae8ff",
  2: "#79c0ff",
  3: "#1f6feb",
  4: "#0a3069",
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];
const CELL = 13;
const GAP = 3;

/* ── Build grid columns (weeks) from flat contribution list ── */
function buildColumns(contributions) {
  if (!contributions || contributions.length === 0) return [];
  const columns = [];
  let col = [];

  const firstDay = new Date(contributions[0].date).getDay();
  for (let i = 0; i < firstDay; i++) col.push(null);

  contributions.forEach((day) => {
    col.push(day);
    if (new Date(day.date).getDay() === 6) {
      columns.push(col);
      col = [];
    }
  });
  if (col.length) {
    while (col.length < 7) col.push(null);
    columns.push(col);
  }
  return columns;
}

/* ── Month label positions ── */
function getMonthLabels(columns) {
  const labels = [];
  let lastMonth = -1;
  columns.forEach((col, ci) => {
    const first = col.find((d) => d !== null);
    if (first) {
      const m = new Date(first.date).getMonth();
      if (m !== lastMonth) {
        labels.push({ month: MONTHS[m], col: ci });
        lastMonth = m;
      }
    }
  });
  return labels;
}

/* ── Max streak ── */
function calcMaxStreak(contributions) {
  let max = 0, cur = 0;
  for (const d of contributions) {
    if (d.count > 0) { cur++; max = Math.max(max, cur); }
    else cur = 0;
  }
  return max;
}

/* ── Tooltip ── */
function Tooltip({ data, pos }) {
  if (!data) return null;
  const d = new Date(data.date);
  const label = d.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });
  return (
    <div className="ga-tooltip" style={{ left: pos.x, top: pos.y - 50 }}>
      <strong>{data.count}</strong> contribution{data.count !== 1 ? "s" : ""} on {label}
    </div>
  );
}

export default function GithubActivity() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  const [contributions, setContributions] = useState([]);
  const [totalContribs, setTotalContribs] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState({ data: null, pos: { x: 0, y: 0 } });

  /* ── Reveal-on-scroll, matching App.jsx observer pattern ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── Fetch real GitHub data ── */
  useEffect(() => {
    async function fetchData() {
      try {
        const contribRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (contribRes.ok) {
          const json = await contribRes.json();
          const contribs = json.contributions || [];
          if (contribs.length === 0) throw new Error("Empty contributions");
          setContributions(contribs);
          setTotalContribs(contribs.reduce((s, d) => s + d.count, 0));
          setMaxStreak(calcMaxStreak(contribs));
        } else {
          throw new Error(`HTTP ${contribRes.status}`);
        }

        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`
        );
        if (reposRes.ok) {
          const repos = await reposRes.json();
          const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
          setTotalStars(stars);
        }
      } catch (err) {
        console.error("GitHub API error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ── Auto-scroll to most recent (right) ── */
  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading]);

  const columns = buildColumns(contributions);
  const monthLabels = getMonthLabels(columns);

  const handleMouseEnter = (day, e) => {
    if (!day) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = scrollRef.current.getBoundingClientRect();
    setTooltip({
      data: day,
      pos: {
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top,
      },
    });
  };

  const stats = [
    { label: "TOTAL CONTRIBUTIONS", value: loading ? "—" : totalContribs.toLocaleString() },
    { label: "MAX STREAK", value: loading ? "—" : `${maxStreak} days` },
    { label: "TOTAL STARS", value: loading ? "—" : `${totalStars}` },
  ];

  return (
    <section className="github-activity-section reveal" id="github" ref={sectionRef}>
      <div className="ga-header">
        <span className="ga-eyebrow">OPEN SOURCE</span>
        <h2 className="ga-title">
          GitHub <span className="ga-accent">Activity</span>
        </h2>
        <p className="ga-subtitle">
          Real-time contribution heatmap from my GitHub profile.
        </p>
      </div>

      <div className="ga-card">
        <div className="ga-card-header">
          <div className="ga-profile">
            <img
              src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
              alt={GITHUB_USERNAME}
              className="ga-avatar"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=HE&background=0d1117&color=79c0ff`;
              }}
            />
            <div>
              <h3 className="ga-username">@{GITHUB_USERNAME}</h3>
              <p className="ga-contrib-count">
                {loading ? "Loading…" : `${totalContribs.toLocaleString()} contributions in the last year`}
              </p>
            </div>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ga-profile-btn"
          >
            View Profile →
          </a>
        </div>

        {loading ? (
          <div className="ga-loading">
            <div className="ga-spinner" />
            <span>Fetching GitHub data…</span>
          </div>
        ) : error ? (
          <div className="ga-fallback">
            <img
              src={`https://ghchart.rshah.org/2563eb/${GITHUB_USERNAME}`}
              alt={`${GITHUB_USERNAME}'s GitHub contribution chart`}
              className="ga-fallback-img"
            />
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="ga-grid-scroll"
            onMouseLeave={() => setTooltip({ data: null, pos: { x: 0, y: 0 } })}
          >
            <div style={{ position: "relative" }}>
              {/* Month labels */}
              <div className="ga-month-row">
                <div style={{ width: 30, flexShrink: 0 }} />
                <div style={{ position: "relative", flex: 1 }}>
                  {monthLabels.map(({ month, col }) => (
                    <span
                      key={`${month}-${col}`}
                      className="ga-month-label-abs"
                      style={{ left: col * (CELL + GAP) }}
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Day labels + grid */}
              <div style={{ display: "flex" }}>
                <div className="ga-day-labels-col">
                  {DAYS.map((d, i) => (
                    <div key={i} className="ga-day-label-cell" style={{ height: CELL, marginBottom: GAP }}>
                      {d}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: GAP }}>
                  {columns.map((col, ci) => (
                    <div key={ci} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                      {col.map((day, di) => (
                        <div
                          key={di}
                          className={`ga-cell${day ? " ga-cell-active" : ""}`}
                          style={{
                            width: CELL,
                            height: CELL,
                            backgroundColor: day ? LEVEL_COLORS[day.level ?? 0] : "transparent",
                            border: day ? "1px solid rgba(255,255,255,0.06)" : "none",
                          }}
                          onMouseEnter={(e) => handleMouseEnter(day, e)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="ga-legend">
                <span>Less</span>
                {Object.values(LEVEL_COLORS).map((c, i) => (
                  <div
                    key={i}
                    className="ga-cell"
                    style={{ width: CELL, height: CELL, backgroundColor: c, border: "1px solid rgba(255,255,255,0.06)" }}
                  />
                ))}
                <span>More</span>
              </div>

              {tooltip.data && <Tooltip data={tooltip.data} pos={tooltip.pos} />}
            </div>
          </div>
        )}

        <div className="ga-stats">
          {stats.map((s) => (
            <div key={s.label} className="ga-stat">
              <span className="ga-stat-label">{s.label}</span>
              <span className="ga-stat-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
