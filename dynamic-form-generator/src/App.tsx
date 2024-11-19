import React, { useState } from "react";
import JSONEditor from "./components/JSONEditor";
import FormGenerator from "./components/FormGenerator";

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<any>({
    formTitle: "Project Requirements Survey",
    formDescription: "Please fill out this survey about your project needs",
    fields: [],
  });
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleJsonChange = (newSchema: any) => {
    setJsonSchema(newSchema);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col lg:flex-row h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className={`w-full lg:w-1/2 h-full border-r overflow-auto ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <JSONEditor jsonSchema={jsonSchema} onJsonChange={handleJsonChange} darkMode={darkMode} />
      </div>
      <div className={`w-full lg:w-1/2 h-full overflow-auto p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <FormGenerator schema={jsonSchema} darkMode={darkMode} />
      </div>
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default App;
