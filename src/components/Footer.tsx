import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/#hero" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const services = [
  "Custom software",
  "Cloud & DevOps",
  "IT consulting",
  "Product engineering",
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://github.com/AP00014" },
  { label: "Email", href: "mailto:hello@snergize.studio" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <h2>Snergize Studio</h2>
          <p>
            Professional IT services and product engineering for teams that need
            reliable, scalable solutions.
          </p>
          <div className="site-footer-badges">
            <span>Enterprise-ready</span>
            <span>Security-first</span>
          </div>
        </div>

        <div className="site-footer-columns">
          <div className="site-footer-column">
            <h3>Quick links</h3>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer-column">
            <h3>Services</h3>
            <ul>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="site-footer-column">
            <h3>Contact</h3>
            <address className="site-footer-contact">
              <ul>
                <li>
                  <a href="mailto:hello@snergize.studio">hello@snergize.studio</a>
                </li>
                <li>
                  <a href="tel:+233599539341">+233 59 953 9341</a>
                </li>
                <li>Ghana · Kumasi</li>
              </ul>
            </address>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} Snergize Studio. All rights reserved.</p>
        <div className="site-footer-socials">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
