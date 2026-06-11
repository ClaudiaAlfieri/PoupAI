# PoupAI

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=google&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge)

> Aplicação web de educação financeira com IA generativa, desenvolvida como desafio do curso **Santander 2026 - AI React Front-end** da [DIO](https://www.dio.me/).
>
> O PoupAI foi adaptado para adolescentes — ajudando jovens entre 12 e 18 anos a organizar suas finanças, criar metas e desenvolver hábitos financeiros saudáveis de forma acessível e motivadora.

---

## 📌 Sobre o Projeto

O **PoupAI** é um educador financeiro inteligente voltado para adolescentes. O user preenche um formulário com informações sobre sua renda mensal, gastos e um objetivo financeiro que deseja alcançar. A IA então gera um diagnóstico personalizado com dicas práticas, sugestões de economia e uma mensagem motivacional — tudo em linguagem clara e adequada ao público jovem.

O projeto foi desenvolvido com base no repositório fornecido pela DIO e evoluído com melhorias próprias, incluindo adaptação completa para o público adolescente, página de histórico de simulações e chat interativo com o PoupBot.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 📋 Formulário em etapas | 6 perguntas adaptadas para o universo adolescente (mesada, gastos, objetivos) |
| 🤖 Diagnóstico com IA | A IA analisa o perfil financeiro e gera insights personalizados via Gemini API |
| 🎯 Resultado visual | Cards com resumo financeiro, viabilidade da meta e sugestões práticas |
| 🕓 Histórico | Todas as simulações salvas localmente, com acesso direto ao resultado e opção de exclusão |
| 💬 Chat com PoupBot | Chat interativo para tirar dúvidas sobre finanças com o educador virtual |
| 🌙 Tema claro e escuro | Alternância de tema com logos adaptados para cada modo |
| 💾 Persistência local | Dados salvos no localStorage entre sessões |

---

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/ClaudiaAlfieri/PoupAI.git
cd poupai
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo de variáveis de ambiente na raiz do projeto:
```bash
VITE_GEMINI_API_KEY=sua_chave_aqui
```
> Obtenha sua chave gratuitamente em [aistudio.google.com](https://aistudio.google.com)

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse no browser: `http://localhost:5173`

---

## 🎮 Como Testar o Fluxo Principal

1. Na página inicial, clique em **Nova Simulação**
2. Preencha as 6 etapas com renda mensal, gastos fixos, dívidas e o objetivo desejado
3. Clique em **Ver meu plano 🚀**
4. Visualize o resultado com o diagnóstico gerado pela IA
5. Acesse o **Histórico** para consultar simulações anteriores
6. Clique em **Tirar dúvidas** para conversar com o PoupBot

---

## 🛠️ Tecnologias Utilizadas

- **React 19** — biblioteca de interface
- **TypeScript** — tipagem estática
- **Vite** — bundler e servidor de desenvolvimento
- **Tailwind CSS v4** — estilização
- **React Router DOM v7** — navegação entre páginas
- **Lucide React** — ícones
- **Gemini API** — IA generativa para diagnósticos e chat
- **localStorage** — persistência de dados local
- **Git / GitHub** — controle de versão

---

## 💡 Melhorias Implementadas

### 1. Adaptação para o público adolescente
Todo o projeto foi reformulado para jovens entre 12 e 18 anos: linguagem motivadora e acessível, perguntas adaptadas para o contexto de mesada e pequenos rendimentos, exemplos compatíveis com a realidade adolescente e prompt da IA reescrito para gerar respostas adequadas a esse perfil.

### 2. Página de Histórico
Desenvolvimento da página `/historico` com listagem de todas as simulações salvas no localStorage, acesso direto ao resultado de cada simulação e opção de exclusão individual.

### 3. Chat com o PoupBot
Desenvolvimento da página `/chat` com um assistente financeiro interativo alimentado pela Gemini API. O PoupBot mantém o contexto da conversa, responde sempre em linguagem adequada ao público jovem e exibe sugestões de perguntas para facilitar a interação inicial.

---

## 📚 O Que Aprendi

- Como estruturar uma aplicação React com TypeScript seguindo boas práticas de organização de pastas e componentes reutilizáveis
- Como integrar a Gemini API para gerar conteúdo personalizado a partir de dados fornecidos pelo user
- Como construir um prompt estruturado que retorna JSON válido e como tratar esse retorno na interface
- Como utilizar o Tailwind CSS v4 com o plugin do Vite e as diferenças em relação à versão anterior
- Como gerenciar dados com localStorage de forma organizada por meio de um hook customizado
- A importância de considerar o público-alvo no design de interfaces — adaptar linguagem, cores e tom de comunicação impacta diretamente a experiência do user

---

## 🗂️ Estrutura do Projeto

```
src/
├── assets/images/          # Logos e imagens
├── components/
│   ├── features/           # Componentes de funcionalidades (Simulation, Results, Insights)
│   ├── layout/             # RootLayout com Header e Footer
│   └── shared/             # Componentes reutilizáveis (Button, Input, Header...)
├── context/theme/          # Contexto de tema claro/escuro
├── data/                   # Dados estáticos (etapas do formulário, prompt da IA)
├── hooks/                  # Hooks customizados (storage, insight, theme)
├── pages/                  # Páginas da aplicação
├── services/               # Serviço de integração com a Gemini API
├── styles/                 # Variáveis de tema CSS
└── utils/                  # Funções utilitárias (moeda, cálculos)
```

---

## 👩‍💻 Autora

Desenvolvido por **Cláudia Alfieri** como desafio do curso da DIO.

---

Feito com ❤️, muito `console.log()` e uma boa dose de curiosidade pelo caminho🚀
