import { Outlet } from 'react-router-dom';

export default function Categorias() {   

    return <div className="pt-5 pb-10">
            <div className="titulo">
                <h2 className="text-center font-bold text-xl pt-4 pb-4">Categorias</h2>
            </div>
            <div className="flex flex-row gap-4 flex-wrap justify-center">
                <Outlet/>
            </div>
        </div>;
}

