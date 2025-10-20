import ButtonLogin from "../Buttons/ButtonLogin";
import Input from "../Fields/Input";
import InputPassword from "../Fields/InputPassword";
import Title from "./TitleLogin";
import './Login.css';

export default function Login() {
   return <>
            <form className="login">
                <Title text='Boa Ação'/>
                <Input key='login' placeholder='Login'/>
                <InputPassword/>
                <ButtonLogin/>                  
            </form>
        </>;
}