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
link da documentação da API do desafio: http://treinamento-api.herokuapp.com/apidoc/index.html
## Configuração do Ambiente

### Insomnia
 O insomnia é um aplicativo multiplataforma open source criado para facilitar a iteração com APIs baseadas no protocolo HTTP.
Baixe insomnia no site
https://insomnia.rest/download

Importe o arquivo
![Insomnia-import](https://user-images.githubusercontent.com/26276025/126887987-86a2ee25-b584-4e36-8cdd-721a5a19ed73.gif)

Arquivo importado no [Insomnia](https://github.com/MirianFS/api-agilizei/blob/main/aglz-insomnia-collection.json)
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

![image](https://user-images.githubusercontent.com/26276025/126888024-e5ba08fb-ef17-4629-9fc5-87b2b24c9b1e.png)


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

![image](https://user-images.githubusercontent.com/26276025/126888005-3b11a794-06aa-431e-b64f-e924ad28507f.png)

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

## Videos da excução dos testes

https://user-images.githubusercontent.com/26276025/126888348-0a7dc6ee-8da8-4346-8cc4-c3a0397e8711.mp4

https://user-images.githubusercontent.com/26276025/126888352-d73fe744-19b8-45fb-b197-318b9bb3be95.mp4
