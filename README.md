# Desafio #N4
```
Chegou a hora de consolidar os conhecimentos obtidos durante este nível ⚡️

Neste desafio, você deverá implementar:

mais testes para a nossa api de treinamento
subir o projeto para o github
implementar a integração contínua usando o GhActions
Cenários (sugestões)
tentar alterar uma reserva inexistente (405)
tentar alterar uma reserva com token inválido (403)
tentar excluir uma reserva inexistente (405)
tentar excluir uma reserva sem token (403)
tentar excluir uma reserva com token invalido (403​)
Lembre-se de avaliar e adicionar mais asserções conforme achar necessário ;)
```

## API
http://treinamento-api.herokuapp.com/apidoc/index.html
## Configuração do Ambiente

### Insomnia
 O insomnia é um aplicativo multiplataforma open source criado para facilitar a iteração com APIs baseadas no protocolo HTTP.
Baixe insomnia no site
https://insomnia.rest/download

Importe o arquivo [link/gif show de bola do arquivo]

### Cypress
Crie a pasta onde ficará o projeto
Abra o terminal no caminho da pasta criada
```
    npm init --yes
```
```
    npm install -D cypress@5.3.0
```

### spok
```
    npm install -D bahmutov/cy-spok
```

link da documentação: https://github.com/bahmutov/cy-spok

### cypress-select-tests

```
    npm install -D cypress-select-tests
```

plugins/index.js
```
const selectTestsWithGrep = require('cypress-select-tests/grep')
module.exports = (on, config) => {
  on('file:preprocessor', selectTestsWithGrep(config))
}
```

Agora é só definir como será filtrado os testes, colocando  no titulo do teste `@filtro`
imagem de exemplo


```
    npx cypress open --env grep=@functional
```

link da documentação: https://github.com/bahmutov/cypress-select-tests



### cypress-grep

```
    yarn add -D cypress-grep
```
```
    // cypress/plugins/index.js
    module.exports = (on, config) => {
    // optional: register cypress-grep plugin code
    // https://github.com/bahmutov/cypress-grep
    require('cypress-grep/src/plugin')(config)
    }
```

Agora é só definir como será filtrado os testes, colocando `{tags: 'filtro'}` após o titulo
imagem de exemplo

Para executar os testes conforme o filtro definidos:

testes com um filtro
```
    npx cypress run --env grepTags=critico
```

Para executar todos os testes que são criticos ou pequenos
```
    npx cypress run --env grepTags="critico pequeno"
```
Para executar todos os testes que são criticos e pequenos
```
    npx cypress run --env grepTags="critico+pequeno"
```
Para executar todos os testes que não são criticos e pequenos
```
    npx cypress run --env grepTags="-pequeno"
```


link da documentação: https://github.com/cypress-io/cypress-grep#
