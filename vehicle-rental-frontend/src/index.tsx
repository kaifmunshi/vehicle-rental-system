// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // or wherever your App component is located

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you still see the error, add an empty export at the bottom
export {};
