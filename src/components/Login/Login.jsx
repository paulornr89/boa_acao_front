import ButtonLogin from "../Buttons/ButtonLogin";
import Input from "../Fields/Input";
import Title from "./TitleLogin";
import './Login.css';
import logo from '../../assets/logo/logo04.svg';

export default function Login() {
   return <>
            <form className="login">
                <img src={logo} alt="Logo Boa Ação" className="logo"/>
                <Title text='Boa Ação'/>
                <Input id='login' placeholder='Login'/>
                <Input type="password" id="senha" placeholder="Senha"/>
                <ButtonLogin/>                  
            </form>
        </>;
}