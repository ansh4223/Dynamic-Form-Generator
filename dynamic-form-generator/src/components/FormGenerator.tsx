import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: Field[];
}

interface FormGeneratorProps {
  schema: FormSchema;
  darkMode: boolean;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema, darkMode }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    alert("Form submitted successfully!");

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "submission.json";
    link.click();
  };

  return (
    <div className={`h-full flex flex-col ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-black"}`}>{schema.formTitle}</h2>
      <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>{schema.formDescription}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className={`font-medium ${darkMode ? "text-white" : "text-black"}`}>
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>

           
            {["text", "email", "textarea"].includes(field.type) && (
              <>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    {...register(field.id, {
                      required: field.required && "This field is required",
                      ...(field.validation?.pattern
                        ? {
                            pattern: {
                              value: new RegExp(field.validation.pattern),
                              message: field.validation.message,
                            },
                          }
                        : {}),
                    })}
                    className={`border rounded p-2 ${darkMode ? "bg-gray-700 text-white" : ""}`}
                  />
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.id, {
                      required: field.required && "This field is required",
                      ...(field.validation?.pattern
                        ? {
                            pattern: {
                              value: new RegExp(field.validation.pattern),
                              message: field.validation.message,
                            },
                          }
                        : {}),
                    })}
                    className={`border rounded p-2 ${darkMode ? "bg-gray-700 text-white" : ""}`}
                  />
                )}
              </>
            )}

          
            <div className="text-sm text-gray-500">
              {field.required && <p>Required</p>}
              {field.validation?.pattern && <p>Pattern: {field.validation.message}</p>}
            </div>

            {field.type === "select" && (
              <select
                id={field.id}
                {...register(field.id, { required: field.required && "This field is required" })}
                className={`border rounded p-2 ${darkMode ? "bg-gray-700 text-white" : ""}`}
              >
                <option value="">Select...</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === "radio" && (
              <div>
                {field.options?.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`${field.id}-${option.value}`}
                      value={option.value}
                      {...register(field.id, { required: field.required && "This field is required" })}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.id]?.message as string}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${darkMode ? "bg-blue-600" : ""}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormGenerator;
