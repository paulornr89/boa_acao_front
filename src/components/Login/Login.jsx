import ButtonLogin from "../Buttons/ButtonLogin";
import Input from "../Fields/Input";
import InputPassword from "../Fields/InputPassword";
import Title from "../Title";

export default function Login() {
   return <>
            <form className="login">
                <Title text='Doe+'/>
                <Input key='login' placeholder='Login'/>
                <InputPassword/>
                <ButtonLogin/>                  
            </form>
        </>;
}