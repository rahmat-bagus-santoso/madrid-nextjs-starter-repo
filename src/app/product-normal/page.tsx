"use client";
import React, { useState } from "react";

// 1. Define the shape of your form fields
interface IProductForm {
  name: string;
  notes: string;
  email: string;
}

// 2. Define the shape of your errors (keys match fields, values are strings)
type FormErrors = Partial<Record<keyof IProductForm, string>>;

function Page() {
  const [formData, setFormData] = useState<IProductForm>({
    name: "",
    notes: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Type the change event for HTML Input elements
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = (): boolean => {
    let tempErrors: FormErrors = {};

    if (!formData.name) tempErrors.name = "required input namanyaaa";
    if (!formData.notes) tempErrors.notes = "required input notes";

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    if (!formData.email) {
      tempErrors.email = "required email notes";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "invalid email format";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Type the form submission event
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("useState Form Data:", formData);
    } else {
      console.log("Validation Failed");
    }
  };

  return (
    <div>
      <h1>page product (useState + TS)</h1>

      <form onSubmit={onSubmitForm}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="name"
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}

        <input
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="notes"
        />
        {errors.notes && <div style={{ color: "red" }}>{errors.notes}</div>}

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

        <button type="submit">submittttt</button>
      </form>
    </div>
  );
}

export default Page;
