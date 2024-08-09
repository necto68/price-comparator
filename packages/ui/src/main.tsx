import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './features/root/components/App.tsx';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
