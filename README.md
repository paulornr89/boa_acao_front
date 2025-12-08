# 🎁 Boa Ação - Front-end

Este é o repositório do front-end do projeto **Boa Ação**. O sistema visa conectar doadores a instituições beneficentes.

## 🚀 Tecnologias Utilizadas

* [React](https://react.dev/) - Biblioteca JavaScript para construção de interfaces.
* [Vite](https://vitejs.dev/) - Ferramenta de build rápida e leve.
* [Tailwind CSS](https://tailwindcss.com/) - Framework de estilização "utility-first".
* [Axios](https://axios-http.com/) - Cliente HTTP para comunicação com a API.

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada).
* [NPM](https://www.npmjs.com/) (geralmente vem com o Node).
* O backend (API Laravel) rodando localmente.

## 🔧 Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/paulornr89/boa_acao_front.git

cd boa_acao
```

### 2. Instalar Dependências

Instale as bibliotecas necessárias listadas no package.json:

```bash
npm install
```

### 3. Configuração do Ambiente (.env)

O projeto utiliza variáveis de ambiente para conectar com a API.

* Na raiz do projeto, crie um arquivo chamado .env.
* Adicione a seguinte configuração dentro dele:

```bash
VITE_API_URL=http://localhost:8000/api
```

### 4. Executar o projeto
Para iniciar o servidor de desenvolvimento local com o Vite, execute:

```bash
npm run dev
```