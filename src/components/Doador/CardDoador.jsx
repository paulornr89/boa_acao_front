import perfil from '../../assets/user-default.webp';
import './Doador.css'

export default function CardDoador({doador}) {
    return <div className="cardDoador">
        <img className="perfil" src={perfil}/>
        <div className="dadosUser">
            <p>ID: <span>{doador.id}</span></p>
            <p>Nome: <span>{doador.nome}</span></p>
            <p>Telefone: <span>{doador.telefone}</span></p>
            <p>E-mail: <span>{doador.email}</span></p>
        </div>
    </div>
}