import React from 'react'

function CodeBlock({
  code,
  copied,
  onCopy,
  CopyIcon,
  CheckIcon,
}) {
  return (
    <div className="code-block">
      <div className="code-block-header">
        <span>JSX</span>

        <button
          className="copy-btn"
          onClick={() => onCopy(code)}
        >
          {copied ? (
            <>
              <CheckIcon /> Copied
            </>
          ) : (
            <>
              <CopyIcon /> Copy
            </>
          )}
        </button>
      </div>

      <pre>{code}</pre>
    </div>
  )
}

export default CodeBlock