import { useNavigate, Link } from "react-router-dom"; 

export default function Button({onClick}) {
    return <div className="flex flex-col items-center gap-[5px]">
                <button type="button" className="bg-secundary w-full rounded-[25px] h-[45px] md:h-[50px] transition-transform duration-200 hover:scale-109" onClick={onClick}>Login</button>
                <span>
                    <Link to="/cadastro">
                        Criar novo acesso?
                    </Link>
                </span>
            </div>;
}