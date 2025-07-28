import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { globalStyles } from "./styles";
import ErrorBoundary from "./components/ErrorBoundary";

// Add global error handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Inject global styles
const styleElement = document.createElement("style");
styleElement.innerHTML = globalStyles;
document.head.appendChild(styleElement);

// Add debugging
console.log('React app starting...');
console.log('Current URL:', window.location.href);
console.log('Protocol:', window.location.protocol);
console.log('User agent:', navigator.userAgent);

// Check if running in production
const isProduction = window.location.hostname !== 'localhost';
console.log('Is production:', isProduction);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found!');
  // Create a fallback display
  document.body.innerHTML = `
    <div style="color: white; background: black; padding: 20px; font-family: Arial;">
      <h1>Error: Root element not found</h1>
      <p>The React app could not start because the root element is missing.</p>
      <p>URL: ${window.location.href}</p>
      <p>Please check the console for more details.</p>
    </div>
  `;
} else {
  console.log('Root element found, rendering app...');
  
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('React app rendered successfully!');
  } catch (error) {
    console.error('Failed to render React app:', error);
    rootElement.innerHTML = `
      <div style="color: white; background: black; padding: 20px; font-family: Arial;">
        <h1>Error: Failed to render React app</h1>
        <p>Error: ${error.message}</p>
        <p>Please check the console for more details.</p>
      </div>
    `;
  }
}
