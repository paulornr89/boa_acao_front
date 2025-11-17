export default function Button({onClick}) {
    return <div className="flex flex-col item-center">
                <button type="button" className="btnLogin bg-secundary w-[40%] rounded-[10px] h-[40px]" onClick={onClick}>Login</button>
                <span><a target="_self" >Criar novo acesso?</a></span>
            </div>;
}