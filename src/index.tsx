import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);