import { Routes, Route } from 'react-router-dom';

import CadastroDeUsuario from '../components/Cadastro/Cadastro.jsx'
import Login from '../components/Login/Login.jsx';
import Itens from '../components/Itens/Itens.jsx';

export default function AppRoutes() {
    return (<Routes>
      <Route path="/" element={ <h1>APP BOA AÇÃO</h1> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/cadastro" element={ <CadastroDeUsuario/> } />
      <Route path="/itens" element={ <Itens/> } />
    </Routes>);
}