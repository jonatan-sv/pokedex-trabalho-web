# Informações sobre o Backend

## 📦 Pacotes instalados

Aqui vai algumas informações sobre cada pacote instalado:

- `express`: Sistema de rotas
- `nodemon`: Atualiza o servidor automaticamente
- `mongodb`: Integração com o MongoDB
- `mongoose`: Acesso e criação de dados
- `pokedex-promise-v2`: Integração com a PokéAPI
- `cors`: Permitir a comunicação do back com o frontend

## 📂 Estrutura de pastas

```file-tree
backend/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── db.js
  └── index.js
```

- `controllers`: Funções chamadas pelas rotas
- `models`: Modelos de dados
- `routes`: Rotas que recebem as requests
- `db.js`: Configurações do DataBase
- `dump.js`: Popular o banco de dados com os Pokémons
- `index.js`: Configurações da API

> ⚠️ *AVISO*
>
> Mantenha esta estrutura padronizada.
> Adições ou renomeações poderão ser debatidas.
