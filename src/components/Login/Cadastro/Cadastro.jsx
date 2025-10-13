import FieldInput from "../../Fields/FieldInput";
import FieldSelect from "../../Fields/FieldSelect";
import RadioGroupLabel from "../../Fields/RadioGroupLabel";

export default function CadastroDeUsuario() {
    return <>
            <form className="cadastro">
              <div className="tituloCadastro titulo">
                  {/* <a target="_self" href="../../public/menuAdmin.php" class="voltarCadastro"><img src="../../public/assets/arrowIcon.png" alt="Voltar"></a> */}
                  <h2 className="titulo-textoCadastro titulo-texto">Formulário de Cadastro</h2>
                  <div className="espaco-vazio"></div>
              </div>
              <div className="row">
                  <div className="col-6">
                    <FieldInput text="Nome:" type="text" id="nome" placeholder="Digite seu nome"/>
                  </div>
                  <div class="col-4">
                    <FieldInput text="E-mail" type="email" id="email" placeholder="Digite seu e-mail"/>
                  </div>
                  <div class="col-2">
                    <FieldInput text="Telefone" type= "text" id="telefone" placeholder= "(99) 99999-9999"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-3">
                    <FieldInput text="CEP:" type="text" id="cep" placeholder="00000-000"/>
                  </div>
                  <div class="col-7">
                    <FieldInput text="Endereço:" type="text" id="endereco" placeholder="Digite seu endereço"/>
                  </div>
                  <div class="col-2">
                    <FieldInput text="Número:" type="text" id="numero" placeholder="Número"/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-4">
                    <FieldInput text="Complemento:" type="text" id="complemento" placeholder="Apto, bloco, casa, etc"/>
                  </div>
                  <div class="col-4">
                    <FieldInput text="Cidade:" type="text" id="cidade" placeholder="Digite sua cidade"/>
                  </div>
                  <div class="col-1">
                    <FieldInput text="Estado:" type="text" id="estado" placeholder="Estado"/>
                  </div>
                  <div class="col-3">
                    <FieldSelect id="parceria" label="Parceria será como:" options={[
                        {value: '', label: 'Selecione uma opção...'},
                        {value: 'doador', label: 'Doador'},
                        {value: 'instituicao', label: 'Instituição Beneficente'}
                    ]}/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-3">
                    <RadioGroupLabel text="Tipo de Pessoa:" name="tipo" options={[
                        {id: 'pj', name: 'tipo', value: 'PJ', text: 'PJ'}, 
                        {id: 'pf', name: 'tipo', value: 'PF', text: 'PF'}
                    ]}/>
                  </div>
                  <div class="col-3">
                    <FieldInput text="CPF/CNPJ:" type="text" id="cpf_cnpj" placeholder=""/>
                  </div>
                  <div class="col-3">
                    <FieldInput text="Senha:" type="password" id="senha" placeholder="Digite sua senha"/>
                  </div>
              </div>
              <div class="row">
                  <button class="btnCancelar btn" type="reset">Cancelar</button>
                  <button class="btnSalvar btn" type="submit">Salvar</button>
              </div>
          </form>
        </>
}