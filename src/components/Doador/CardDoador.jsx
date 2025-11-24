import perfil from '../../assets/user-default.webp';

export default function CardDoador({doador}) {
    return <div className="w-100 bg-primary flex gap-2 h-35 rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform 
    duration-300 hover:scale-103">
        <img className="w-30 self-center" src={perfil}/>
        <div className="w-60 self-center">
            <p>ID: <span>{doador.id}</span></p>
            <p>Nome: <span>{doador.nome}</span></p>
            <p>Telefone: <span>{doador.telefone}</span></p>
            <p>E-mail: <span>{doador.email}</span></p>
        </div>
    </div>
}