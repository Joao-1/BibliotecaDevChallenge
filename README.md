
<h1 align="center"> Sistema de gerenciamento de biblioteca </h1>
<p align="center">
    <img src="https://i.pinimg.com/originals/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.png" alt="Logo" width="200">
 <br />
 <br />
 <br />

<h3 align="center"> Projeto desenvolvido para completar o desafio de back-end da <a href="https://devchallenge.now.sh/"> DevChallenge</a> </h3>
  
A ideia inicial era fazer a API o mais rápido possível usando Express, como de costume. Todavia, resolvi que iria usar o projeto para aprender algo novo, então decidi desenvolve-lo em Nest.js, além de fazer testes unitários. Resultado: gostei muito do framework e agora pretendo usá-lo em outros projetos.

### Como executar

```bash

# Clone este repositório
$ git clone <https://github.com/Joao-1/BibliotecaDevChallenge.git>

# Instale as dependências
$ npm install ou yarn 

# Execute a aplicação em modo de desenvolvimento
$ yarn start:dev

# Para rodar os testes
$ yarn test ou yarn test:cov

```

### ⚠ Cuidado ⚠
A aplicação necessita de um banco de dados para rodar, um arquivo .env com o id da API do Imgur e o seguinte arquivo de configuração do TypeORM (ormconfig.json):
```json

{
	"type": "banco que dados que esta usando",
	"host": "localhost",
	"port": porta padrão do banco que esta usando,
	"username": "",
	"password": "",
	"database": "",
	"entities": ["dist/**/*.entity{.ts,.js}"],
	"synchronize": true
}

```

### Autor
[![Twitter Badge](https://img.shields.io/badge/-@sneckfis-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=)](https://twitter.com/sneckfis) [![Linkedin Badge](https://img.shields.io/badge/-JoãoVitor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/joão-vitor-martins-neto/)](https://www.linkedin.com/in/joão-vitor-martins-neto/) 

