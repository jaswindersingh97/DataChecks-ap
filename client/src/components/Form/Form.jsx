import React, { useState } from "react";

const Form = ({ fields, onSubmit, buttonLabel }) => {
  const [formValues, setFormValues] = useState(() =>
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = `${field.label || field.name} is required`;
      } else if (
        field.validate &&
        !field.validate(formValues[field.name], formValues)
      ) {
        newErrors[field.name] = field.errorMessage || "Invalid value";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const filteredValues = Object.fromEntries(
          Object.entries(formValues).filter(([_, value]) => value !== "")
        );
        await onSubmit(filteredValues);
      } catch (error) {
        console.error("Error during submission:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block mb-1 font-bold">
            {field.label || field.name}
          </label>
          <input
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            value={formValues[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full p-2 bg-inherit rounded-lg border  text-gray-600"
          />
          {errors[field.name] && (
            <span className="text-red-500 text-xs mt-1">{errors[field.name]}</span>
          )}
        </div>
      ))}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : buttonLabel}
      </button>
    </form>
  );
};

export default Form;
