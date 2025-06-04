import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from './components/HomePage';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
