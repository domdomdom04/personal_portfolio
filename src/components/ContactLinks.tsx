import "./ContactLinks.css";

export function ContactLinks() {
  return (
    <nav className="contact-links" aria-label="Contact">
      <a className="contact-links__link" href="mailto:jdomlopz3@gmail.com">
        EMAIL
      </a>
      <a
        className="contact-links__link"
        href="https://www.linkedin.com/in/janna-buaya"
        target="_blank"
        rel="noopener noreferrer"
      >
        LINKEDIN
      </a>
    </nav>
  );
}
