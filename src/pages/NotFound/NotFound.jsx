import { Link } from 'react-router-dom';
import './NotFound.css'

export default function NotFound() {
    return <>
        <Link className='voltar' to="/">Voltar</Link>
        <div className='naoEncontrado'>
            <h1>Página não encontrada!</h1>
            <p>Rota errada ou parâmetro inválido.</p>

        </div>
    </>
}