import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./i18n.ts";

import { ThemeProvider } from './context/ThemeContext/ThemeContext.tsx';
import Provider from './providers.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
