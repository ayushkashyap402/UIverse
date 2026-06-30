import React, { useRef, useState } from 'react'
import './FileUpload.css'

function FileUpload({
  label = 'Upload Files',
  multiple = false,
  disabled = false,
  accept = '*',
  maxSize = 5,
  maxFiles = 10,
  showPreview = true,
  dragAndDrop = true,
  helperText = '',
  onChange,
}) {
  const inputRef = useRef(null)

  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  /* ===============================
      Helpers
  =============================== */

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const isImage = (file) => file.type.startsWith('image/')

  const createPreview = (file) => ({
    file,
    preview: isImage(file) ? URL.createObjectURL(file) : null,
  })

  /* ===============================
      File Validation
  =============================== */

  const validateFiles = (selectedFiles) => {
    setError('')

    const validFiles = []

    for (const file of selectedFiles) {
      if (file.size > maxSize * 1024 * 1024) {
        setError(`${file.name} exceeds ${maxSize} MB`)
        continue
      }

      validFiles.push(createPreview(file))
    }

    if (validFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)

      return validFiles.slice(0, maxFiles)
    }

    return validFiles
  }

  /* ===============================
      Add Files
  =============================== */

  const addFiles = (selectedFiles) => {
    const validated = validateFiles(Array.from(selectedFiles))

    setFiles((prev) => {
      const updated = multiple ? [...prev, ...validated] : validated

      onChange?.(updated)

      return updated
    })
  }

  /* ===============================
      Input Change
  =============================== */

  const handleInput = (e) => {
    addFiles(e.target.files)
  }

  /* ===============================
      Drag Events
  =============================== */

  const handleDragOver = (e) => {
    e.preventDefault()

    if (!disabled) {
      setDragging(true)
    }
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()

    setDragging(false)

    if (disabled) return

    addFiles(e.dataTransfer.files)
  }
  /* ===============================
      Remove One
  =============================== */

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index)

    setFiles(updated)

    onChange?.(updated)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  /* ===============================
      Clear All
  =============================== */

  const clearFiles = () => {
    files.forEach((item) => {
      if (item.preview) {
        URL.revokeObjectURL(item.preview)
      }
    })

    setFiles([])

    setError('')

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    onChange?.([])
  }

  return (
    <div className="fu">
      {label && <label className="fu-label">{label}</label>}

      <div
        className={`fu-dropzone
        ${dragging ? 'dragging' : ''}
        ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && inputRef.current.click()}
        onDragOver={dragAndDrop ? handleDragOver : undefined}
        onDragLeave={dragAndDrop ? handleDragLeave : undefined}
        onDrop={dragAndDrop ? handleDrop : undefined}
      >
        <div className="fu-icon">📁</div>

        <h3>Drag & Drop Files</h3>

        <p>or click to browse</p>

        <small>Max {maxSize} MB</small>

        <input
          ref={inputRef}
          type="file"
          hidden
          multiple={multiple}
          disabled={disabled}
          accept={accept}
          onChange={handleInput}
        />
      </div>

      {helperText && <small className="fu-helper">{helperText}</small>}

      {error && <div className="fu-error">{error}</div>}

      {showPreview && files.length > 0 && (
        <div className="fu-list">
          <div className="fu-header">
            <h4>Selected Files</h4>

            <button className="fu-clear" onClick={clearFiles}>
              Clear All
            </button>
          </div>

          {files.map((item, index) => (
            <div key={index} className="fu-item">
              <div className="fu-left">
                {item.preview ? (
                  <img src={item.preview} alt={item.file.name} className="fu-preview" />
                ) : (
                  <div className="fu-file-icon">📄</div>
                )}

                <div>
                  <div className="fu-name">{item.file.name}</div>

                  <div className="fu-size">{formatSize(item.file.size)}</div>
                </div>
              </div>

              <button className="fu-remove" onClick={() => removeFile(index)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FileUpload
