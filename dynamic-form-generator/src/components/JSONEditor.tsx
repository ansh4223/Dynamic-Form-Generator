import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";  
import "codemirror/theme/material.css";        

interface JSONEditorProps {
  jsonSchema: any;
  onJsonChange: (newSchema: any) => void;
  darkMode: boolean;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ jsonSchema, onJsonChange, darkMode }) => {
  const [editorValue, setEditorValue] = useState<string>(JSON.stringify(jsonSchema, null, 2));
  const [error, setError] = useState<string>("");

 
  useEffect(() => {
    setEditorValue(JSON.stringify(jsonSchema, null, 2));
  }, [jsonSchema]);

  const handleEditorChange = (editor: any, data: any, value: string) => {
    setEditorValue(value); 

    try {
      const parsed = JSON.parse(value);
      onJsonChange(parsed); 
      setError(""); 
    } catch (e) {
      setError("Invalid JSON"); 
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonSchema, null, 2));
    alert("JSON copied to clipboard!");
  };

  return (
    <div className={`h-full flex flex-col ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className={`text-xl font-semibold p-4 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200"}`}>JSON Editor</h2>
      <div className="flex justify-between p-4">
        <button
          onClick={handleCopyJson}
          className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${darkMode ? "bg-green-600" : ""}`}
        >
          Copy Form JSON
        </button>
      </div>
      <CodeMirror
        value={editorValue}
        options={{
          mode: "application/json",    
          lineNumbers: true,           
          theme: darkMode ? "material" : "default",  
          lineWrapping: true,          
          indentUnit: 2,               
        }}
        onBeforeChange={(editor, data, value) => handleEditorChange(editor, data, value)}  
      />
      {error && <div className="text-red-500 text-sm p-2">{error}</div>}
    </div>
  );
};

export default JSONEditor;
