# Programação para Web

## Sumário
- Fundamentos e Conceitos Avançados
  - [Gerenciamento de pacotes com npm e criação de scripts](./00-gerencimaneto-de-pacotes-com-npm)
  - [JavaScript moderno: ES6+ features e boas práticas](./01-javascript-moderno)
  - [Programação assíncrona em JavaScript: Promises, async/await](./02-programacao-assincrona)

## Problemas comuns

### Erro de permissão ao executar scripts no Windows

Esse erro ocorre porque o PowerShell não tem permissão para executar o script. Para solucionar, execute o seguinte comando:

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

