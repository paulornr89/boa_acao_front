import FieldInput from "../Fields/FieldInput";
import FieldSelect from "../Fields/FieldSelect";
import RadioGroupLabel from "../Fields/RadioGroupLabel";
import { useNavigate } from "react-router-dom";

export default function CadastroDeUsuario() {
    const navigate = useNavigate();
    
    return <div className="cadastro-container min-h-screen w-full bg-primary text-content">
            <form className="cadastro pl-4 pr-4">
              <div className="text-center font-bold text-xl pt-4 pb-4">
                  {/* <a target="_self" href="../../public/menuAdmin.php" className="voltarCadastro"><img src="../../public/assets/arrowIcon.png" alt="Voltar"></a> */}
                  <h2 className="titulo-textoCadastro titulo-texto">Formulário de Cadastro</h2>
                  <div className="espaco-vazio"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-6">
                    <FieldInput text="Nome:" type="text" id="nome" placeholder="Digite seu nome"/>
                  </div>
                  <div className="md:col-span-4">
                    <FieldInput text="E-mail" type="email" id="email" placeholder="Digite seu e-mail"/>
                  </div>
                  <div className="md:col-span-2">
                    <FieldInput text="Telefone" type= "text" id="telefone" placeholder= "(99) 99999-9999"/>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-3">
                    <FieldInput text="CEP:" type="text" id="cep" placeholder="00000-000"/>
                  </div>
                  <div className="md:col-span-7">
                    <FieldInput text="Endereço:" type="text" id="endereco" placeholder="Digite seu endereço"/>
                  </div>
                  <div className="md:col-span-2">
                    <FieldInput text="Número:" type="text" id="numero" placeholder="Número"/>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-4">
                    <FieldInput text="Complemento:" type="text" id="complemento" placeholder="Apto, bloco, casa, etc"/>
                  </div>
                  <div className="md:col-span-4">
                    <FieldInput text="Cidade:" type="text" id="cidade" placeholder="Digite sua cidade"/>
                  </div>
                  <div className="md:col-span-1">
                    <FieldInput text="Estado:" type="text" id="estado" placeholder="Estado"/>
                  </div>
                  <div className="md:col-span-3">
                    <FieldSelect id="parceria" label="Parceria será como:" options={[
                        {value: '', label: 'Selecione uma opção...'},
                        {value: 'doador', label: 'Doador'},
                        {value: 'instituicao', label: 'Instituição Beneficente'}
                    ]}/>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  <div className="md:col-span-3">
                    <RadioGroupLabel text="Tipo de Pessoa:" name="tipo" options={[
                        {id: 'pj', name: 'tipo', value: 'PJ', text: 'PJ'}, 
                        {id: 'pf', name: 'tipo', value: 'PF', text: 'PF'}
                    ]}/>
                  </div>
                  <div className="md:col-span-3">
                    <FieldInput text="CPF/CNPJ:" type="text" id="cpf_cnpj" placeholder=""/>
                  </div>
                  <div className="md:col-span-3">
                    <FieldInput text="Senha:" type="password" id="senha" placeholder="Digite sua senha"/>
                  </div>
              </div>
              <div className="flex justify-between">
                  <button className="bg-white btn" type="reset" onClick={()=>{navigate('/login'); }}>Cancelar</button>
                  <button className="btn bg-secundary" type="submit">Salvar</button>
              </div>
          </form>
        </div>
}