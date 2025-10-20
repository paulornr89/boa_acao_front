import CardDoador from "./CardDoador";
import mockDoadores from '../../data/doadores.json';

export default function ListaDeDoadores() {
    if(mockDoadores.length > 0) {
        return mockDoadores.map(doador => <CardDoador key={doador.id} doador={doador}/>)
    } else {
        return <p>Nenhum doador encontrado.</p>
    }
}