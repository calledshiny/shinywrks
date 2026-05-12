import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initCustomCursor } from './lib/customCursor';
import { initDotGrid } from './lib/dotGrid';
import './styles.css';

const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
if (!isTouch) initCustomCursor();
initDotGrid();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
