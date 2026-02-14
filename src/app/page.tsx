import Image from "next/image";
import Hero from "@/components/Sections/Hero";
import ProjectsGrid from "@/components/Sections/ProjectsGrid";
import Timeline from "@/components/Sections/Timeline";
import ContactForm from "@/components/Sections/ContactForm";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section id="hero">
        <Hero />
      </section>

      <section id="projects" className="home-projects">
        <div className="home-projects-header">
          <p className="home-projects-eyebrow">Featured Work</p>
          <h2 className="home-projects-title">Projects spotlight</h2>
          <p className="home-projects-subtitle">
            A curated snapshot of the products, platforms, and experiences I’ve built.
          </p>
        </div>
        <ProjectsGrid />
      </section>

      <Timeline />

      <section id="about" className="home-about">
        <div className="home-section-header">
          <p className="home-section-eyebrow">About</p>
          <h2 className="home-section-title">Who we are</h2>
          <p className="home-section-subtitle">
            Our story, what we stand for, and where we’re headed.
          </p>
        </div>
        <div className="home-about-layout">
          <div className="home-about-intro">
            <div className="home-about-image">
              <Image
                src="https://res.cloudinary.com/dpzndrhse/image/upload/v1771057311/IMG_20231202_101747_gbmkxn.png"
                alt="Williams Aperma"
                width={280}
                height={280}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="home-about-history">
              <h3 className="home-about-heading">Our story</h3>
              <p>
                We started with a simple belief: that technology should work for people, not the other way around. What began as a small team focused on solving real problems has grown into a partner for businesses and organizations who want reliable systems, clear communication, and results they can measure.
              </p>
              <p>
                Today we work across sectors—enterprise, startups, and the public sector—delivering IT services, custom software, and scalable solutions that help our clients operate smarter and grow with confidence.
              </p>
            </div>
          </div>
          <div className="home-about-values">
            <div className="home-about-card home-about-mission">
              <h3 className="home-about-card-title">Our mission</h3>
              <p>
                To be the technology partner that organizations trust: we deliver reliable services, build software that lasts, and support our clients at every step so they can focus on what matters most.
              </p>
            </div>
            <div className="home-about-card home-about-vision">
              <h3 className="home-about-card-title">Our vision</h3>
              <p>
                A future where every organization has access to technology that is secure, scalable, and human-centered—enabling growth, innovation, and impact in their communities and industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="home-contact">
        <div className="home-section-header">
          <p className="home-section-eyebrow">Contact</p>
          <h2 className="home-section-title">Talk to our IT team</h2>
          <p className="home-section-subtitle">
            Tell us about your goals and we’ll propose a tailored roadmap, timeline,
            and budget.
          </p>
        </div>
        <div className="home-contact-body">
          <ContactForm />
          <div className="home-contact-card">
            <h3>Business support</h3>
            <p>
              Share your requirements and receive a response from a solutions
              consultant within one business day.
            </p>
            <div className="home-contact-meta">
              <span>Location: Ghana-Kumasi</span>
              <span>Phone: 0599539341</span>
              <span>Response time: within 1 business day</span>
              <span>Available for enterprise, startup, and public sector</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
