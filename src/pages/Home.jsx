// Home.jsx – Landing page of UIverse

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import './Home.css'
const quickLinks = ['Home', 'Components', 'Features']

const communityLinks = ['GitHub', 'GSSoC', 'Contribute', 'Issues']

const resourceLinks = ['Docs', 'FAQ', 'Contribution Guide', 'License', 'Support']

function Home() {
  const [showButton, setShowButton] = useState(false)
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      question: 'Can I use UIverse components in my own project?',
      answer:
        'Yes! UIverse is open-source under the MIT License, so you can freely use and modify components in personal or commercial projects.',
    },
    {
      question: 'Do I need Tailwind CSS or any UI framework?',
      answer: 'No. UIverse is built using plain React and CSS with minimal dependencies.',
    },
    {
      question: 'How can I contribute to UIverse?',
      answer:
        'Fork the repository, create your component, register it, and open a Pull Request on GitHub.',
    },
    {
      question: 'Where should I report bugs or suggest improvements?',
      answer:
        'You can open an Issue on the GitHub repository for bug reports, feature requests, or suggestions.',
    },
    {
      question: 'Can I use UIverse components in my own project?',
      answer:
        'Yes. UIverse components are open source and designed to be copied, customized, and integrated into your own React projects.',
    },
    {
      question: 'Do I need Tailwind CSS or any UI framework?',
      answer:
        'No. UIverse components are built using plain React and CSS, so no additional UI framework or styling library is required.',
    },
    {
      question: 'How do I contribute a new component?',
      answer:
        'Create your component inside the src/components directory, register it in componentsList.js, add a showcase section in Components.jsx, and open a pull request following the contribution guidelines.',
    },
    {
      question: 'Can I improve an existing component instead of creating a new one?',
      answer:
        'Absolutely. Bug fixes, accessibility improvements, responsive enhancements, performance optimizations, and better documentation are all valuable contributions.',
    },
    {
      question: 'How do I report a bug or suggest a new feature?',
      answer:
        'Please create a GitHub Issue describing the problem or feature request with screenshots, reproduction steps, and expected behavior whenever possible.',
    },
    {
      question: 'What technologies are used in UIverse?',
      answer:
        'UIverse is built with React, Vite, React Router, and plain CSS to keep components lightweight and easy to customize.',
    },
    {
      question: 'Are the components responsive?',
      answer:
        'Yes. Every component should be responsive and work well across desktop, tablet, and mobile devices.',
    },
    {
      question: 'Can beginners contribute to UIverse?',
      answer:
        'Definitely! UIverse is designed to be beginner-friendly. New contributors are encouraged to start with documentation updates, bug fixes, or simple components before tackling larger features.',
    },
    {
      question: 'How should I write my pull request?',
      answer:
        'Keep your PR focused on a single change, provide a clear description, include screenshots for UI updates, and reference the related GitHub Issue whenever applicable.',
    },
    {
      question: 'Will more components be added in the future?',
      answer:
        'Yes. UIverse is continuously growing with new UI components, improvements, and community contributions through open-source programs and GitHub contributors.',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      text: 'UIverse makes it easy to build and learn at the same time.',
    },
    {
      name: 'Alex Chen',
      role: 'Open Source Contributor',
      text: 'The project structure is simple and beginner-friendly.',
    },
    {
      name: 'Priya Sharma',
      role: 'Student Developer',
      text: 'A great place to start contributing to open source.',
    },
    {
      name: 'Rahul Mehta',
      role: 'Full Stack Developer',
      text: 'Clean components and very intuitive structure. Great for learning React fundamentals.',
    },
    {
      name: 'Emily Watson',
      role: 'UI/UX Designer',
      text: 'The design system is minimal yet flexible enough to experiment with real UI patterns.',
    },
    {
      name: 'Karan Patel',
      role: 'Open Source Beginner',
      text: 'Perfect project for first-time contributors. Everything is easy to understand.',
    },
    {
      name: 'Sophia Lee',
      role: 'Frontend Intern',
      text: 'Loved how each component is isolated and reusable. Makes development faster.',
    },
    {
      name: 'Arjun Nair',
      role: 'Web Developer',
      text: 'A great way to practice React by building real-world UI components.',
    },
    {
      name: 'Neha Verma',
      role: 'Computer Science Student',
      text: 'UIverse helped me understand component-based architecture better.',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className="home-page">
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Open Source · GSSoC Ready
        </div>
        <h1 className="hero-title">
          Build faster with <span className="hero-gradient">UIverse</span>
        </h1>
        <p className="hero-subtitle">
          A beginner-friendly React component library with clean CSS, zero dependencies, and a
          structure that's easy to contribute to.
        </p>
        <div className="hero-actions">
          <Link to="/components">
            <Button text="Browse Components →" variant="primary" size="lg" />
          </Link>
          <a href="https://github.com/ayushkashyap402/UIverse" target="_blank" rel="noreferrer">
            <Button text="⭐ Star on GitHub" variant="secondary" size="lg" />
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">6+</span>
            <span className="stat-label">Components</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Variants each</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">0</span>
            <span className="stat-label">Dependencies</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">MIT</span>
            <span className="stat-label">License</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section" id="features">
        <h2 className="section-heading">Why UIverse?</h2>
        <p className="section-subheading">
          Everything you need to learn, build, and contribute — nothing you don't.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to contribute ── */}
      <section className="contribute-section" id="contribute">
        <div className="contribute-inner">
          <div className="contribute-text">
            <h2>Want to contribute?</h2>
            <p>
              UIverse is built for open-source contributors. Adding a new component takes just 3
              steps — create, register, showcase. No complex setup needed.
            </p>
            <div className="steps">
              <div className="step">
                <span className="step-num">1</span>Create your component in{' '}
                <code>src/components/</code>
              </div>
              <div className="step">
                <span className="step-num">2</span>Register it in{' '}
                <code>src/data/componentsList.js</code>
              </div>
              <div className="step">
                <span className="step-num">3</span>Add a section in{' '}
                <code>src/pages/Components.jsx</code>
              </div>
            </div>
          </div>
          <div className="contribute-cta">
            <a href="https://github.com/ayushkashyap402/UIverse" target="_blank" rel="noreferrer">
              <Button text="Fork on GitHub" variant="primary" size="lg" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonial-section">
        <h2 className="section-heading">Testimonials</h2>
        <p className="section-subheading">Know what people think and feel about UIverse</p>
        <div className="testimonial-container">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div className="testimonial-card" key={index}>
              <p>"{item.text}"</p>
              <h4>{item.name}</h4>
              <span>{item.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" id="faq">
        <h2 className="section-heading">Frequently Asked Questions</h2>

        <p className="section-subheading">
          Quick answers for contributors and developers getting started with UIverse.
        </p>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openFAQ === index ? 'active' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span>{faq.question}</span>
                <span>{openFAQ === index ? '−' : '+'}</span>
              </button>

              <div className={`faq-answer ${openFAQ === index ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      {showButton && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
      <footer className="footer-wrapper">
        <div className="footer-cta">
          <div className="footer-cta-icon">✦</div>

          <h2>Ready to contribute?</h2>

          <p>Join our community and help build UIverse better for everyone.</p>

          <a href="https://github.com/ayushkashyap402/UIverse" target="_blank" rel="noreferrer">
            <button className="footer-cta-btn">Start Contributing →</button>
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <h2>UIverse</h2>

            <p>
              A beginner-friendly React component library with clean CSS, zero dependencies, and a
              structure that's easy to contribute to.
            </p>

            <div className="footer-socials">
              <span>G</span>
              <span>D</span>
              <span>X</span>
              <span>♡</span>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>

            <a href="/">Home</a>

            <a href="/components">Components</a>

            <a href="#features">Features</a>
          </div>

          <div className="footer-links">
            <h3>Community</h3>

            <a href="https://github.com/ayushkashyap402/UIverse" target="_blank" rel="noreferrer">
              GitHub
            </a>

            <a href="https://gssoc.girlscript.tech/" target="_blank" rel="noreferrer">
              GSSoC
            </a>

            <a href="#contribute">Contribute</a>

            <a
              href="https://github.com/ayushkashyap402/UIverse/issues"
              target="_blank"
              rel="noreferrer"
            >
              Issues
            </a>
          </div>

          <div className="footer-links">
            <h3>Resources</h3>

            <a href="#contribute">Docs</a>

            <a href="#faq">FAQ</a>

            <a href="https://github.com/ayushkashyap402/UIverse" target="_blank" rel="noreferrer">
              Contribution Guide
            </a>

            <a
              href="https://github.com/ayushkashyap402/UIverse/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
            >
              License
            </a>

            <a
              href="https://github.com/ayushkashyap402/UIverse/issues"
              target="_blank"
              rel="noreferrer"
            >
              Support
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Made with care for the open-source community</p>

          <p>© 2026 UIverse • All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}

// SVG icon components (Lucide-style, 20×20)
const Icon = ({ d, children, viewBox = '0 0 24 24' }) => (
  <svg
    width="20"
    height="20"
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {d ? <path d={d} /> : children}
  </svg>
)

const features = [
  {
    icon: (
      <Icon>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </Icon>
    ),
    title: 'Plug & Play',
    desc: 'Drop any component into your project and it just works. No config, no wrappers.',
  },
  {
    icon: (
      <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    ),
    title: 'Plain CSS',
    desc: 'No Tailwind, no CSS-in-JS. Just clean, readable stylesheets you can actually learn from.',
  },
  {
    icon: (
      <Icon>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </Icon>
    ),
    title: 'Zero Extra Deps',
    desc: 'Only React and React Router. Keeps your bundle lean and your project simple.',
  },
  {
    icon: (
      <Icon>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </Icon>
    ),
    title: 'GSSoC Ready',
    desc: 'Structured for open-source contributions. Clear folders, clear comments, clear path.',
  },
  {
    icon: (
      <Icon>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </Icon>
    ),
    title: 'Beginner Friendly',
    desc: 'Every file is commented. Every pattern is explained. Perfect for learning React.',
  },
  {
    icon: (
      <Icon>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </Icon>
    ),
    title: 'Vite Powered',
    desc: 'Instant HMR and lightning-fast builds out of the box with Vite 5.',
  },
]

export default Home
