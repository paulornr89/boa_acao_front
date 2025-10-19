import { Routes, Route } from 'react-router-dom';

import CadastroDeUsuario from '../components/Cadastro/Cadastro.jsx'
import Login from '../components/Login/Login.jsx';
import Itens from '../components/Itens/Itens.jsx';
import ListaDeItens from '../components/Itens/ListaDeItens.jsx';
import Item from '../components/Itens/Item.jsx';

export default function AppRoutes() {
    return (<Routes>
      <Route path="/" element={ <h1>APP BOA AÇÃO</h1> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/cadastro" element={ <CadastroDeUsuario/> } />
      <Route path="/itens" element={ <Itens/> }>
      
      <Route index element={ <ListaDeItens/> } />
      <Route path=":id" element={ <Item/> }/>
      </Route>
    </Routes>);
} 