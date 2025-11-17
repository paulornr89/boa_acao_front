import ButtonLogin from "../Buttons/ButtonLogin";
import Input from "../Fields/Input";
// import './Login.css';
import logo from '../../assets/logo/logo01.svg';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import users from '../../data/doadores.json';
import { useNavigate } from "react-router-dom"; 

export default function Login() {
   const navigate = useNavigate();
   const { login: loginUser } = useContext(AuthContext);
   const [login, setLogin] = useState('');
   const [senha, setSenha] = useState('');

   function handleLogin(event) {
        //event.preventDefault();
        const usuarioEncontrado = users.find(user_ => (user_.email === login) && (user_.senha === senha));
        if(usuarioEncontrado) {
            loginUser(usuarioEncontrado);  
            navigate('/itens'); 
        }
    }
     
   return <div className="flex min-h-screen items-center justify-center">
            <form className="flex flex-col items-center font-bold gap-[10px] rounded-[10px] pt-10 pb-10 shadow-[0_0_15px_var(--color-content)] w-[40%] bg-primary text-content">
                <img src={logo} alt="Logo Boa Ação" className="logo h-[120px] w-[120px]"/>
                <Input className="w-[280px]"
                    id='login' 
                    placeholder='Login' 
                    value={login} 
                    onChange={e => setLogin(e.target.value)}/>
                <Input 
                    type="password" 
                    id="senha" 
                    placeholder="Senha" 
                    value={senha}
                    onChange={e => setSenha(e.target.value)}/>
                <ButtonLogin onClick={() => {handleLogin()}}/>                  
            </form>
       </div>;
}