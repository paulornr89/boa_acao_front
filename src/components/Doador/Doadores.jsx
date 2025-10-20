import { Outlet } from 'react-router-dom';
import './Doadores.css';

export default function Doadores() {
    return <div className='mostraDoadores'>
        <Outlet/>
    </div>;
}