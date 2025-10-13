import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import CadastroDeUsuario from './components/Login/Cadastro/Cadastro.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={ <App/> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/cadastro" element={ <CadastroDeUsuario/> } />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
