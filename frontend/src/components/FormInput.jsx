import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder = "",
  options = [],
  required = false,
  accept = "",
  error = "",
  onChange,
  defaultValue = "", // Added default value
  readOnly = false, // Added readonly flag
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          required={required}
          className={`block w-full px-4 py-2 border rounded-lg focus:ring-2 ${
            error ? "border-red-500 text-red-500 focus:ring-red-500" : "border-green-500 text-green-500 focus:ring-green-500"
          }`}
          onChange={onChange}
          defaultValue={defaultValue} // Set default value
          disabled={readOnly} // Disable select if readOnly
        >
          <option value="">Select</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          accept={accept}
          className={`block w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none ${
            error ? "border-red-500 text-red-500 focus:ring-red-500" : "border-green-500 text-green-500 focus:ring-green-500"
          }`}
          onChange={onChange}
          defaultValue={defaultValue} // Set default value
          readOnly={readOnly} // Make input readonly if required
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;