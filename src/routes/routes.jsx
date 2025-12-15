import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes.jsx';
import CadastroDeUsuario from '../components/Cadastro/Cadastro.jsx'
import Login from '../components/Login/Login.jsx';
import Itens from '../components/Item/Itens.jsx';
import ListaDeItens from '../components/Item/ListaDeItens.jsx';
import Item from '../components/Item/Item.jsx';
import NewItem from '../components/Item/NewItem.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import Doadores from '../components/Doador/Doadores.jsx';
import ListaDeDoadores from '../components/Doador/ListaDeDoadores.jsx';
import Doador from '../components/Doador/Doador.jsx';
import Categorias from '../components/Categoria/Categorias.jsx';
import ListaDeCategorias from '../components/Categoria/ListaDeCategorias.jsx';
import CardCategoria from '../components/Categoria/CardCategoria.jsx';
import Organizacao from '../components/Organizacao/Organizacao.jsx';
import Home from '../pages/Home.jsx';
import NewCategoria from '../components/Categoria/NewCategoria.jsx';
import MainLayout from '../pages/private/MainLayout.jsx';

export default function AppRoutes() {
    return (<Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/cadastro" element={ <CadastroDeUsuario/> } />
      <Route element={<ProtectedRoutes />}>
        <Route element={ <MainLayout/> }>
          <Route path="/doadores" element={ <Doadores/> }>
            <Route index element={ <ListaDeDoadores/> }/>
            <Route path=":id" element={ <Doador/> }/>
          </Route>
          <Route path="/itens" element={ <Itens/> }>
            <Route index element={ <ListaDeItens/> } />
            <Route path=":id" element={ <Item/> }/>
            <Route path="cadastro" element={ <NewItem/> }/>
          </Route>
          <Route path="/categorias" element={ <Categorias/> }>
            <Route index element={ <ListaDeCategorias/> } />
            <Route path=":id" element={ <CardCategoria/> }/>
            <Route path="cadastro" element={ <NewCategoria/> }/>
          </Route>
        </Route>
      </Route>
      <Route path="/public">
        <Route path="itens" element={ <Itens/> }>
          <Route index element={ <ListaDeItens/> }/>
        </Route>
        <Route path="categorias" element={ <Categorias/> }/>
        <Route path="organizacoes" element={ <Organizacao/> }/>
      </Route>
      
        {/* <Route index element={ <ListaDeDoadores/> }/>
        <Route path=":id" element={ <Doador/> }/> */}
        {/* <Route index element={ <ListaDeDoadores/> }/>
        <Route path=":id" element={ <Doador/> }/> */}
      <Route path="*" element={<NotFound />}/>
    </Routes>);
} 