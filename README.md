# Dynamic-Form-Generator

1. Install Node.js & npm

2. Create a New React Project
npx create-react-app form-builder --template typescript
cd form-builder

3. Install Required Dependencies
npm install react-hook-form codemirror react-codemirror2

4. Add Tailwind CSS for Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
Open the tailwind.config.js file and update the content section:
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

Add the following lines to your src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;


5. Set Up the File Structure
src/
  components/
    JSONEditor.tsx
    FormGenerator.tsx
  App.tsx
  index.tsx

7. Run the Development Server
npm start
