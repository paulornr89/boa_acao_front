import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ItemProvider } from './context/ItemContext.jsx';
import { DoadorProvider } from './context/DoadorContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ItemProvider>
          <DoadorProvider>
            <App />
          </DoadorProvider>
        </ItemProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
