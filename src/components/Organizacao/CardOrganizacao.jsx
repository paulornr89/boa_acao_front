import perfil from '../../assets/user-default.webp';

export default function CardOrganizacao({organizacao}) {
    return <div className="w-100 bg-primary flex gap-2 h-60 rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform 
    duration-300 hover:scale-103">
        <img className="w-30 self-center" src={perfil}/>
        <div className="w-60 self-center">
            <p>ID: <span>{organizacao.id}</span></p>
            <p>Razão: <span>{organizacao.razao}</span></p>
            <p>Telefone: <span>{organizacao.documento}</span></p>
            <p>Endereço: <span>{organizacao.endereco}</span></p>
            <p>Cidade: <span>{organizacao.cidade}</span></p>
            <p>Estado: <span>{organizacao.estado}</span></p>
            <p>CEP: <span>{organizacao.cep}</span></p>
            {/* <p>E-mail: <span>{organizacao.email}</span></p> */}
        </div>
    </div>
}