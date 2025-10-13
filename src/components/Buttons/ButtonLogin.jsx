export default function Button(props) {
    return <div className="form-group">
                <button type="submit" class="btnLogin">Login</button>
                <span><a target="_self" href="../app/views/cadastroUsuario.php">Criar novo acesso?</a></span>
            </div>;
}