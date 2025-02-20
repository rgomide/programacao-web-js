# Programação para Web

## Sumário
- Fundamentos e Conceitos Avançados
  - [Gerenciamento de pacotes com npm e criação de scripts](./00-gerencimaneto-de-pacotes-com-npm)
  - [JavaScript moderno: ES6+ features e boas práticas](./01-javascript-moderno)
  - [Programação assíncrona em JavaScript: Promises, async/await](./02-programacao-assincrona)
- Integração com PostgreSQL
  - [Configuração e uso da biblioteca `pg` com Node.js](./03-conexao-com-banco-de-dados)

## Problemas comuns

### Erro de permissão ao executar scripts no Windows

Esse erro ocorre porque o PowerShell não tem permissão para executar o script. Para solucionar, execute o seguinte comando:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- Referências:
  - [Stack Overflow](https://pt.stackoverflow.com/questions/220078/o-que-significa-o-erro-execu%C3%A7%C3%A3o-de-scripts-foi-desabilitada-neste-sistema)
  - [Microsoft Docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.4)
