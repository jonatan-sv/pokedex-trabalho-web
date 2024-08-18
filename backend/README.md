
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" />
  
</p>
<p align="center" style="font-size:20px; font-weight:bold">
  Informações sobre o Backend
</p>
<br/>

## 📤 Rotas da API

### **1. Rota: `/pokemons`**

- **Método: GET**
- **Descrição:** Obtém a lista de todos os Pokémons.
- **Resposta Sucesso:** `200 OK`

  ```json
  {
    "results":[
      {
        "name": "bulbasaur",
        "number": 1,
        "type": ["grass", "poison"],
        "sprite": "..."
      },
      {
        "name": "ivysaur",
        "number": 2,
        "type": ["grass", "poison"],
        "sprite": "..."
      },
    ]
  }
  ```

### **2. Rota: `/pokemons/:id`**

- **Método: GET**
- **Descrição:** Obtém os detalhes de um Pokémon específico pelo ID.
- **Parâmetros de URL:**
  - `id` (string): ID do Pokémon.
- **Resposta Sucesso:** `200 OK`

  ```json
  {
    "name": "bulbasaur",
    "number": 1,
    "type": ["grass", "poison"],
    "sprite": "..."
  }
  ```

- **Resposta Erro:** `404 Not Found` se o Pokémon não for encontrado.

### **3. Rota: `/pokemons`**

- **Método: POST**
- **Descrição:** Adiciona um novo Pokémon.

- **Resposta Sucesso:** `201 Created`

  ```json
  {
    "name": "custom",
    "number": 999999,
    "type": ["fire", "water"],
    "sprite": "...",
  }
  ```

- **Resposta Erro:** `400 Bad Request` se os dados estiverem incorretos.

### **4. Rota: `/pokemons/:id`**

- **Método: PUT**
- **Descrição:** Atualiza os dados de um Pokémon existente. Se não existir, adiciona.
- **Parâmetros de URL:**
  - `id` (string): ID do Pokémon a ser atualizado.

- **Resposta Sucesso:** `200 OK`

  ```json
  {
    "name": "updated custom",
    "number": 999999,
    "type": ["shadow"],
    "sprite": "...",
  }
  ```

- **Resposta Erro:** `404 Not Found` se o Pokémon não for encontrado.

### **5. Rota: `/pokemons/:id`**

- **Método: DELETE**
- **Descrição:** Remove um Pokémon pelo ID.
- **Parâmetros de URL:**
  - `id` (string): ID do Pokémon a ser removido.
- **Resposta Sucesso:** `204 No Content`
- **Resposta Erro:** `404 Not Found` se o Pokémon não for encontrado.

> ⚠️ *ATENÇÃO*
>
> - O id do Pokémon é chamado de "number" no banco de dados para evitar confusões com o id do documento.
> - Os campos a serem modificados devem ser enviados como queries. Exemplo: `https://...pokemons/?name=Novo&number=...`

## 📦 Pacotes instalados

Aqui vai um resumo sobre os principais pacotes instalados:

- `express`: Sistema de rotas
- `nodemon`: Atualiza o servidor automaticamente
- `mongodb`: Integração com o MongoDB
- `mongoose`: Acesso e criação de dados
- `pokedex-promise-v2`: Integração com a PokéAPI
- `cors`: Permitir requisições de diferentes origens
- `winston`: Registro e gerenciamento de logs

## 📂 Estrutura de pastas

```file-tree
backend/
  ├── controllers/
  ├── logs/
  ├── models/
  ├── routes/
  ├── utils/
  ├── db.js
  ├── dump.js
  ├── index.js
  └── logger.js
```

- `controllers`: Funções chamadas pelas rotas
- `logs`: Arquivos de log que são criados durante a execução
- `models`: Modelos de dados
- `routes`: Rotas que recebem as requisições
- `utils`: Códigos úteis
- `db.js`: Configurações do banco de dados
- `dump.js`: Script para popular o banco de dados com os Pokémons
- `index.js`: Configurações da API
- `logger.js`: Configurações de logs internos

> ⚠️ *AVISO*
>
> Mantenha esta estrutura padronizada.
> Adições ou renomeações poderão ser debatidas.
