# Projeto de Inscrição - Programação Web UEPA

## Introdução

Este projeto foi desenvolvido utilizando React no front-end e Node.js no back-end. O projeto faz parte da avaliação da matéria de Programação Web da Universidade do Estado do Pará (UEPA). O objetivo do sistema é fornecer uma plataforma para inscrição em processos seletivos, permitindo aos usuários preencher um formulário com seus dados pessoais e anexar os documentos necessários.

## Estrutura do Projeto

A estrutura do projeto é organizada em diferentes componentes para facilitar a manutenção e a escalabilidade. Abaixo, segue a descrição dos principais componentes e arquivos do projeto:

### Componentes Principais

1. **FormPage.jsx**
   - Este componente é responsável por renderizar o formulário de inscrição e gerenciar a validação e submissão dos dados.
   
2. **Menu.jsx**
   - Componente responsável pela renderização do menu de navegação.
   
3. **Footer.jsx**
   - Componente responsável pela renderização do rodapé do site.

## Dependências

O projeto utiliza várias dependências para gerenciar formulários, validação e notificações. As principais dependências são:

- **react-hook-form**: Biblioteca para gerenciamento de formulários.
- **@hookform/resolvers**: Integração de resolvers com bibliotecas de validação, como `yup`.
- **yup**: Biblioteca de validação de esquemas.
- **react-input-mask**: Biblioteca para aplicar máscaras de entrada em campos de formulário.
- **axios**: Cliente HTTP para fazer requisições ao servidor.
- **react-toastify**: Biblioteca para exibição de notificações.

## Estrutura do Formulário

O formulário é composto por vários campos, cada um com suas próprias regras de validação definidas usando `yup`. A seguir estão os campos e suas validações:

1. **Nome**
   - Requerido.
   
2. **CPF**
   - Requerido.
   - Deve seguir o formato `000.000.000-00`.
   
3. **Email**
   - Requerido.
   - Deve ser um endereço de email válido.
   
4. **Telefone**
   - Requerido.
   - Deve seguir o formato `(00) 00000-0000`.
   
5. **Cargo**
   - Requerido.
   - Deve ser uma das opções disponíveis.
   
6. **Currículo**
   - Requerido.
   - Deve ser um arquivo PDF com tamanho máximo de 15MB.
   
7. **Termos de Uso**
   - Requerido.
   - O usuário deve aceitar os termos de uso.
   
8. **Data de Nascimento**
   - Requerido.
   - Deve ser uma data válida e não pode ser no futuro.
   
9. **Sexo**
   - Requerido.
   - Deve ser uma das opções: feminino, masculino, outro.

## Funcionalidades

- **Validação de Formulário**: Usando `react-hook-form` e `yup`, o formulário valida todos os campos antes de permitir a submissão.
- **Máscaras de Entrada**: Aplicação de máscaras nos campos de CPF e telefone usando `react-input-mask`.
- **Envio de Dados**: Os dados são enviados ao back-end usando `axios`.
- **Notificações**: Notificações de sucesso ou erro são exibidas usando `react-toastify`.

## Fluxo de Submissão do Formulário

1. O usuário preenche todos os campos do formulário.
2. Ao clicar no botão de envio, o formulário é validado.
3. Se a validação for bem-sucedida, os dados são formatados e enviados ao servidor usando `axios`.
4. Com base na resposta do servidor, uma notificação de sucesso ou erro é exibida.
5. Em caso de sucesso, o formulário é resetado.

## Personalização e Estilo

- O estilo do formulário é definido no arquivo `styles.css`.
- As imagens e ícones utilizados no projeto estão armazenados na pasta `assets`.

## Estrutura de Arquivos

/src
/assets
- uepaFoto.png
/components
- Footer.jsx
- Menu.jsx
- FormPage.jsx
/styles
- styles.css

index.js
App.js


## Conclusão

Este projeto exemplifica a integração de várias bibliotecas e ferramentas para criar uma aplicação web funcional e responsiva. A utilização de `react-hook-form` para gerenciamento de formulários, `yup` para validação de dados, e `axios` para comunicação com o back-end são algumas das práticas adotadas para garantir a robustez e a usabilidade do sistema.

## Como Executar o Projeto

1. Clone o repositório.
2. Instale as dependências usando `npm install`.
3. Execute a aplicação com `npm start`.

Para mais detalhes, consulte a documentação das bibliotecas utilizadas.
