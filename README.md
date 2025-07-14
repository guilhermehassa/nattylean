# nattylean
Página VSL com Bootstrap para H&W

## Projeto Publicado
O projeto está publicado em: [https://hassa.dev.br/hew/](https://hassa.dev.br/hew/)

## Autor
Guilherme Hassã

## Estrutura do Projeto
```
nattylean/
├── src/
│   ├── *.html
│   ├── scripts/
│   │   └── app.js
│   └── styles/
│       ├── *.scss
│       ├── main.scss (arquivo principal SASS)
│       └── main.css (gerado automaticamente a partir do SASS)
├── package.json
└── README.md
```

## Scripts Disponíveis

- `yarn start`  
  Executa o watcher do SASS e o servidor local (`live-server`) simultaneamente.  
  O navegador recarrega automaticamente ao detectar mudanças em arquivos HTML, JS ou CSS na pasta `src`.

- `yarn deploy`
  Faz o deploy do projeto para o repositório remoto configurado (ex: GitHub Pages ou pasta de deploy definida no git).

## Como usar
1. Instale as dependências:
   ```sh
   yarn install
   ```
2. Inicie o projeto em modo de desenvolvimento:
   ```sh
   yarn start
   ```
3. Faça deploy do projeto, gera uma pasta dist com os arquivos necessário para publicação:
   ```sh
   yarn deploy
   ```

3. Acesse o endereço informado pelo `live-server` (http://127.0.0.1:3000 por padrão).

## Observações

- Bootstrap incluído como dependência (via npm/yarn).
- Estilos devem ser editados a partir de `src/styles/main.scss` (os arquivos `.css` são gerados automaticamente).
- Scripts JS devem ser editados em `src/scripts/app.js`.