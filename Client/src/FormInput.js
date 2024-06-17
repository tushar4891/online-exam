import React from "react";

function FormInput({ label, name, type, placeholder, onChange }) {
  return (
    <div className="mt-2 text-start">
      <label className="form-label ">{label}</label>
      <input
        type={type}
        name={name}
        class="form-control"
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default FormInput;
