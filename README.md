# nattylean

Projeto base para desenvolvimento web moderno utilizando Sass e Bootstrap.

## Autor

Guilherme Hassã

## Estrutura do Projeto

```
nattylean/
├── src/
│   ├── index.html
│   ├── scripts/
│   │   └── app.js
│   └── styles/
│       ├── main.scss
│       └── main.css (gerado automaticamente)
├── package.json
└── README.md
```

## Scripts Disponíveis

- `yarn build-css`  
  Compila o arquivo `main.scss` para `main.css`.

- `yarn watch-css`  
  Observa alterações em `main.scss` e gera automaticamente o `main.css`.

- `yarn start`  
  Executa o watcher do Sass e o servidor local (`live-server`) simultaneamente.  
  O navegador recarrega automaticamente ao detectar mudanças em arquivos HTML, JS ou CSS na pasta `src`.

## Como usar

1. Instale as dependências:
   ```sh
   yarn install
   ```

2. Inicie o projeto em modo de desenvolvimento:
   ```sh
   yarn start
   ```

3. Acesse o endereço informado pelo `live-server` (normalmente http://127.0.0.1:8080).

## Observações

- O Bootstrap já está incluído como dependência.
- Edite o arquivo `src/styles/main.scss` para customizar seus estilos.
- Coloque seus scripts JS em `src/scripts/app.js` ou outros arquivos na mesma pasta.