import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import CadastroDeUsuario from '../components/Cadastro/Cadastro.jsx'
import Login from '../components/Login/Login.jsx';
import Itens from '../components/Item/Itens.jsx';
import ListaDeItens from '../components/Item/ListaDeItens.jsx';
import Item from '../components/Item/Item.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import Doadores from '../components/Doador/Doadores.jsx';
import ListaDeDoadores from '../components/Doador/ListaDeDoadores.jsx';
import Doador from '../components/Doador/Doador.jsx';

export default function AppRoutes() {
    return (<Routes>
      <Route path="/" element={ <h1>APP BOA AÇÃO</h1> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/cadastro" element={ <CadastroDeUsuario/> } />
      <Route element={<ProtectedRoutes />}>
        <Route path="/itens" element={ <Itens/> }>
          <Route index element={ <ListaDeItens/> } />
          <Route path=":id" element={ <Item/> }/>
        </Route>
        <Route path="/doadores" element={ <Doadores/> }>
          <Route index element={ <ListaDeDoadores/> }/>
          <Route path=":id" element={ <Doador/> }/>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>);
} 