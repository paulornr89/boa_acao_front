import { Outlet } from 'react-router-dom';

export default function Doadores() {
    return <div className='mostraDoadores'>
        <div className="titulo">
                <h2 className="text-center font-bold text-xl pt-4 pb-4">Doadores</h2>
        </div>
        <div className="flex flex-row gap-4 flex-wrap justify-center">
            <ul className='list-none'>
                <Outlet/>
            </ul>
        </div>
    </div>;
}