import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';

// NOTE: StrictMode is intentionally omitted — it double-invokes effects in dev,
// which broke the asset-counting logic in the loader (each asset counted twice,
// instantly hitting 100% and making the loader flash and vanish).
createRoot(document.getElementById('root')!).render(<App />);
