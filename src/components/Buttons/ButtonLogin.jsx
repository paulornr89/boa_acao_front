export default function Button({onClick}) {
    return <div className="form-group">
                <button type="button" className="btnLogin bg-secundary" onClick={onClick}>Login</button>
                <span><a target="_self" >Criar novo acesso?</a></span>
            </div>;
}