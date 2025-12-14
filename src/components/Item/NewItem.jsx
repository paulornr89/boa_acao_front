export default function NewItem() {   
    return <form>
                <div className='flex items-center gap-2 justify-between'>
                    <label>Nome:</label>
                    <Input text="Nome" type="text" id="nome" defaultValue={item.nome} ref={nomeRef}/>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Descrição:</label>
                    <Input type="text" id="descricao" defaultValue={item.descricao} ref={descricaoRef}/>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Unidade:</label>
                    <Input type="text" id="unidade" defaultValue={item.unidade} ref={unidadeRef}/>
                </div>                                
            </form>;
}