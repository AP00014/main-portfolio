const timelineItems = [
  {
    year: "2024",
    title: "Guided Studio Experience",
    description: "Designed a voice-first guide for portfolio navigation.",
  },
  {
    year: "2023",
    title: "Full-Stack Projects",
    description: "Built interactive web apps using Next.js and Node.js.",
  },
  {
    year: "2022",
    title: "Frontend Focus",
    description: "Crafted polished UI systems and design systems.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="timeline-section">
      <h2 className="timeline-title">Journey Highlights</h2>
      <div className="timeline-list">
        {timelineItems.map((item) => (
          <div key={item.year} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot" />
              <div className="timeline-line" />
            </div>
            <div className="timeline-content">
              <p className="timeline-year">{item.year}</p>
              <h3 className="timeline-item-title">{item.title}</h3>
              <p className="timeline-item-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
