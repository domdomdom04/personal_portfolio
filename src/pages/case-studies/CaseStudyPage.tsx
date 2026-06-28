import { Link, Navigate, useParams } from "react-router-dom";
import { CaseStudySidebar } from "../../components/CaseStudySidebar";
import { LocationBadge } from "../../components/LocationBadge";
import { ThemeToggle } from "../../components/ThemeToggle";
import { WeatherWidget } from "../../components/WeatherWidget";
import { PROJECTS } from "../../data/projects";
import {
  CASE_STUDY_IMG,
  CASE_STUDY_NAV_ITEMS,
  getCaseStudyBadgeLabel,
  getCaseStudyToolbarMeta,
} from "./caseStudyShared";
import "./CaseStudyPage.css";

function SectionLabel({
  children,
  center = false,
}: {
  children: string;
  center?: boolean;
}) {
  return (
    <p className={center ? "cs-label cs-label--center" : "cs-label"}>
      [{children}]
    </p>
  );
}

export function CaseStudyPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find((entry) => entry.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const toolbarMeta = getCaseStudyToolbarMeta(project.meta);
  const badgeLabel = getCaseStudyBadgeLabel(project.meta, project.title);

  return (
    <div className="case-study">
      <CaseStudySidebar items={[...CASE_STUDY_NAV_ITEMS]} tryItYourselfHref="#" />

      <div className="case-study__main">
        <header className="case-study__toolbar">
          <Link to="/projects" className="case-study__toolbar-back">
            ← BACK
          </Link>
          <span className="case-study__meta">{toolbarMeta}</span>
          <ThemeToggle />
        </header>

        <article className="case-study__content">
          <section id="overview" className="cs-section cs-hero">
            <h1 className="cs-hero__title">{project.title}</h1>
            <p className="cs-hero__subtitle">
              DESIGNING A SIMPLE AND APPROACHABLE CAKE ORDERING EXPERIENCE
            </p>
            <p className="cs-hero__desc">
              An approachable and easy-to-navigate experience that helps
              customers explore and order custom cakes with ease.
            </p>

            <div className="cs-hero__image-wrap">
              <img
                src={`${CASE_STUDY_IMG}/final-design-hero.png`}
                alt={`${project.title} case study hero preview`}
                className="cs-hero__image"
              />
            </div>

            <div className="cs-meta">
              <div className="cs-meta__item">
                <span className="cs-meta__label">TEAM</span>
                <p>Just Janna :P</p>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">TIMELINE</span>
                <p>11th January 25&apos; – 3rd February 25&apos; (23 days)</p>
              </div>
              <div className="cs-meta__item">
                <span className="cs-meta__label">ROLE</span>
                <p>
                  I designed the end-to-end experience, focusing on browsing,
                  enquiry flow, and overall UI design.
                </p>
              </div>
            </div>

            <div className="cs-prose">
              <SectionLabel>PROJECT OVERVIEW</SectionLabel>
              <p>
                This project was a self-initiated redesign for Nini Cake, a
                small local cake business based in Auckland.
              </p>
              <p>
                The existing ordering process relied entirely on Instagram DMs,
                which made it time-consuming and unstructured for both customers
                and the business.
              </p>
              <p>
                The goal of this project was to create a website that
                streamlines how customers browse cake designs, customise their
                orders, and make enquiries in a clear and structured way.
              </p>
            </div>
          </section>

          <section id="problem-space" className="cs-section">
            <div className="cs-split">
              <div className="cs-split__text">
                <SectionLabel>PROBLEM SPACE</SectionLabel>
                <p className="cs-quote">
                  &ldquo;I&apos;m not sure what to ask… how do I order
                  this?&rdquo;
                </p>
                <p>From reviewing the current experience, I identified key issues:</p>
                <ul className="cs-list">
                  <li>ordering relies entirely on Instagram DMs</li>
                  <li>unclear pricing and customisation options</li>
                  <li>no structured way to submit order details</li>
                  <li>back-and-forth messaging slows down the process</li>
                </ul>
                <p>
                  These issues make ordering feel confusing and time-consuming
                  for customers.
                </p>
              </div>
              <div className="cs-split__media">
                <img
                  src={`${CASE_STUDY_IMG}/browse-gallery.png`}
                  alt="Gallery of custom cake designs from Nini Cake"
                  className="cs-rounded-image"
                />
              </div>
            </div>
          </section>

          <section id="user-flow" className="cs-section">
            <SectionLabel>TARGET AUDIENCE</SectionLabel>
            <p>
              Customers looking to order custom cakes, often for events or
              special occasions.
            </p>
            <p className="cs-subheading">They want to:</p>
            <ul className="cs-list">
              <li>browse designs for inspiration</li>
              <li>understand options clearly</li>
              <li>get quick and reliable pricing</li>
            </ul>

            <div className="cs-spacer" />

            <SectionLabel>USER FLOW</SectionLabel>
            <p className="cs-subheading">Current vs improved experience</p>
            <p>
              The existing flow relied on back-and-forth messaging through
              Instagram, requiring customers to manually provide details and wait
              for responses.
            </p>
            <p>The proposed flow introduces:</p>
            <ul className="cs-list">
              <li>structured browsing of cake designs</li>
              <li>guided enquiry forms</li>
              <li>real-time pricing feedback</li>
            </ul>

            <div className="cs-flow-image">
              <span className="cs-flow-badge">CURRENT USER FLOW</span>
              <img
                src={`${CASE_STUDY_IMG}/user-flow-current.png`}
                alt="Flowchart showing the current Instagram-based ordering process"
              />
            </div>

            <div className="cs-flow-image">
              <span className="cs-flow-badge">IMPROVED USER FLOW</span>
              <img
                src={`${CASE_STUDY_IMG}/user-flow-improved.png`}
                alt="Flowchart showing the improved website-based ordering process"
              />
            </div>
          </section>

          <section id="opportunity" className="cs-section">
            <div className="cs-opportunity-block">
              <SectionLabel center>OPPORTUNITY</SectionLabel>
              <p className="cs-lead">
                How might we create a simple and structured experience that helps
                customers easily browse, customise, and enquire about custom
                cakes?
              </p>
            </div>

            <div className="cs-spacer" />

            <SectionLabel>IDEATION</SectionLabel>
            <p>
              As I explored ideas, I focused on shaping the experience more
              like an e-commerce journey, centred around browsing, customising,
              and ordering.
            </p>

            <div className="cs-columns">
              <div className="cs-column">
                <h3 className="cs-column__title">BROWSE</h3>
                <p>
                  Allow customers to explore cake designs through a visual
                  gallery, making it easy to find inspiration and understand
                  available styles.
                </p>
              </div>
              <div className="cs-column">
                <h3 className="cs-column__title">CUSTOMISE</h3>
                <p>
                  Provide clear and structured options for size, flavour, and
                  design preferences, helping users personalise their order
                  without confusion.
                </p>
              </div>
              <div className="cs-column">
                <h3 className="cs-column__title">ORDER / ENQUIRE</h3>
                <p>
                  Introduce a guided flow that feels closer to an online
                  checkout, where users can input details, see pricing, and
                  submit their order in a clear and organised way.
                </p>
                <p>
                  These directions helped transform the experience from
                  unstructured messaging into a more familiar and seamless
                  online shopping journey.
                </p>
              </div>
            </div>
          </section>

          <section id="final-design" className="cs-section">
            <div className="cs-final-header">
              <SectionLabel center>FINAL DESIGN</SectionLabel>
              <span className="cs-final-badge">{badgeLabel}</span>
              <p className="cs-lead">
                Introducing a more intuitive and approachable cake ordering
                experience
              </p>
            </div>

            <div className="cs-showcase">
              <img
                src={`${CASE_STUDY_IMG}/final-design-hero.png`}
                alt={`${project.title} homepage hero`}
              />
            </div>

            <div className="cs-showcase">
              <img
                src={`${CASE_STUDY_IMG}/final-design-full.png`}
                alt={`${project.title} full website design`}
              />
            </div>
          </section>

          <section id="browse" className="cs-section">
            <SectionLabel>BROWSE AND GET INSPIRED</SectionLabel>
            <p className="cs-section-desc">
              A gallery of past designs helps customers explore styles and find
              inspiration
            </p>
            <div className="cs-showcase">
              <img
                src={`${CASE_STUDY_IMG}/browse-gallery.png`}
                alt={`${project.title} shop page with product grid`}
              />
            </div>
          </section>

          <section id="guided-ordering" className="cs-section">
            <SectionLabel>GUIDED CUSTOM ORDERING</SectionLabel>
            <p className="cs-section-desc">
              A structured flow allows users to select options and provide
              details in a clear and organised way
            </p>
            <div className="cs-showcase">
              <img
                src={`${CASE_STUDY_IMG}/guided-ordering.png`}
                alt={`${project.title} custom ordering form`}
              />
            </div>
          </section>

          <section id="brand-ui" className="cs-section">
            <SectionLabel>BRAND &amp; UI</SectionLabel>
            <div className="cs-showcase">
              <img
                src={`${CASE_STUDY_IMG}/brand-ui.png`}
                alt={`${project.title} brand identity`}
              />
            </div>
          </section>

          <section id="reflection" className="cs-section cs-section--last">
            <SectionLabel>REFLECTION</SectionLabel>
            <p>
              This project pushed me past just making things look nice. I had to
              figure out how to untangle a messy IG DM process and make it feel
              simple for real people ordering cakes.
            </p>
            <p>
              Leaning into familiar e-commerce patterns helped a lot here:
              browse, customise, enquire. It&apos;s the kind of flow that saves
              everyone time, including the person running the business on their
              phone all day.
            </p>
            <p>
              If I kept going, I&apos;d love to add real availability, payments,
              and order tracking. But for 23 days, I&apos;m pretty happy with
              where this landed :)
            </p>
          </section>
        </article>

        <footer className="case-study__footer">
          <LocationBadge />
          <a href="#overview" className="case-study__back-to-top">
            ↑ BACK TO TOP
          </a>
          <WeatherWidget />
        </footer>
      </div>
    </div>
  );
}
