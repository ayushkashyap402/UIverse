// src/components/FormBuilder/FormBuilder.jsx
import React, { useState } from 'react';
import './FormBuilder.css';

/* ================= 1. BASE HELPERS ================= */
export const ValidationMessage = ({ message }) => (
  message ? <span className="uv-helper error">{message}</span> : null
);

export const Label = ({ text, required }) => (
  text ? <label className="uv-label">{text} {required && <span className="uv-required">*</span>}</label> : null
);

/* ================= 2. CORE INPUTS ================= */
export const Input = ({ label, type = 'text', error, required, ...props }) => (
  <div className="uv-group">
    <Label text={label} required={required} />
    <input type={type} className={`uv-input ${error ? 'error' : ''}`} required={required} {...props} />
    <ValidationMessage message={error} />
  </div>
);

export const TextArea = ({ label, error, required, rows = 4, ...props }) => (
  <div className="uv-group">
    <Label text={label} required={required} />
    <textarea className={`uv-input ${error ? 'error' : ''}`} rows={rows} required={required} {...props}></textarea>
    <ValidationMessage message={error} />
  </div>
);

/* ================= 3. SPECIALIZED INPUTS ================= */
export const PasswordField = (props) => <Input type="password" {...props} />;
export const EmailInput = (props) => <Input type="email" placeholder="name@example.com" {...props} />;
export const PhoneNumberInput = (props) => <Input type="tel" placeholder="(555) 000-0000" {...props} />;
export const SearchInput = (props) => <Input type="search" placeholder="Search..." {...props} />;
export const DatePicker = (props) => <Input type="date" {...props} />;

/* ================= 4. SELECTIONS & TOGGLES ================= */
export const Checkbox = ({ label, required, ...props }) => (
  <div className="uv-group">
    <label className="uv-check-radio-label">
      <input type="checkbox" className="uv-checkbox" required={required} {...props} /> {label}
    </label>
  </div>
);

export const RadioButton = ({ label, name, options = [], required, ...props }) => (
  <div className="uv-group">
    <Label text={label} required={required} />
    {options.map((opt, i) => (
      <label key={i} className="uv-check-radio-label">
        <input type="radio" name={name} value={opt.value} className="uv-radio" required={required} {...props} /> {opt.label}
      </label>
    ))}
  </div>
);

export const ToggleSwitch = ({ label, checked, onChange, disabled }) => (
  <div className="uv-group">
    <label className="uv-check-radio-label">
      <div className={`uv-toggle-pill ${checked ? 'active' : ''}`}>
        <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="uv-toggle-input" />
        <div className="uv-toggle-circle"></div>
      </div>
      {label && <span>{label}</span>}
    </label>
  </div>
);

/* ================= 5. DROPDOWNS ================= */
export const Dropdown = ({ label, options = [], error, required, ...props }) => (
  <div className="uv-group">
    <Label text={label} required={required} />
    <select className={`uv-input ${error ? 'error' : ''}`} required={required} {...props}>
      <option value="" disabled selected>Select an option</option>
      {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
    </select>
    <ValidationMessage message={error} />
  </div>
);

export const MultiSelect = ({ label, options = [], ...props }) => (
  <div className="uv-group">
    <Label text={label} />
    <select multiple className="uv-input" style={{ minHeight: '100px' }} {...props}>
      {options.map((opt, i) => <option key={i} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
);

export const Autocomplete = ({ label, options = [], id = "datalist-id", ...props }) => (
  <div className="uv-group">
    <Label text={label} />
    <input list={id} className="uv-input" {...props} />
    <datalist id={id}>
      {options.map((opt, i) => <option key={i} value={opt} />)}
    </datalist>
  </div>
);

/* ================= 6. ADVANCED INPUTS ================= */
export const FileUpload = ({ label, required, ...props }) => (
  <div className="uv-group">
    <Label text={label} required={required} />
    <input type="file" className="uv-file-input" required={required} {...props} />
  </div>
);

export const Slider = ({ label, min = 0, max = 100, step = 1, ...props }) => (
  <div className="uv-group">
    <Label text={label} />
    <input type="range" min={min} max={max} step={step} className="uv-slider" {...props} />
  </div>
);

export const OTPInput = ({ length = 4, label = "Enter OTP" }) => (
  <div className="uv-group">
    <Label text={label} />
    <div className="uv-otp-container">
      {Array.from({ length }).map((_, i) => (
        <input key={i} type="text" maxLength="1" className="uv-otp-input" />
      ))}
    </div>
  </div>
);

export const RatingInput = ({ label, maxStars = 5 }) => {
  const [rating, setRating] = useState(0);
  return (
    <div className="uv-group">
      <Label text={label} />
      <div className="uv-rating">
        {Array.from({ length: maxStars }).map((_, i) => (
          <span key={i} className={i < rating ? 'active' : ''} onClick={() => setRating(i + 1)}>★</span>
        ))}
      </div>
    </div>
  );
};

export const AddressInput = ({ label = "Address" }) => (
  <div className="uv-group" style={{ marginBottom: 0 }}>
    <Label text={label} />
    <input type="text" className="uv-input" placeholder="Street Address" style={{ marginBottom: '8px' }} />
    <div className="uv-address-row">
      <input type="text" className="uv-input" placeholder="City" />
      <input type="text" className="uv-input" placeholder="ZIP" />
    </div>
  </div>
);

/* ================= 7. BUTTON ================= */
export const SubmitButton = ({ text = "Submit", onClick, disabled }) => (
  <button type="submit" className="uv-button" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);