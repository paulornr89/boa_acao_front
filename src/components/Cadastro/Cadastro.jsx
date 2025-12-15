import FieldInput from "../Fields/FieldInput";
import FieldSelect from "../Fields/FieldSelect";
import RadioGroupLabel from "../Fields/RadioGroupLabel";
import { DoadorContext } from '../../context/DoadorContext.jsx';
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroDeUsuario() {
    const navigate = useNavigate();
    const { storeDoador } = useContext(DoadorContext);
    const nomeRef = useRef();
    const emailRef = useRef();
    const telefoneRef = useRef();
    const cepRef = useRef();
    const enderecoRef = useRef();
    const cidadeRef = useRef();
    const estadoRef = useRef();
    const tipoUsuarioRef = useRef();
    const [tipoDocumento, setTipoDocumento] = useState('');
    const documentoRef = useRef();
    const senhaRef = useRef();
    
    return <div className="cadastro-container min-h-screen w-full bg-primary text-content">
            <form className="cadastro pl-4 pr-4">
              <div className="text-center font-bold text-xl pt-4 pb-4">
                  {/* <a target="_self" href="../../public/menuAdmin.php" className="voltarCadastro"><img src="../../public/assets/arrowIcon.png" alt="Voltar"></a> */}
                  <h2 className="titulo-textoCadastro titulo-texto">Formulário de Cadastro</h2>
                  <div className="espaco-vazio"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-6">
                    <FieldInput text="Nome:" type="text" id="nome" placeholder="Digite seu nome" ref={nomeRef}/>
                  </div>
                  <div className="md:col-span-4">
                    <FieldInput text="E-mail" type="email" id="email" placeholder="Digite seu e-mail" ref={emailRef}/>
                  </div>
                  <div className="md:col-span-2">
                    <FieldInput text="Telefone" type= "text" id="telefone" placeholder= "(99) 99999-9999" ref={telefoneRef}/>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-3">
                    <FieldInput text="CEP:" type="text" id="cep" placeholder="00000-000" ref={cepRef}/>
                  </div>
                  <div className="md:col-span-7">
                    <FieldInput text="Endereço:" type="text" id="endereco" placeholder="Digite seu endereço" ref={enderecoRef}/>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-4">
                    <FieldInput text="Cidade:" type="text" id="cidade" placeholder="Digite sua cidade" ref={cidadeRef}/>
                  </div>
                  <div className="md:col-span-1">
                    <FieldInput text="Estado:" type="text" id="estado" placeholder="Estado" ref={estadoRef}/>
                  </div>
                  <div className="md:col-span-3">
                    <FieldSelect id="parceria" label="Parceria será como:" options={[
                        {value: '', label: 'Selecione uma opção...'},
                        {value: 'doador', label: 'Doador'},
                        {value: 'instituicao', label: 'Instituição Beneficente'}
                    ]} ref={tipoUsuarioRef}/>
                  </div>
                  <div className="md:col-span-3">
                    <FieldInput text="CPF/CNPJ:" type="text" id="cpf_cnpj" placeholder="" ref={documentoRef}/>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <RadioGroupLabel text="Tipo de Pessoa:" name="tipo" onChange={setTipoDocumento} options={[
                        {id: 'pj', name: 'tipo', value: 'PJ', text: 'PJ'}, 
                        {id: 'pf', name: 'tipo', value: 'PF', text: 'PF'}
                    ]}/>
                  </div>
                  <div className="md:col-span-3">
                    <FieldInput text="Senha:" type="password" id="senha" placeholder="Digite sua senha" ref={senhaRef}/>
                  </div>
              </div>
              <div className="flex justify-between">
                  <button className="bg-white btn" type="reset" onClick={()=>{navigate('/login'); }}>Cancelar</button>
                  <button className="btn bg-secundary" type="submit"
                  onClick={async (e) => {
                    try{
                      e.preventDefault();
                      const resStore = await storeDoador({
                          nome: nomeRef.current.value,
                          email: emailRef.current.value,
                          telefone: telefoneRef.current.value,
                          cep: cepRef.current.value,
                          endereco: enderecoRef.current.value,
                          cidade: cidadeRef.current.value,
                          estado: estadoRef.current.value,
                          documento: documentoRef.current.value,
                          documento_tipo: tipoDocumento,
                          senha: senhaRef.current.value,
                          is_donor: tipoUsuarioRef.current.value == 'doador',
                          is_organization: tipoUsuarioRef.current.value == 'instituicao',
                      });
                      alert('Cadastro realizado com sucesso!');
                      //navigate('/login');
                    } catch (error) {
                      console.error(error);
                      alert('Erro ao realizar cadastro. Por favor, tente novamente.');
                    }
                  }}>Salvar</button>
              </div>
          </form>
        </div>
}