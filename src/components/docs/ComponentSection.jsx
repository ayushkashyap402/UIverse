import React from 'react'

function ComponentSection({
  id,
  sectionRef,
  title,
  status,
  description,
  children,
}) {
  return (
    <section
      className="comp-section"
      id={id}
      ref={sectionRef}
    >
      <div className="comp-section-header">
        <h2>{title}</h2>

        <span
          className={`comp-badge comp-badge--${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>

      <p className="comp-section-desc">
        {description}
      </p>

      {children}
    </section>
  )
}

export default ComponentSection